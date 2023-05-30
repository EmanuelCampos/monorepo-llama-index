import puppeteer, { Page } from 'puppeteer';
import fs from 'fs';

import config from '../config.json';

function convertToSlug(title) {
    return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

async function hasAvailableWebsites() {
    if(!config.websites || config.websites.length === 0) {
        return false;
    }

    return true;
}

async function getEssayLinks(page: Page) {
    await page.goto('http://paulgraham.com/articles.html', {
        timeout: 0,
    });
    
    // Get all <a> tags on the page
    const links = await page.$$eval('a', (anchors) =>
        anchors.map((a) => ({
        href: a.href,
        text: a.innerText.trim(),
        }))
    );    

    return links;
}

async function getAllTextFromPage(page, url) {
    await page.goto(url, {
        timeout: 0
    });
  
    // Get all elements with text content
    const elements = await page.$$('body *:not(script):not(style)');
  
    // Extract text from each element
    const texts = [];
    for (const element of elements) {
      const text = await page.evaluate(el => el.textContent, element);

      if(!text) continue;

      if (text.trim().length > 0) {
        texts.push(text.trim());
      }
    }
    
    return texts;
}

  
async function saveTextToFile(texts, fileName = 'output.txt') {
    const folderName = 'essaysCache';
    const filePath = `${folderName}/${fileName}`;
  
    // Create the folder if it doesn't exist
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  
    // Save the texts to the file
    fs.writeFileSync(filePath, texts.join('\n'));
  
    console.log(`Texts saved to ${filePath}`);
  }

  
(async () => {
    if(!hasAvailableWebsites()) {
        console.warn('No websites to analyze');
        return;
    }

    const browser = await puppeteer.launch({
        headless: "new",
    });

    const page = await browser.newPage();

    const links = await getEssayLinks(page);

    // Display the essay links
    console.log('Essay Links:');
    for (const essayLink of links) {

        const essayText = await getAllTextFromPage(page, essayLink.href);
        await saveTextToFile(essayText, `${convertToSlug(essayLink.text)}.txt`)
    
        console.log(`- ${essayLink.text}: ${essayLink.href} stored in ${essayLink.text}.txt`);
    }

    // Close the browser
    await browser.close();
})();

