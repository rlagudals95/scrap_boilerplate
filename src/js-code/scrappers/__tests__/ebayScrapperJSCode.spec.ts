import { TextEncoder, TextDecoder } from 'util';

// https://github.com/jsdom/jsdom/issues/2524 이슈 해결법
Object.defineProperty(window, 'TextEncoder', {
  writable: true,
  value: TextEncoder,
});
Object.defineProperty(window, 'TextDecoder', {
  writable: true,
  value: TextDecoder,
});

import { JSDOM } from 'jsdom';
import jsCode from '../ebayScrapperJSCode';

const html = `
<html>
  <body>
    <div id="srp-river-results">
      <ul class="srp-results srp-list clearfix">
        <li data-viewport="{&quot;trackableId&quot;:&quot;01GGZKZSXKFGVRCMBRV2PXZ2EH&quot;}" class="s-item s-item__pl-on-bottom" data-view="mi:1686|iid:1"><div class="s-item__wrapper clearfix"><a data-s-7ui2848="{&quot;eventFamily&quot;:&quot;LST&quot;,&quot;eventAction&quot;:&quot;ACTN&quot;,&quot;actionKind&quot;:&quot;NAVSRC&quot;,&quot;actionKinds&quot;:[&quot;NAVSRC&quot;],&quot;operationId&quot;:&quot;2351460&quot;,&quot;flushImmediately&quot;:false,&quot;eventProperty&quot;:{&quot;$l&quot;:&quot;1157533997024924&quot;}}" _sp="p2351460.m1686.l7400" class="s-item__link" href="https://www.ebay.com/itm/394283259772?hash=item5bcd1d177c:g:3fcAAOSwgqJjRXSl&amp;amdata=enc%3AAQAHAAAA4HyuCjOSZcXva6efoMxT21chziT4JiqtYvQCbka9xPWOFmw5AYcwNe8BxKIffOvcCU%2FyL29MTNNeZJIp767axJf8SWOGUgw9DoctX5mw%2FXKpks42is3LYPIQcHnD5g%2BD%2FZCGiFz6xj16JPhbZe3omcC29IaIKeyNVxJFDbpZKc%2BS7kwimTS%2FZPQJqzEuTUEYZ84pLtEKxkVlwMYEokimnWXPqudOLWquaZIK1QN2NvOXckPVocMYw%2BTZYcCa5oc%2FC9Dz353osV8cY6HoQved%2FJdu8ShEqZFSBFaFvMvCBC46%7Ctkp%3ABFBMlp__84dh"><div class="s-item__image-section"><div class="s-item__image"><div class="s-item__image-wrapper"><div class="s-item__image-helper"></div><img aria-hidden="true" src="https://i.ebayimg.com/thumbs/images/g/3fcAAOSwgqJjRXSl/s-l140.webp" loading="eager" fetchpriority="high" onload="SITE_SPEED.ATF_TIMER.measure(this); if (performance &amp;&amp; performance.mark) { performance.mark(&quot;first-meaningful-paint&quot;); };if(this.width === 80 &amp;&amp; this.height === 80) {window.SRP.metrics.incrementCounter('imageEmptyError');}" onerror="window.SRP.metrics.incrementCounter('imageLoadError');" class="s-item__image-img" alt="새상품 나이키 에어 포스 1 '07 LV8 그레이/볼트 남성 트레이너-사이즈용 메시지" data-atftimer="1667525067401"></div></div></div><div class="s-item__info clearfix"><div class="s-item__title"><span role="heading" aria-level="3">새상품 나이키 에어 포스 1 '07 LV8 그레이/볼트 남성 트레이너-사이즈용 메시지</span></div><div class="s-item__subtitle s-item__subtitle--two-lines"><span class="SECONDARY_INFO">새 상품</span></div><div class="s-item__details clearfix"><div class="s-item__detail s-item__detail--primary"><span class="s-item__price"><span class="BOLD">$160.48</span></span></div><div class="s-item__detail s-item__detail--primary"><span class="s-item__purchase-options s-item__purchaseOptions">즉시 구매</span></div><div class="s-item__detail s-item__detail--primary"><span class="s-item__shipping s-item__logisticsCost">+ 예상 배송비 $41.61</span></div><div class="s-item__detail s-item__detail--primary"><span class="s-item__location s-item__itemLocation">출발지 영국</span></div><div class="s-item__detail s-item__detail--primary"><span class="s-item__hotness s-item__itemHotness" aria-label="">관심 고객 9명 이상</span></div><div class="s-item__detail s-item__detail--primary"><span> <span aria-labelledby="s-7ui2848" class="s-7ui2848_s-5yhk169" role="text text"><span aria-hidden="true">​<wbr><span>스폰서</span></span></span></span><span class="s-item__space_bar"></span></div></div></div></a></div></li>
        <li data-viewport="{&quot;trackableId&quot;:&quot;01GGZKZSXKR2BGTMSAXG4DEKPW&quot;}" class="s-item s-item__pl-on-bottom" data-view="mi:1686|iid:2"><div class="s-item__wrapper clearfix"><a data-s-7ui2848="{&quot;eventFamily&quot;:&quot;LST&quot;,&quot;eventAction&quot;:&quot;ACTN&quot;,&quot;actionKind&quot;:&quot;NAVSRC&quot;,&quot;actionKinds&quot;:[&quot;NAVSRC&quot;],&quot;operationId&quot;:&quot;2351460&quot;,&quot;flushImmediately&quot;:false,&quot;eventProperty&quot;:{&quot;$l&quot;:&quot;1157533997512303&quot;}}" _sp="p2351460.m1686.l7400" class="s-item__link" href="https://www.ebay.com/itm/124718372624?hash=item1d09cb5710:g:-ooAAOSwaiFi3eaM&amp;amdata=enc%3AAQAHAAAA4AqPLdhAbXlHDn4kH4%2FARs1MY%2F7WQKF60%2FiIVF8mnBNQAbdP0f1pvsIE%2F14bcWEtq031GFwGoySiK%2BVrBsywaf%2BO%2BHRick1hIXhY6ZirwMPaHTrhHkwyEKb1oMCKLDlyCenIk6yZBPSxwqgzZk%2BAMnyxXGysH4Rt4U%2BTrQQfQd6fIBAs1BwMfZLkW%2BerwwN9QqettDnLkp2MjKb85E%2Fqp9TMkFlqWpI3WDB1CM2l%2Fjvz0dqps0NFB1UQuOajRMgviqR94kaR3YMiiFztx4MFjz5KKvoygYAX3vHm52Y6oy5D%7Ctkp%3ABFBMlp__84dh"><div class="s-item__image-section"><div class="s-item__image"><div class="s-item__image-wrapper"><div class="s-item__image-helper"></div><img aria-hidden="true" src="https://i.ebayimg.com/thumbs/images/g/-ooAAOSwaiFi3eaM/s-l140.webp" loading="eager" fetchpriority="high" onload="SITE_SPEED.ATF_TIMER.measure(this);;if(this.width === 80 &amp;&amp; this.height === 80) {window.SRP.metrics.incrementCounter('imageEmptyError');}" onerror="window.SRP.metrics.incrementCounter('imageLoadError');" class="s-item__image-img" alt="나이키 덩크 로우 레트로 화이트 블랙 (2021) - DD1391-100" data-atftimer="1667525067401"></div></div></div><div class="s-item__info clearfix"><div class="s-item__title"><span role="heading" aria-level="3">나이키 덩크 로우 레트로 화이트 블랙 (2021) - DD1391-100</span></div><div class="s-item__subtitle s-item__subtitle--two-lines"><span class="SECONDARY_INFO">새 상품</span></div><div class="s-item__details clearfix"><div class="s-item__detail s-item__detail--primary"><span class="s-item__price"><span class="BOLD">$150.99</span><span class="DEFAULT"> ~ </span><span class="BOLD">$350.99</span></span></div><div class="s-item__detail s-item__detail--primary"><span class="s-item__purchase-options s-item__purchaseOptions">즉시 구매</span></div><div class="s-item__detail s-item__detail--primary"><span class="s-item__shipping s-item__logisticsCost">+배송 $60.00</span></div><div class="s-item__detail s-item__detail--primary"><span class="s-item__location s-item__itemLocation">출발지 미국</span></div><div class="s-item__detail s-item__detail--primary"><span class="s-item__hotness s-item__itemHotness" aria-label="">관심 고객 10명 이상</span></div><div class="s-item__detail s-item__detail--primary"><span> <span aria-labelledby="s-7ui2848" class="s-7ui2848_s-5yhk169" role="text text"><span aria-hidden="true">​<wbr><span>스폰서</span></span></span></span><span class="s-item__space_bar"></span></div></div></div></a></div></li>
        <li data-viewport="{&quot;trackableId&quot;:&quot;01GGZKZSXK9TEP02R6B61JTPJA&quot;}" class="s-item s-item__pl-on-bottom" data-view="mi:1686|iid:3"><div class="s-item__wrapper clearfix"><a data-s-7ui2848="{&quot;eventFamily&quot;:&quot;LST&quot;,&quot;eventAction&quot;:&quot;ACTN&quot;,&quot;actionKind&quot;:&quot;NAVSRC&quot;,&quot;actionKinds&quot;:[&quot;NAVSRC&quot;],&quot;operationId&quot;:&quot;2351460&quot;,&quot;flushImmediately&quot;:false,&quot;eventProperty&quot;:{&quot;$l&quot;:&quot;1157533997913787&quot;}}" _sp="p2351460.m1686.l7400" class="s-item__link" href="https://www.ebay.com/itm/295247436745?hash=item44be1e5bc9:g:E30AAOSwmApjN0db&amp;amdata=enc%3AAQAHAAAA4PGcbcyzmoI4bLmUKsmOTgXKFLlrHfttLdB5vzfvywCMfVDjLPP%2FqzKsXgSpXVYD3NiHb9c665wIkPc5Yu6MVy0wW9fiOHtQa6roNVIi3gwNdQOOgvv2YE9cbzsFABqKSBZqCQI0ZJVholRT5FpkOaKDX1oKSXLm%2FQzGEfu8CGNEipgDpQXAfK2GuWs0mJv9lggmXx5AX%2BBuTLUuycx0pnZwZZS%2BJqfSKPOzgAy17OaX%2BpUjaZzZoR7SL0DO9P29kOJRyppVETzcRjOyoXu%2Fee82WcljPB%2F6tl6mHHtJF%2B%2FN%7Ctkp%3ABFBMlp__84dh"><div class="s-item__image-section"><div class="s-item__image"><div class="s-item__image-wrapper"><div class="s-item__image-helper"></div><img aria-hidden="true" src="https://i.ebayimg.com/thumbs/images/g/E30AAOSwmApjN0db/s-l140.webp" loading="eager" fetchpriority="high" onload="SITE_SPEED.ATF_TIMER.measure(this);;if(this.width === 80 &amp;&amp; this.height === 80) {window.SRP.metrics.incrementCounter('imageEmptyError');}" onerror="window.SRP.metrics.incrementCounter('imageLoadError');" class="s-item__image-img" alt="나이키 농구화 남성 블랙/골드 새상품 박스 없음" data-atftimer="1667525375063"></div></div></div><div class="s-item__info clearfix"><div class="s-item__title"><span role="heading" aria-level="3">나이키 농구화 남성 블랙/골드 새상품 박스 없음</span></div><div class="s-item__subtitle s-item__subtitle--two-lines"><span class="SECONDARY_INFO">새 상품(기타)</span></div><div class="s-item__details clearfix"><div class="s-item__detail s-item__detail--primary"><span class="s-item__price"><span class="BOLD">$108.29</span></span></div><div class="s-item__detail s-item__detail--primary"><span class="s-item__additional-price" role="text">이전 가격: <span class="STRIKETHROUGH">$113.99</span></span>  <span class="s-item__discount s-item__discount"><span class="BOLD">5% 할인</span></span></div><div class="s-item__detail s-item__detail--primary"><span class="s-item__purchase-options s-item__purchaseOptions">즉시 구매</span></div><div class="s-item__detail s-item__detail--primary"><span class="s-item__shipping s-item__logisticsCost">+ 예상 배송비 $26.10</span></div><div class="s-item__detail s-item__detail--primary"><span class="s-item__location s-item__itemLocation">출발지 미국</span></div><div class="s-item__detail s-item__detail--primary"><span class="s-item__hotness s-item__itemHotness" aria-label="">자선 단체 후원</span></div><div class="s-item__detail s-item__detail--primary"><span> <span aria-labelledby="s-7ui2848" class="s-7ui2848_s-5yhk169" role="text text"><span aria-hidden="true">​<wbr><span>스폰서</span></span></span></span><span class="s-item__space_bar"></span></div></div></div></a></div></li>
      </ul>
    </div>
  </body>
</html>
`;

describe('ebayScrapperJSCode', () => {
  test('검색 결과 추출', () => {
    const instruction = jsCode;

    const { document } = new JSDOM(html).window;

    Object.defineProperty(window, 'document', {
      writable: true,
      value: document,
    });

    const scrap = new Function(instruction);

    const result = scrap();

    expect(result[0].title).toBe(`새상품 나이키 에어 포스 1 '07 LV8 그레이/볼트 남성 트레이너-사이즈용 메시지`);
    expect(result[0].image).toBe('https://i.ebayimg.com/thumbs/images/g/3fcAAOSwgqJjRXSl/s-l140.webp');
    expect(result[0].href).toBe('https://www.ebay.com/itm/394283259772');
    expect(result[0].price).toBe('160.48');
    expect(result[0].symbol).toBe('$');

    expect(result[1].title).toBe(`나이키 덩크 로우 레트로 화이트 블랙 (2021) - DD1391-100`);
    expect(result[1].image).toBe('https://i.ebayimg.com/thumbs/images/g/-ooAAOSwaiFi3eaM/s-l140.webp');
    expect(result[1].href).toBe('https://www.ebay.com/itm/124718372624');
    expect(result[1].price).toBe('150.99');
    expect(result[1].symbol).toBe('$');

    expect(result[2].title).toBe(`나이키 농구화 남성 블랙/골드 새상품 박스 없음`);
    expect(result[2].image).toBe('https://i.ebayimg.com/thumbs/images/g/E30AAOSwmApjN0db/s-l140.webp');
    expect(result[2].href).toBe('https://www.ebay.com/itm/295247436745');
    expect(result[2].price).toBe('108.29');
    expect(result[2].symbol).toBe('$');
  });
});
