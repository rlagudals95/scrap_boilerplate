//https://so.m.jd.com/ware/search.action?keyword=${keyword}
export interface JingDongSERPInfo {
    title: string; // JORDAN LEGACY 312 LOW (PS) 运动鞋 CD9055-116 31
    href: string; // https://item.m.jd.com/product/10049808384898.html
    image: string; // https://img13.360buyimg.com/n2/s270x270_jfs/t1/145582/32/30991/61136/6364490dEc366fc59/0e05bf0178d5fdb9.jpg!q70.webp
    price: string; // 499
    symbol: string; // ¥
  }
  
  export const jsCode = `
      return Array.from(document.querySelectorAll('#itemList .search_prolist_item'))
          .filter(container => {
            // 진입시 상품데이터는 가져오지만 이미지는 화면에 보이는 4개만 불러오고 있음
            const imgElem = container.querySelector('img');
            return imgElem && imgElem.src;
          })
          .map(container => {
              const imgElem = container.querySelector('img');
              const image = (imgElem && imgElem.src) || '';
  
              const titleSpanElem = container.querySelector('.search_prolist_title');
              const title = (titleSpanElem && titleSpanElem.textContent.trim().replace(/&nbsp;/g,' ')) || '';
  
              const skuid = container.getAttribute('skuid');
              const href = 'https://item.m.jd.com/product/' + skuid + '.html';
  
              const priceSpanElem = container.querySelector('.search_prolist_price')
              const wholePrice = priceSpanElem && priceSpanElem.textContent.trim() || "$0";
  
              const price = wholePrice.replace(/[^-\.0-9]/g,'').trim();
              const symbol = wholePrice.replace(/[-\.0-9]/g,'').trim();
  
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