import { test, expect } from '@playwright/test';
import { SearchTShirtsPage } from '../pages/SearchTShirtsPage';

test('Search T-shirts and verify Faded Short Sleeve T-shirts is listed', async ({ page }) => {
  const searchTShirtsPage = new SearchTShirtsPage(page);

  await searchTShirtsPage.blockKnownTrackerHosts();
  await searchTShirtsPage.navigateToHomePage();

  const isInterstitial = await searchTShirtsPage.isRedirectInterstitialPage();
  test.skip(
    isInterstitial,
    'automationpractice.pl returned a redirect/interstitial page in this environment; test cannot execute search steps.'
  );

  await searchTShirtsPage.ensureOnAutomationPractice();
  await searchTShirtsPage.searchFor('T-shirts');
  await searchTShirtsPage.verifyProductInList('Faded Short Sleeve T-shirts');
});