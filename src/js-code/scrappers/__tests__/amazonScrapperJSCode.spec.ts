import '../../../polyfills/setImmediate-polyfill';
import { Browser, chromium, Page, devices, BrowserContext } from 'playwright';
import jsCode from '../amazonProductScrapperJSCode';
import { ProductInfo } from '../../../types/ProductInfo';

let browser: Browser;
let context: BrowserContext;
let page: Page;
let scrapFunction: string;

describe('amazonUSScrapperJSCode', () => {
  beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext({
      ...devices['Pixel 5'],
      isMobile: true,
      locale: 'en-US',
      userAgent: `Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36`,
    });

    scrapFunction = `function scrap() { ${jsCode}}`;

    context.addInitScript({ content: scrapFunction });
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

  describe('기본 속성', () => {
    test('기본 속성', async () => {
      await page.goto('https://www.amazon.com/dp/B01N15BCSV');
  
      const result: ProductInfo = await page.evaluate('scrap()');

      // 상품 이름
      expect(result.title).toBe("Joovy Caboose Too Ultralight Graphite Stroller, Stand on Tandem, Double Stroller, Black, 38x21.25x42 Inch (Pack of 1)");
      // 상품 주소
      expect(result.href).toBe("https://www.amazon.com/dp/B01N15BCSV");

      // 상품 카테고리
      if (result.categories) {
        expect(result.categories?.length).toBe(4);
        expect(result.categories[0]?.name).toBe('Baby Products');
        expect(result.categories[0]?.href).toBe('https://www.amazon.com/baby-car-seats-strollers-bedding/b/ref=m_dp_bc_1?ie=UTF8&node=165796011');

        expect(result.categories[1]?.name).toBe('Strollers & Accessories');
        expect(result.categories[1]?.href).toBe('https://www.amazon.com/Baby-Strollers-Accessories/b/ref=m_dp_bc_2?ie=UTF8&node=8446318011');

        expect(result.categories[2]?.name).toBe('Strollers');
        expect(result.categories[2]?.href).toBe('https://www.amazon.com/baby-strollers-tandem-jogger-double-triple/b/ref=m_dp_bc_3?ie=UTF8&node=166842011');

        expect(result.categories[3]?.name).toBe('Tandem');
        expect(result.categories[3]?.href).toBe('https://www.amazon.com/Tandem-Strollers/b/ref=m_dp_bc_4?ie=UTF8&node=173210011');
      }
      
      // 현재 선택된 상품의 속성
      expect(result.attributes?.length).toBeGreaterThanOrEqual(1);
      if (result.attributes && result.attributes.length > 0) {
        expect(result.attributes[0].name).toBe("Color");
        expect(result.attributes[0].value).toBe("Black");
      }

      if (result.price) {
        // 현재 선택된 상품의 할인 적용 가격
        expect(result.price.value).toBe('271.99');
        expect(result.price.currency).toBe('$');
      }

      if (result.basisPrice) {
        // 현재 선택된 상품의 할인전 가격
        expect(result.basisPrice.value).toBe('319.99');
        expect(result.basisPrice.currency).toBe('$');
      }

      if (result.weight) {
        // 현재 선택된 상품의 무게
        expect(result.weight.value).toBe('23.5');
        expect(result.weight.unit).toBe('pounds');
      }

      if (result.dimensions) {
        // 현재 선택된 상품의 크기
        expect(result.dimensions.width).toBe('21.25');
        expect(result.dimensions.height).toBe('42');
        expect(result.dimensions.depth).toBe('38');
        expect(result.dimensions.unit).toBe('inches');
      }
    }, 30000);
  });

  describe('구매 가능 여부', () => {
    test('구매 가능한 상품', async () => {
      await page.goto('https://www.amazon.com/dp/B01N15BCSV');
  
      const result: ProductInfo = await page.evaluate('scrap()');
  
      expect(result.inStock).toBeTruthy();
      expect(result.price).not.toBeUndefined();
    }, 30000);

    test('구매 불가능한 상품', async () => {
      await page.goto('https://www.amazon.com/dp/B00KLVY40A');
  
      const result: ProductInfo = await page.evaluate('scrap()');
  
      expect(result.inStock).toBeFalsy();
      expect(result.price).toBeUndefined();
    }, 30000);
  });

  describe('상품 옵션', () => {
    test('선택 옵션이 없는 상품 - 유형 1', async () => {
      await page.goto('https://www.amazon.com/dp/B01N15BCSV');
  
      const result: ProductInfo = await page.evaluate('scrap()');
  
      expect(result.inStock).toBeTruthy();
      expect(result.options.properties.length).toBe(1);
  
      expect(result.options.properties[0].name).toBe('Color');
      expect(result.options.properties[0].values.length).toBe(1);
      expect(result.options.properties[0].values[0].value).toBe('Black');

      // 상품 옵션이 없는 경우 확인하는 방법
      expect(result.options.skus?.length).toBe(1);
    }, 30000);

    test('선택 옵션이 없는 상품 - 유형 2', async () => {
      await page.goto('https://www.amazon.com/dp/B08LHK3RQB');
  
      const result: ProductInfo = await page.evaluate('scrap()');

      expect(result.inStock).toBeTruthy();
      expect(result.options.properties.length).toBe(0);
  
      // 상품 옵션이 없는 경우 확인하는 방법
      expect(result.options.skus?.length).toBe(1);
    }, 30000);
  
    test('텍스트형 옵션만 있는 상품', async () => {
      await page.goto('https://www.amazon.com/dp/B09MDZ67MS');
  
      const result: ProductInfo = await page.evaluate('scrap()');
  
      expect(result.inStock).toBeTruthy();
  
      // 옵션 종류가 1개만 있음
      expect(result.options.properties.length).toBe(1);
  
      expect(result.options.properties[0].name).toBe('Size');
      expect(result.options.properties[0].values[0].value).toBe('Telescope 70400');
      expect(result.options.properties[0].values[0].image).toBeUndefined();

      expect(result.options.skus?.length === 1);
    }, 30000);
  
    test('이미지형 옵션만 있는 상품', async () => {
      await page.goto('https://www.amazon.com/dp/B07JMZYJVW');
  
      const result: ProductInfo = await page.evaluate('scrap()');
  
      expect(result.inStock).toBeTruthy();
  
      // 옵션 종류가 1개만 있음
      expect(result.options.properties.length).toBe(1);
      expect(result.options.skus?.length).toBe(
        result.options.properties[0].values.length
      );
  
      // 이미지 옵션형 제품의 경우, 모든 옵션에 해당 이미지가 포함되어 있음
      for (const sku of result.options.skus || []) {
        expect(sku.attributes).not.toBeUndefined();
  
        for (const attr of sku.attributes || []) {
          expect(attr.image).not.toBeUndefined();
        }
      }
    }, 30000);    
  
    test('이미지 + 텍스트 형 옵셥이 섞여 있는 상품', async () => {
      await page.goto('https://www.amazon.com/dp/B010RWCXC8');
  
      const result: ProductInfo = await page.evaluate('scrap()');
  
      expect(result.inStock).toBeTruthy();
  
      // 옵션 종류가 2개만 있음
      expect(result.options.properties.length).toBe(2);
      // 실제 선택가능한 옵션의 모든 옵션의 경우의 수보다 작거나 같음
      expect(
        result.options.properties[0].values.length *
          result.options.properties[1].values.length
      ).toBeGreaterThanOrEqual(result.options.skus?.length as number);
  
      // 이미지 옵션형 제품의 경우, 모든 옵션에 해당 이미지가 포함되어 있음
      for (const sku of result.options.skus || []) {
        expect(sku.attributes).not.toBeUndefined();
  
        for (const attr of sku.attributes || []) {
          if (attr.image) {
            const targetOptionProperty = (result.options.properties || [])
              .find(property => property.name === attr.name)
  
            expect(targetOptionProperty).not.toBeUndefined();
  
            const targetOptionValue = (targetOptionProperty?.values || []).find(optionValue => optionValue.value === attr.value);
  
            expect(targetOptionValue).not.toBeUndefined();
  
            expect(attr.image).toBe(targetOptionValue?.image);
          }
        }
      }
    }, 30000);
  });

  describe('상품 가격', () => {
    test('단일 상품 가격 - 유형 1', async () => {
      await page.goto('https://www.amazon.com/dp/B01N15BCSV');
  
      const result: ProductInfo = await page.evaluate('scrap()');

      expect(result.price?.value).toBe('271.99');
      expect(result.price?.currency).toBe('$');

      expect(result.options?.rangePrice).toBeUndefined();
    }, 30000);

    test('단일 상품 가격 - 유형 2', async () => {
      await page.goto('https://www.amazon.com/dp/B0948QK4CL');
  
      const result: ProductInfo = await page.evaluate('scrap()');

      expect(result.price?.value).toBe('45.90');
      expect(result.price?.currency).toBe('$');

      expect(result.options?.rangePrice).toBeUndefined();
    }, 30000);

    test('범위 가격 상품', async () => {
      await page.goto('https://www.amazon.com/dp/B010RWCZN0');
  
      const result: ProductInfo = await page.evaluate('scrap()');
  
      expect(result.inStock).toBeTruthy();
      expect(result.options.properties.length).not.toBe(1);
  
      // 범위가격
      expect(result.options.rangePrice?.startPrice.value).not.toBeUndefined();
      expect(result.options.rangePrice?.startPrice.currency).toBe('$');
      expect(result.options.rangePrice?.endPrice.value).not.toBeUndefined();
      expect(result.options.rangePrice?.endPrice.currency).toBe('$');
  
      // 기본 가격 없음
      expect(result.price).toBeUndefined();
    }, 30000);
  });

});
