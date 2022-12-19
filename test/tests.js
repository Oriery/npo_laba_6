const { By, Key, Builder } = require("selenium-webdriver")
require("chromedriver")
const chai = require("chai")
const expect = chai.expect
let driver

before(async () => {
    driver = await new Builder().forBrowser("chrome").build()
    await driver.manage().setTimeouts({ implicit: 5000 })
})

describe("Bank", async function () {
    this.timeout(10000)

    beforeEach(async () => {
        await driver.get(
            "https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login"
        )

        await driver
            .findElement(By.css("div:nth-child(1) button.btn-primary"))
            .click()
        let el = await driver.findElement(By.css("#userSelect"))
        el.click()
        el.sendKeys("Ha", Key.RETURN)
        await driver.findElement(By.css(".btn-default")).click()
    })

    it("should correctly determine balance of account", async function () {
        await driver.findElement(By.css('option[label="1004"]')).click()

        let el = await driver.findElement(By.css("strong + strong"))
        expect(await el.getText()).to.eql("0")
    })

    it("should make deposit", async function () {
        await driver.findElement(By.css('option[label="1005"]')).click()

        await driver.findElement(By.css('button[ng-click="deposit()"]')).click()
        await driver
            .findElement(By.css('[ng-model="amount"]'))
            .sendKeys("123", Key.RETURN)
        await driver.findElement(By.css(".btn-default")).click()
        
        let el = await driver.findElement(By.css("strong + strong"))
        expect(await el.getText()).to.eql("123")
    })

    it("should decline invalid withdrawl", async function () {
        await driver.findElement(By.css('option[label="1005"]')).click()

        await driver.findElement(By.css('button[ng-click="withdrawl()"]')).click()
        await driver
            .findElement(By.css('[ng-model="amount"]'))
            .sendKeys("500000", Key.RETURN)
        await driver.findElement(By.css(".btn-default")).click()
        
        let el = await driver.findElement(By.css(".error"))
        expect(await el.getText()).to.not.include('successful')
    })

    it("should accept valid withdrawl", async function () {
        await driver.findElement(By.css('option[label="1006"]')).click()

        await driver.findElement(By.css('button[ng-click="deposit()"]')).click()
        await driver
            .findElement(By.css('[ng-model="amount"]'))
            .sendKeys("5", Key.RETURN)
        await driver.findElement(By.css(".btn-default")).click()

        await driver.findElement(By.css('button[ng-click="withdrawl()"]')).click()
        await driver
            .findElement(By.css('[ng-model="amount"]'))
            .sendKeys("3", Key.RETURN)
        await driver.findElement(By.css(".btn-default")).click()
        
        let el = await driver.findElement(By.css(".error"))
        expect(await el.getText()).to.include('successful')
        el = await driver.findElement(By.css("strong + strong"))
        expect(await el.getText()).to.eql("2")
    })

    it("should correctly count balance after transactions", async function () {
        await driver.findElement(By.css('option[label="1004"]')).click()

        await driver.findElement(By.css('button[ng-click="deposit()"]')).click()
        await driver
            .findElement(By.css('[ng-model="amount"]'))
            .sendKeys("5", Key.RETURN)
        await driver.findElement(By.css(".btn-default")).click()

        await driver.findElement(By.css('button[ng-click="withdrawl()"]')).click()
        await driver
            .findElement(By.css('[ng-model="amount"]'))
            .sendKeys("3", Key.RETURN)
        await driver.findElement(By.css(".btn-default")).click()
        
        let el = await driver.findElement(By.css(".error"))
        expect(await el.getText()).to.include('successful')
        el = await driver.findElement(By.css("strong + strong"))
        expect(await el.getText()).to.eql("2")

        it("should correctly save history of transactions", async function () {
            await driver.findElement(By.css('button[ng-click="transactions()"]')).click()
            
            let el = await driver.findElement(By.css("#anchor0:nth-child(2)"))
            expect(await el.getText()).to.eql("5")
            el = await driver.findElement(By.css("#anchor1:nth-child(2)"))
            expect(await el.getText()).to.eql("3")
            el = await driver.findElement(By.css("#anchor0:nth-child(3)"))
            expect(await el.getText()).to.eql("Debit")
            el = await driver.findElement(By.css("#anchor1:nth-child(3)"))
            expect(await el.getText()).to.eql("Credit")
        })
    })
})

after(async () => {
    await driver.quit()
})

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
