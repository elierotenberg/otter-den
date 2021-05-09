import { Browser, Page } from "puppeteer";

const googleLogin = async (
  page: Page,
  email: string,
  password: string,
): Promise<void> => {
  await page.waitForSelector("#identifierId");
  await page.type("#identifierId", email);
  await page.waitForTimeout(1000);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(1000);
  await page.waitForSelector("input[type='password']");
  await page.waitForTimeout(1000);
  await page.type("input[type='password']", password);
  await page.waitForTimeout(1000);
  await page.keyboard.press("Enter");
};

export const findMyDevice = async (
  browser: Browser,
  email: string,
  password: string,
): Promise<void> => {
  const page = await browser.newPage();
  await page.goto(`https://www.google.com/android/find`);
  if (page.url().includes("accounts.google.com")) {
    await googleLogin(page, email, password);
  }
  const button = await page.waitForSelector(".device-button-ring button");

  await page.waitForTimeout(1000);

  await button.click();

  await page.waitForTimeout(10000);
};
