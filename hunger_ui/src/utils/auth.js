export async function canUserAccess(route) {
    if (route === 'undefined') {
        return true
    }
    if (route.name === 'home') {
        return true
    } else {
        return false
    }

}

