import '../../../polyfills/setImmediate-polyfill';
import { Browser, chromium, Page, devices, BrowserContext } from 'playwright';
import jsCode from '../amazonSetAddressJSCode';

let browser: Browser;
let context: BrowserContext;
let page: Page;
let setZipCodeFunction: string;

describe.only('amazonUSScrapperJSCode', () => {
  beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext({
      ...devices['Pixel 5'],
      isMobile: true,
      locale: 'en-US',
      userAgent: `Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36`,
    });

    setZipCodeFunction = `function setZipCode(domain, zipCode) { ${jsCode}}`;

    context.addInitScript({ content: setZipCodeFunction });
  });
  afterAll(async () => {
    await browser.close();
  });
  beforeEach(async () => {
    page = await context.newPage();
  });
  afterEach(async () => {
    await page.close();
  });

  describe('도착지 설정', () => {
    test('미국 배송 도착지 설정', async () => {
      await page.goto('https://www.amazon.com/dp/B07JMZYJVW');

      const originAddress = await page.evaluate(() => {
        const addressElem = document.querySelector('#glow-ingress-block') as HTMLDivElement;

        return addressElem && addressElem.textContent && addressElem.textContent.replace(/(\n)/g, '').trim();
      });
  
      await page.evaluate(() => {
        return setZipCode("www.amazon.com", 19720) // 미국 DE (Delaware)
      });

      await page.goto('https://www.amazon.com');

      const changedAddress = await page.evaluate(() => {
        const addressElem = document.querySelector('#glow-ingress-block') as HTMLDivElement;

        return addressElem && addressElem.textContent && addressElem.textContent.replace(/(\n)/g, '').trim();
      });

      expect(originAddress).not.toBe('Deliver to New Castle 19720');
      expect(changedAddress).toBe('Deliver to New Castle 19720');
    }, 30000);
  });
});

// MockUp API
function setZipCode(domain: string, zipCode: number): Promise<void> {
  throw new Error('Function not implemented.');
}

