import puppeteer, { Page } from 'puppeteer';
import config from '../config.json';

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
        console.log(`- ${essayLink.text}: ${essayLink.href}`);
    }

    // Close the browser
    await browser.close();
})();

