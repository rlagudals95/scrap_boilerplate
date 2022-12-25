export interface EbaySERPInfo {
  title: string; // 새상품 나이키 에어 포스 1 '07 LV8 그레이/볼트 남성 트레이너-사이즈용 메시지
  href: string; // https://www.ebay.com/itm/394283259772
  image: string; // https://i.ebayimg.com/thumbs/images/g/3fcAAOSwgqJjRXSl/s-l140.webp
  price: string; // 160.48
  symbol: string; // $
}

export const jsCode = `
    return Array.from(document.querySelectorAll('#srp-river-results li[data-viewport]'))
        .map(container => {
            const imgElem = container.querySelector('img');
            const image = (imgElem && imgElem.src) || '';

            const titleSpanElem = container.querySelector('span[role=heading]');
            const title = (titleSpanElem && titleSpanElem.textContent.trim()) || '';

            const anchorElem = container.querySelector('a');
            const anchorHref = (anchorElem && anchorElem.href) || location.href;
            const pathname = new URL(anchorHref).pathname; // '/itm/394283259772'

            const href = 'https://www.ebay.com' + pathname;

            const priceSpanElem = container.querySelector('span.s-item__price .BOLD')
            const wholePrice = priceSpanElem && priceSpanElem.textContent || "$0";

            const price = wholePrice.replace(/[^-\.0-9]/g,'');
            const symbol = wholePrice.replace(/[-\.0-9]/g,'');

            return {
                title,
                image,
                href,
                price,
                symbol
            }
        });
`;

export default jsCode;