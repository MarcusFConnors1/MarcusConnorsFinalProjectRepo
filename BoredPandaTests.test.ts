import { additionalPageObject } from "./MarcusPageObjects/AdditionalPageObject";

import * as testText from "./800CharText.json"

describe("Automation Tests",() => {
    const page = new additionalPageObject()
    // learning from the past challenges, putting the beforeEach and afterAll up here made sure that it would quit 
    //after each test case.
    beforeEach(async () => {
        await page.navigate();
    });
    afterAll(async () => {
        await page.driver.quit();
    });
    //============================================================================================================
    //                                          ** PLEASE BE AWARE **
    // These tests work as intended, but WILL FAIL if there is a video ad on the site. It will wait for the ad to
    // end THEN will go onto the next request. I have yet to find a way to bypass this as such if this occurs,
    // just run the test again.
    //============================================================================================================
    // this test will login and logout using valid credentials 
    // (mine, have to get email verification so I didn't have much of a choice)
    test('login and logout', async () => {
        await page.click(page.logInBtn);
        // these are the credentials I used, if you want to use other credentials you would change these two lines
        await page.setInput(page.email, "biffrocker1@gmail.com");
        await page.setInput(page.password, "HelloBoredPanda01!\n");
        //========================================================================================================
        await page.getElement(page.profileBtn);
        await page.click(page.profileBtn);
        // these two lines above are where the automation will get stuck most often, as the most video ads pop up
        //========================================================================================================
        await page.click(page.signOutBtn);
    })
    // testing an invalid login
    test('invalid login', async () => {
        await page.click(page.logInBtn);
        await page.setInput(page.email, "nglpandasaremeh");
        await page.setInput(page.password, "slothsarebetter\n");
        let logError = await page.getText(page.loginError);
        expect(logError).toEqual("Incorrect email or password");
    })
    // this will test for a bug and screenshot to verify if the bug is still active. The bug is that if info is 
    // given in the inputs of the login page, it will stay there even if the login menu is clicked out of.
    test('login info bug', async () => {
        await page.click(page.logInBtn);
        await page.setInput(page.email, "hello")
        await page.click(page.loginExit);
        await page.click(page.logInBtn);
        let login = await page.getText(page.email);
        expect(login).not.toEqual("hello");
        await page.takeScreenshot(`Screenshots/loginBug${Date.now()}`);
        await page.click(page.loginExit);
    });
    // testing functionality of the search bar with three various text entries
    test('search', async () => {
        await page.getElement(page.searchBox);
        await page.click(page.searchBox);
        await page.getElement(page.searchList)
        await page.setInput(page.searchList, 'Dress\n');
        let searchResults = await page.getText(page.searchVerification);
        await console.log(searchResults);
        expect(searchResults).toContain("Dress");
    })
    // this will test a bug that allows for more characters than intended in the edit profile section using a json.
    // if the test fails, then that means the bug is gone :)
    test('edit profile bug', async () => {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        await page.click(page.logInBtn);
        await page.setInput(page.email, "biffrocker1@gmail.com");
        await page.setInput(page.password, "HelloBoredPanda01!\n");
        await page.getElement(page.profileBtn);
        await page.click(page.profileBtn);
        await page.getElement(page.editProfile);
        await page.click(page.editProfile);
        await page.getElement(page.bioText);
        await page.click(page.bioText);
        await page.setInput(page.bioText, testText[0]);
        await page.click(page.facebookText);
        await page.click(page.saveChanges);
        await delay(5000);
        let longText = await page.getText(page.bioText);
        expect(longText).toEqual(testText[0]);
    })
    //==========================================================================================================
    //                                             ** Please Be Aware**
    // As these tests have the most page transfers it increases the odds of getting a video ad, which leads to 
    // the test failing.
    //==========================================================================================================
    // this tests the functionality of the nav bar by clicking on each category
    test('nav bar', async () => {
        await page.getElement(page.artTab);
        await page.click(page.artTab);
        await page.getElement(page.photoTab);
        await page.click(page.photoTab);
        await page.getElement(page.animalTab);
        await page.click(page.animalTab);
        await page.getElement(page.funnyTab);
        await page.click(page.funnyTab);
        await page.getElement(page.moreTab);
        await page.click(page.moreTab);
        await page.getElement(page.pandaLogo);
        await page.click(page.pandaLogo);
    })
    // this tests the navigation of each tab(trending, latest, featured)
    test('categories/newsletter', async () =>{
        await page.getElement(page.featuredTab);
        await page.click(page.featuredTab);
        await page.getElement(page.trendingTab);
        await page.click(page.trendingTab);
        await page.getElement(page.latestTab);
        await page.click(page.latestTab);
        await page.getElement(page.newsletterTab);
        await page.click(page.newsletterTab);
    })
})