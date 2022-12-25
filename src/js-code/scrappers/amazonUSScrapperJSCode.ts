export interface AmazonSERPInfo {
  title: string; // Momcozy Universal Baby Stroller Organizer, 2 Insulated Cup Holder, Detachable Zippered Pocket, Adjustable Shoulder Strap, Large Capacity for Baby Essentials, Compact Design Fits Most Strollers(Black)
  href: string; // https://amazon.com/dp/B07JMZYJVW
  image: string; // https://m.media-amazon.com/images/I/71E8RZFpNRL._AC_UY218_.jpg
  price: string; // 24.99
  symbol: string; // $
}

export const jsCode = `
    return Array.from(document.querySelectorAll('[data-component-type="s-search-result"]'))
        .map(container => {
            const imgElem = container.querySelector('[data-component-type="s-product-image"] img');
            const image = imgElem && imgElem.src || '';

            const headerElem = container.querySelector('h2');
            const title = headerElem && headerElem.textContent.trim();

            const asin = container.getAttribute('data-asin');
            const anchorElem = container.querySelector('a');
            const href = asin ? 'https://amazon.com/dp/' + asin: asinanchorElem && anchorElem.href;

            const spanElem = container.querySelector('.a-price[data-a-size] > span')
            const wholePrice = spanElem && spanElem.textContent || "$0";

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