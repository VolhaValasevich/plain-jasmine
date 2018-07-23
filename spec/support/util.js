const webdriver = require("selenium-webdriver");
const by = webdriver.By;
const until = webdriver.until;

class Util {

    constructor() {
        this.browser = this.createDriver();
    }

    createDriver() {
        const driver = new webdriver.Builder()
            .usingServer('http://localhost:4444/wd/hub')
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
        driver.manage().timeouts().implicitlyWait(20000);
        driver.manage().window().maximize();
        return driver;
    }

    getStartPage() {
        return this.browser.get("https://www.t-mobile.com/");
    }

    clickLink(text) {
        return this.browser.findElement(by.linkText(text)).click();
    }

    dragSliderToTick(pos) {
        return this.waitUntilPresent(by.css('input.slider-range')).then((slider) => {
            switch (pos) {
                case "second": case "third": {
                    return this.browser.actions().dragAndDrop(slider, this.browser.findElement(by.css(`div.${pos}-tick`))).mouseUp().perform();
                }
                case "first": {
                    return this.browser.actions().dragAndDrop(slider, this.browser.findElement(by.css(`div.item-alt-one`))).mouseUp().perform();
                }
                case "fourth": break;
            }
        })
    }

    getTitle() {
        return this.browser.getTitle();
    }

    findElement(locator) {
        return this.browser.findElement(locator);
    }

    findElements(locator) {
        return this.browser.findElements(locator);
    }

    sleep(time) {
        return this.browser.sleep(time);
    }

    waitUntilPresent(locator) {
        return this.browser.wait(until.elementLocated(locator), 5000);
    }

    quit() {
        this.browser.quit();
    }
}

module.exports = Util;