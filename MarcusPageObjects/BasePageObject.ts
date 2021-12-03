// using a base page provided by our instructor Dre
import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
    WebElement,
  } from "selenium-webdriver";
const chromedriver = require("chromedriver" || "firefox");

export class BasePage {
    driver: WebDriver;
    url: string;

    constructor(driver, url) {1 
        this.driver = driver
        this.url = url
    }

    async navigate(): Promise<void> {
        return await this.driver.get(this.url)
    }

    /**
     * waits for the identified element to be located and visible before returning it.
     * @param {By} elementBy - the locator for the element to return.
     */
    async getElement(elementBy: By) {
        await this.driver.wait(until.elementLocated(elementBy));
        let element = await this.driver.findElement(elementBy);
        await this.driver.wait(until.elementIsVisible(element));
        return element;
    }

    /**
     * clicks the given element after waiting for it
     * @param {By} elementBy - the locator for the element to click
     */
    async click(elementBy: By) {
        return (await this.getElement(elementBy)).click();
    }

    /**
     * clears the given element after waiting for it, and then sends the provided keys
     * @param {By} elementBy - the locator for the element to clear and sendKeys to
     * @param {any} keys - the string or list of keys to send
     */
    async setInput(elementBy: By, keys: any) {
        let input = await this.getElement(elementBy);
        await input.clear();
        return input.sendKeys(keys);
    }

    /**
     * returns an element's text after waiting for it to be visible
     * @param {By} elementBy - the locator of the element to get text from
     */
    async getText(elementBy: By) {
        return (await this.getElement(elementBy)).getText();
    }
}