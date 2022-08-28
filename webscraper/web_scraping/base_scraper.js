const e = require("express")
const puppeteer = require("puppeteer")
const Recipe = require("./schemas/recipe_schema")
const Ingredient = require("./schemas/ingredient_schema")
const numericQuantity = require("numeric-quantity")
const dbo = require("../db/conn")

async function scrapeUrls(url, category){
    const pageNumbers = await getPageNumbers(url + '/main-ingredient/' + category)
    const recipeUrls = []
    const browser = await puppeteer.launch({})
    const page = await browser.newPage({})
    
    for (let i = 1; i < parseInt(pageNumbers) + 1; i++) {
        // console.log('page: ' + i)
        if(i == 1) {
            await page.goto(url + '/main-ingredient/' + category)
        } else { 
            await page.goto(url + '/main-ingredient/' + category + '/page/' + i)
        }
        const recipes = await page.$$('div.archives div.archive-post')
        for(let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i]
            recipeUrls.push(await recipe.$eval('a', a => a.getAttribute('href')))
        }
    }

    // console.debug(`No. recipes in ${category}: ` + recipeUrls.length)

    // console.log(recipeUrls)
    await browser.close();
    return recipeUrls
}

async function getPageNumbers(url) {
    const browser = await puppeteer.launch({})
    const page = await browser.newPage({})
    let pageNumber = 1
    await page.goto(url)

    try {
        pageNumber = await page.$eval('a.page-numbers:nth-last-child(2)', el => el.textContent)
    } catch (err) {
        pageNumber = 1
    }
    // console.log(pageNumber)
    await browser.close()
    return pageNumber
}

async function scrapeRecipes(url) {
    let instructionsArray = [];
    let ingredientsArray = [];
    const browser = await puppeteer.launch({});
    const page = await browser.newPage({});
    await page.goto(url)

    const ingredients = await page.$$('li.wprm-recipe-ingredient')
    // console.debug('[' + ingredients.length + '] ingredients for  ---> ' + url)
    const recipeName = url.substring(url.slice(0, -1).lastIndexOf('/')).replaceAll('/', '')
    
    for (let i = 0; i < ingredients.length; i++) {
        const element = ingredients[i];
        const ingreedAmount = await getInnerText(element, '.wprm-recipe-ingredient-amount')
        const ingreedUnit = await getInnerText(element, '.wprm-recipe-ingredient-unit')
        const ingreedName = await getInnerText(element, '.wprm-recipe-ingredient-name')
        const ingreedNotes = await getInnerText(element, '.wprm-recipe-ingredient-notes')
        const ingredient = new Ingredient.Ingredient({
            name: getText(ingreedName),
            amount: numericQuantity(getText(ingreedAmount)),
            measurement: getText(ingreedUnit),
            notes: getText(ingreedNotes)
        })
        ingredientsArray.push(ingredient)
        // console.debug(getText(ingreedAmount) + ' ' +  getText(ingreedUnit) + ' ' + getText(ingreedName) + ': ' + getText(ingreedNotes))
        // console.debug(ingredient.toJSON())
    }
   
    let instructions = await page.$$('.wprm-recipe-instruction')
    for (let i = 0; i < instructions.length; i++) {
        const element = instructions[i]
        instructionsArray.push(await getInnerText(element, '.wprm-recipe-instruction-text'))
        // console.debug(`[ ${i + 1} ] ` + step)
    }
    
    // console.debug('There are ' + instructions.length.toString() + ' steps involved.')

    
    const prepTime = await getInnerText(page, '.wprm-recipe-prep_time')
    const prepTimeUnits = await getInnerText(page, '.wprm-recipe-prep_time-unit')
    const cookTime = await getInnerText(page, '.wprm-recipe-cook_time')
    const cookTimeUnits = await getInnerText(page, '.wprm-recipe-cook_time-unit')
    var marinadeTime = await getInnerText(page, '.wprm-recipe-custom_time')
    var marinadeTimeUnits = await getInnerText(page, '.wprm-recipe-custom_time-unit')
    marinadeTime = marinadeTime == undefined ? 0 : marinadeTime
    marinadeTimeUnits = marinadeTimeUnits == undefined ? 'min' : marinadeTimeUnits
    var totalTimeMinutes = await getInnerText(page, '.wprm-recipe-total_time-minutes')
    var totalTimeHours = await getInnerText(page, '.wprm-recipe-total_time-hours')
    totalTimeHours = totalTimeHours == undefined ? 0 : totalTimeHours
    totalTimeMinutes = totalTimeMinutes == undefined ? 0 : totalTimeMinutes

        
    // console.debug('PREP TIME: ' + prepTime + ' ' + prepTimeUnits + 
        // '  |  MARINADE TIME: ' + marinadeTime + ' ' + marinadeTimeUnits + 
        // '  |  COOK TIME: ' + cookTime + ' ' + cookTimeUnits + 
        // '  |  TOTAL TIME: ' + totalTimeHours + ' hr ' + totalTimeMinutes + ' mins')
    

   
    const notes = await getInnerText(page, '.wprm-recipe-notes')
    const avgRating = await getInnerText(page, '.wprm-recipe-rating-average')
    const numVotes = await getInnerText(page, '.wprm-recipe-rating-count')
    const calories = await getInnerText(page, '.wprm-recipe-calories')
    const protein = await getInnerText(page, '.wprm-recipe-protein')
    const carbs = await getInnerText(page, '.wprm-recipe-carbohydrates')
    const fats = await getInnerText(page, '.wprm-recipe-fat')

    const recipe = new Recipe.Recipe({
        name: recipeName,
        url: url.toString(),
        photo: "",
        ingredients: ingredientsArray,
        instructions: instructionsArray,
        nutrients: {
            calories: calories,
            protein: protein,
            carbs: carbs,
            fats: fats
        },
        rating: {
            score: avgRating,
            votes: numVotes
        },
        time: {
            marinadeTime: marinadeTime,
            marinadeTimeUnits: marinadeTimeUnits,
            prepTime: prepTime,
            prepTimeUnits: prepTimeUnits,
            cookTime: cookTime,
            cookTimeUnits: cookTimeUnits,
            totalTimeMin: totalTimeMinutes,
            totalTimeHours: totalTimeHours
        },
        notes: notes
    });

    db = dbo.getDb()
    db.collection('recipes').insertOne(recipe, function(err, res){
        if(err) throw err;
        console.log(`${recipeName} inserted`);
    })
    

    // console.log(calories + ' CALORIES  |  ' + protein + ' PROTEIN  |  ' + carbs + ' CARBS  |  ' + fats + ' FATS' )
    // console.log(avgRating + ' -- ' +  numVotes + ' votes \n-----------------------------------------------------\n\n')
    await browser.close();
    return 0;
}



async function getRecipes() {
    const categories = ['chicken-recipes', 'beef-recipes', 'fish-recipes', 'grains-and-legume-recipes', 'lamb-recipes', 'pasta-recipes', 'pork-recipes', 'seafood-recipes', 'turkey-recipes' ]
    let urls = []
    for (let i = 0; i < categories.length; i++) {
        urls = urls.concat(await scrapeUrls('https://www.skinnytaste.com', categories[i]))
    }
    // console.log(urls.length)
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        await scrapeRecipes(url)
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}




const getElementForSelector = async (element, selector) => {
    return (await element.$(selector)) || undefined;
}



const getInnerText = async (element, selector) => {
    const elementForSelector = await getElementForSelector(element, selector);
    try {
        if(elementForSelector) 
            return (
                (await element.$eval(selector, el => el.textContent))
            || '' );
        
    } catch {
        return '';
    }
}




function getText(text) {
    return ( text ? text : '')
}


getRecipes()
