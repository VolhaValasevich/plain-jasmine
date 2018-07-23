const webdriver = require("selenium-webdriver");
const by = webdriver.By;
const Util = require("./support/util.js")

jasmine.DEFAULT_TIMEOUT_INTERVAL = 40000;

describe('T-Mobile Website', () => {

    let browser;

    beforeAll(() => {
        browser = new Util();
    })

    afterAll(() => {
        browser.quit();
    })

    fdescribe('/ Mobile plans page', () => {

        beforeEach(async () => {
            await browser.getStartPage()
            await browser.clickLink("PLANS");
        })

        it('should have correct title', async () => {
            const title = await browser.getTitle();
            return expect(title).toEqual("Cell Phone Plans | Family Plans | Compare Cell Phone Plans | T-Mobile");
        })

        it('should change the price after moving the slider', async () => {
            await browser.dragSliderToTick("second")
            const price = await browser.findElement(by.css("div.price-container.active div.price")).getText();
            return expect(price).toEqual("60");
        })

        describe('/ Military Plans Page', () => {

            beforeEach(async () => {
                await browser.findElement(by.css('a[data-analytics-id="WEB-26806-military-available -buttonCta"]')).click();
            })

            it('should have correct title', async () => {
                const title = await browser.getTitle()
                return expect(title).toEqual("T-Mobile ONE Military Phone Plans | Discounts & More | T-Mobile");
            })

            it('should have an option for verifying military status', async () => {
                const foundElements = await browser.findElements(by.linkText("Verify military status"))
                return expect(foundElements.length).toBeGreaterThan(0);
            })

            it('should change the price after moving the slider', async () => {
                await browser.dragSliderToTick("second")
                const price = await browser.findElement(by.css("div.price-container.active div.price")).getText();
                return expect(price).toEqual("40");
            })
        })
    })

    describe("/ Mobile store page", () => {
        beforeEach(async () => {
            await browser.getStartPage()
            await browser.clickLink("PHONES");
        })

        it('should have correct title', async () => {
            const title = await browser.getTitle();
            return expect(title).toEqual("Smartphones & Cell Phones | Compare our Best Cell Phones & Smartphones");
        })

        xit('should filter phones by manufacturer', () => {
            return browser.executeScript(`window.scrollTo(0,800);`)
            element(by.id("dropdownMenu1")).click();
            element(by.css('p[aria-label = "Apple"]')).click();
            expect(element(by.css('div.viewSection span.ng-binding')).getText()).toEqual("Apple");
        })
    })
})