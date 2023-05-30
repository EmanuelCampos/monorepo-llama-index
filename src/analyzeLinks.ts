import puppeteer from 'puppeteer';
import config from '../config.json';

async function hasAvailableWebsites() {
    if(!config.websites || config.websites.length === 0) {
        return false;
    }

    return true;
}


(async () => {
    if(!hasAvailableWebsites()) {
        console.warn('No websites to analyze');
        return;
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Navigate to the website to analyze
    await page.goto('https://example.com');
    
    // Get all <a> tags on the page
    const links = await page.$$eval('a', (anchors) =>
        anchors.map((a) => ({
        href: a.href,
        text: a.innerText.trim(),
        }))
    );

    // Display the essay links
    console.log('Essay Links:');
    for (const essayLink of links) {
        console.log(`- ${essayLink.text}: ${essayLink.href}`);
    }

    // Close the browser
    await browser.close();
})();

