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

    describe('/ Mobile plans page', () => {

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

        it('should filter phones by manufacturer', async () => {
            await browser.executeScript(`window.scrollTo(0,700);`)
            await browser.findElement(by.id("dropdownMenu1")).click();
            await browser.findElement(by.css('p[aria-label = "Apple"]')).click();
            const manufacturer = await browser.findElement(by.css('div.viewSection span.ng-binding')).getText();
            return expect(manufacturer).toEqual("Apple");
        })

        it('should have links to phone pages', async () => {
            const firstResultLink = await browser.findElement(by.css("a.product-name"));
            const phoneName = await firstResultLink.getText();
            await firstResultLink.click();
            const title = await browser.getTitle();
            expect(title).toContain(phoneName);
        })

        describe('/ Phone Accessories page', () => {

            beforeEach(async () => {
                await browser.findElement(by.xpath('//span[contains(text(), "Accessories")]')).click();
            })

            it('should autocomplete search input', async () => {
                const searchInput = await browser.findElement(by.id("devicesSearchInput"));
                await searchInput.sendKeys("apple");
                await searchInput.sendKeys(browser.Key.ENTER);
                const value = await searchInput.getAttribute('value')
                expect(value).toEqual("Apple Watch Nike+ 38mm");
            })

            it('should display prices from low to high by default', async () => {
                await browser.waitUntilPresent(by.id("devicesSearchInput"));
                const text = await browser.findElement(by.css('button[id = "sort"] span')).getText();
                expect(text).toEqual("Price low to high");
            })

        })
    })
})