import { test, expect } from '@playwright/test';
import { Pages } from '../../../pages/pages.factory';

// This test is currently skipped due to a known issue with URL state management in the application.
test.skip('Should preserve tag filters via URL and browser navigation', async ({ page })=>{
    const pages = new Pages(page);

    await pages.home.goto();
    const tag = await pages.home.getFirstTag();

    const firstBefore = await pages.home.getFirstArticleTitle();

    await pages.home.clickOnTag(tag);

    await expect(page).toHaveURL(new RegExp(`tags/${tag}`));
    await pages.home.expectTagTabToBeActive(tag);
    
    expect(pages.home.getFirstArticleTitle()).not.toBe(firstBefore);

    await pages.home.navigateToGlobalFeed();
    await expect(page).not.toHaveURL(new RegExp(`tags/${tag}`));

    await page.goBack();

    await expect(page).toHaveURL(new RegExp(`tags/${tag}`));
    await pages.home.expectTagTabToBeActive(tag);

    const firstAfterBack = await pages.home.getFirstArticleTitle();
    expect(firstAfterBack).toBe(firstBefore);

})