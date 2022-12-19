const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

console.log('Hi!');

(async function example() {
  console.log('Start of a test!')
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  try {
    await driver.get('https://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000, 'Title of page should be "webdriver - Google Search"');
    console.log('Finish of a test!')
  } finally {
    await driver.quit();
  }
})();

console.log('Goodbye!')