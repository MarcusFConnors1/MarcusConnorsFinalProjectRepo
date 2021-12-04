import { BasePage } from "./BasePageObject";
import {
    Builder,
    By,
    Capabilities,
    WebDriver,
} from "selenium-webdriver";
const fs = require("fs");

// here is addition selectors and functions I added

export class additionalPageObject extends BasePage {
    animalTab: By = By.xpath('//nav//a[@href="https://www.boredpanda.com/animals/"]');
    artTab: By = By.xpath('//nav//a[@href="https://www.boredpanda.com/art/"]');
    bioText: By = By.xpath('//textarea[@id="settings-bio"]')
    editProfile: By = By.xpath('//nav[@style="display: block;"]//a[@href="/settings/"]');
    email: By = By.xpath('//input[@name="email"][@data-bind="value: email, css:{ elementErrorMode: email().length < 1 && $parent.fieldErrors }"]');
    facebookText: By = By.xpath('//input[@data-bind="text: settingsFacebook, value: settingsFacebook"]');
    featuredTab: By = By.xpath('//div[@class="bp-container"]//a[@class="popular active "]');
    funnyTab: By = By.xpath('//nav//a[@href="https://www.boredpanda.com/funny/"]');
    latestTab: By = By.xpath('//div[@class="bp-container"]//a[@class="latest"]');
    logInBtn: By = By.xpath('//a[@class="login-url visible-downto-xs"]');
    logInEnter: By = By.xpath('//button[@data-bind="click: $parent.login"]');
    loginError: By = By.xpath('//div[@class="login-form"]//p[@class="text-danger"]');
    loginExit: By = By.xpath('//a[@class="close"][1]');
    meSpan: By = By.xpath('//li[@class="user-menu"]//a[@class="button"]//span');
    moreTab: By = By.xpath('//nav//li[@class="more"]//a[@href="javascript:void(0)"]');
    newsletterTab: By = By.xpath('//div[@class="bp-container"]//a[@class="newsletter"]');
    pandaLogo: By = By.xpath('//div[@class="logotype "]//a[@href="https://www.boredpanda.com"]');
    password: By = By.xpath('//form[@method="POST"]//input[@name="password"][@data-bind="value: password, css:{ elementErrorMode: password().length < 1 && $parent.fieldErrors }"][@type="password"]');
    photoTab: By = By.xpath('//nav//a[@href="https://www.boredpanda.com/photography/"]');
    profileBtn: By = By.xpath('//li[@class="user-menu"]');
    saveChanges: By = By.xpath('//div[@id="profile-settings"]//a[@id="settings-save-button"]');
    searchBox: By = By.xpath('//li[@class="search"]');
    searchList: By = By.xpath('//div[@class="search-box"]//input[@class="text"][@type="search"][@placeholder="Search..."]');
    searchVerification: By = By.xpath('//h2[@class="posts-section-title"]');
    signOutBtn: By = By.xpath('//nav[@style="display: block;"]//a[@id="contribution-sign-out"]');
    trendingTab: By = By.xpath('//div[@class="bp-container"]//a[@class="trending"]');

    constructor(driver?: WebDriver) {
        super(driver, "https://www.boredpanda.com/")
        if (driver) this.driver = driver;
        else
          this.driver = new Builder()
            .withCapabilities(Capabilities.chrome())
            .build();
      }
    /**
     * Will search for text given in the searchBox
     * @param {string} search - will search for the string given if followed by \n
     * @example
     * await page.searchFor("Dress\n");
     */
    async searchFor(searchText: string) {
        await this.setInput(this.searchBox, searchText);
    };
    /**
     * Will take a screenshot and save it to the filepath/filename provided.
     * Automatically saves as a .png file.
     * @param {string} filepath - the filepath relative to the project's base folder where you want the screenshot saved
     * @example
     * page.takeScreenshot("myFolder/mypic")
     * //picture saves in "myFolder" as "mypic.png"
     */
    async takeScreenshot(filepath: string) {
        fs.writeFile(
          `${filepath}.png`,
          await this.driver.takeScreenshot(),
          "base64",
          (e) => {
            if (e) console.log(e);
            else console.log("screenshot saved successfully");
          }
        );
    };
};
