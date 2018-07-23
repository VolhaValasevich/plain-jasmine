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

        beforeEach(() => {
            return browser.getStartPage().then(() => {
                browser.clickLink("PLANS");
            }).then(() => {
                browser.sleep(3000);
            })
        })

        it('should have correct title', () => {
            browser.getTitle().then((title) => {
                return expect(title).toEqual("Cell Phone Plans | Family Plans | Compare Cell Phone Plans | T-Mobile");
            })
        })

        it('should change the price after moving the slider', () => {
            return browser.dragSliderToTick("second").then(() => {
                return browser.findElement(by.css("div.price-container.active div.price")).getText();
            }).then((price) => {
                return expect(price).toEqual("60");
            })
        })

        describe('/ Military Plans Page', () => {

            beforeEach(() => {
                browser.findElement(by.css('a[data-analytics-id="WEB-26806-military-available -buttonCta"]')).click().then(() => {
                    browser.sleep(3000);
                })
            })

            it('should have correct title', () => {
                return browser.getTitle().then((title) => {
                    return expect(title).toEqual("T-Mobile ONE Military Phone Plans | Discounts & More | T-Mobile");
                })
            })

            it('should have an option for verifying military status', () => {
                return browser.findElements(by.linkText("Verify military status")).then((found) => {
                    return expect(found.length).toBeGreaterThan(0);
                })
            })

            it('should change the price after moving the slider', () => {
                return browser.dragSliderToTick("second").then(() => {
                    return browser.findElement(by.css("div.price-container.active div.price")).getText();
                }).then((price) => {
                    return expect(price).toEqual("40");
                })
            })
        })
    })
})