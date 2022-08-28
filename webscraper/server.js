require('dotenv').config({ path: './config.env' });

const express = require('express');
const cors = require('cors');
const dbo = require('./db/conn')

const recipeScraper = require('./web_scraping/base_scraper')

const PORT = process.env.PORT || 3000;
const app = express();

  dbo.connectToServer(function (err) {
    if (err) {
      console.error(err);
      process.exit();
    }
  });

  app.use(cors());
  app.use(express.json());


    
  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
