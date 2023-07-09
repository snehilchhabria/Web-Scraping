const fs = require('fs');
const puppeteer = require("puppeteer");

async function run() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto('https://traversymedia.com');


    // const courses =  await page.evaluate(() => Array.from(document.querySelectorAll('#cscourses .card'), (e) => ({
    //     title: e.querySelector('.card-body h3').innerText,
    //     level: e.querySelector('.card-body .level').innerText,
    //     url: e.querySelector('.card-footer a').href,
    // })));

    //another way of doing the same thing

    const courses = await page.$$eval('#cscourses .card', (elements) => elements.map(e =>({
        title: e.querySelector('.card-body h3').innerText,
        level: e.querySelector('.card-body .level').innerText,
        url: e.querySelector('.card-footer a').href,
    })));
        console.log(courses);

        //Saving data to a json file
        fs.writeFile('courses.json', JSON.stringify(courses), (err) => {
            if(err) throw err;
            console.log('File Saved');
        })


    await browser.close();
}

run();