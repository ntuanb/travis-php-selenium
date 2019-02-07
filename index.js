const {Builder, By, Key, until} = require('selenium-webdriver');
const fs                        = require('fs');

(async function test_page_one() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);

    let image = await driver.takeScreenshot();
    let filename = 'test_page_one_result.png'; console.log(filename);

    fs.writeFile(filename, image, 'base64');

    send({
      from: 'ntuanb@gmail.com',
      to: 'ntuanb@gmail.com',
      subject: 'Test Failed',
      text: '',
      html: '<img src="cid:image" />',
      attachments: [{
        filename: filename,
        path: filename,
        cid: 'image'
      }]
    });

  } finally {
    await driver.quit();
  }
})();