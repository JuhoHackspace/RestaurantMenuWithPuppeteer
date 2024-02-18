const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://fi.jamix.cloud/apps/menu/?anro=93077&k=48&mt=89');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  //Capture the menu into an array
  const mealOptions = await page.evaluate(() => {
    const mealElements = document.querySelectorAll('span.multiline-button-caption-text, span.multiline-button-content-text');
    // Convert NodeList to an array and extract the innerText of each element
    return Array.from(mealElements).map(element => element.innerText)
  });

  await browser.close();

  //Print the full menu
  console.log('Meal options:');
  console.log();
  for(let i = 0; i < mealOptions.length; i++) { 
        console.log(mealOptions[i]);
        console.log();
  }
})();