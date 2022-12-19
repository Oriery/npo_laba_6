const { By, Key, Builder } = require("selenium-webdriver")
require("chromedriver")
const chai = require("chai")
const expect = chai.expect
let driver

before(async () => {
    driver = await new Builder().forBrowser("chrome").build()
    await driver.manage().setTimeouts({ implicit: 10000 })
})

describe.skip("Google", function () {
    this.timeout(10000)

    it("google works", async function () {
        var searchString = "Automation testing with Selenium"

        await driver.get("http://google.com")
        await driver
            .findElement(By.name("q"))
            .sendKeys(searchString, Key.RETURN)

        var title = await driver.getTitle()
        return expect(title).to.include(searchString)
    })
})

describe("ClueZO mailbox fileuploader", async function () {
    this.timeout(30000)

    let cred = {
        login: "Gtr1J52R",
        password: "QEdQtwdq",
    }

    beforeEach(async () => {
        await driver.get(
            "https://ehgs-azure-dev-evg-dev-st-clueso-approuter.cfapps.eu20.hana.ondemand.com"
        )

        await driver.findElement(By.css('img[alt="english"]')).click()
        await driver.findElement(By.css("button > span")).click()
        await driver
            .findElement(
                By.css(
                    'button[class="btn px-12 py-4 m-1 btn-secondary btnSecondaryHoverEffect h-44"]'
                )
            )
            .click()
        await driver.findElement(By.css("div > input")).sendKeys(cred.login)
        await driver
            .findElement(By.css('span[class="passwordInputBox"] > input'))
            .sendKeys(cred.password)
        let btn = await driver.findElement(By.css("button.btn-primary"))
        btn.disabled = false;
        btn.click()

        await sleep(2000)
    })

    it("file selection works", async function () {
        var title = await driver.getTitle()
        return expect(title).to.include()
    })
})

after(async () => {
    await driver.quit()
})

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
