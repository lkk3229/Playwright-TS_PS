import { expect, type Locator, type Page } from '@playwright/test';

export class SearchTShirtsPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly submitSearchButton: Locator;
  readonly productList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#search_query_top, input[name="search_query"]').first();
    this.submitSearchButton = page.locator('button[name="submit_search"]');
    this.productList = page.locator('.product_list');
  }

  async blockKnownTrackerHosts(): Promise<void> {
    await this.page.route('**/*', async (route) => {
      const host = new URL(route.request().url()).hostname;
      if (host.includes('exppxxclck.com') || host.includes('colnsdital.com')) {
        await route.abort();
        return;
      }
      await route.continue();
    });
  }

  async navigateToHomePage(): Promise<void> {
    await this.page.goto('https://www.automationpractice.pl/index.php', { waitUntil: 'domcontentloaded' });
  }

  async isRedirectInterstitialPage(): Promise<boolean> {
    const pageTitle = await this.page.title();
    return /redirecting/i.test(pageTitle);
  }

  async ensureOnAutomationPractice(): Promise<void> {
    if (!this.page.url().includes('automationpractice.pl')) {
      await this.navigateToHomePage();
    }
    await expect(this.page).toHaveURL(/automationpractice\.pl/);
  }

  async searchFor(productName: string): Promise<void> {
    await this.searchInput.waitFor({ state: 'visible' });
    await this.searchInput.fill(productName);
    await this.submitSearchButton.click();
  }

  async verifyProductInList(productName: string): Promise<void> {
    await expect(this.productList).toContainText(productName);
    await expect(this.page.getByRole('link', { name: productName })).toBeVisible();
  }
}
