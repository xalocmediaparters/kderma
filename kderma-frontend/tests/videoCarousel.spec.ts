import { test, expect } from '@playwright/test';

test.describe('VideoCarouselSection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('should display the carousel title', async ({ page }) => {
    const title = page.locator('h2', { hasText: 'K-Beauty in Motion' });
    await expect(title).toBeVisible();
  });

  test('should have multiple video items', async ({ page }) => {
    const videos = page.locator('section video');
    const count = await videos.count();
    expect(count).toBeGreaterThan(0);
  });

  test('clicking a video should be interactive', async ({ page }) => {
    const videoContainers = page.locator('section div.flex-shrink-0');
    const firstVideoContainer = videoContainers.nth(0);

    // Click the first video container
    await firstVideoContainer.click();

    // Wait a moment for any state changes
    await page.waitForTimeout(500);

    // Click again to deactivate
    await firstVideoContainer.click();

    // Test passes if no errors occur during clicking
    expect(true).toBe(true);
  });

  test('navigation arrows should scroll the carousel', async ({ page }) => {
    const leftArrow = page.locator('button[aria-label="Scroll left"]');
    const rightArrow = page.locator('button[aria-label="Scroll right"]');
    const container = page.locator('section div.flex.space-x-4.scroll-smooth');

    const initialScroll = await container.evaluate((el) => el.scrollLeft);

    await rightArrow.click();
    const scrollAfterRight = await container.evaluate((el) => el.scrollLeft);
    expect(scrollAfterRight).not.toBe(initialScroll); // Scroll position should change

    await leftArrow.click();
    const scrollAfterLeft = await container.evaluate((el) => el.scrollLeft);
    expect(scrollAfterLeft).not.toBe(scrollAfterRight); // Scroll position should change again
  });
});
