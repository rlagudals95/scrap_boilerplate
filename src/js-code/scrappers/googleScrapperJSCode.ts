export interface GooglelSERPInfo {
  title: string; // 나이키
  description: string; //지금의 나이키 에어 포스 1의 중심에는 지난 40년간 문화를 이끌고 변화를 만들어낸 커뮤니티가 있습니다. 한국 댄스 씬을 바꾸고 있는 댄서들과
  href: string; // https://www.nike.com/kr/
  origin: string; // https://www.nike.com
  favicon: string; // https://www.nike.com/favicon.ico
}

export const jsCode = `
    const mainSearchResultContainers = Array.from(document.querySelectorAll('#rso h2'))
        .filter((headingElem) => {
            return headingElem.textContent === 'Web result with site links' && headingElem.nextElementSibling;
        })
        .map(headingElem => {
            return headingElem.nextElementSibling && headingElem.nextElementSibling.querySelector(
                'div > div:first-child > div:first-child > div:first-child'
            );
        })
        .filter(data => !!data);

    const siteSearchResultContainers = Array.from(document.querySelectorAll('#rso [data-sokoban-container]'));

    return [...mainSearchResultContainers, ...siteSearchResultContainers]
        .map((container) => {
            if (container) {
                const titleElem = container.querySelector('[role=link]');
                const title = titleElem ? titleElem.textContent : '';
                
                if (container.childElementCount < 2) {
                    return null;
                }
        
                // String.fromCharCode(160) 는 console.log 출력시 Space처럼 보이지만 사실은 No-Break Space 문자이다
                const description = container.children[1].textContent.replaceAll(String.fromCharCode(160), " ") || '';
        
                const aElem = container.querySelector('[role=presentation]');
                
                const href = aElem.nodeName === 'A' ? decodeURIComponent(aElem.href) : '';
                const origin = new URL(href).origin;

                const imgElem = container.querySelector('img');
                const favicon = imgElem && imgElem.nodeName === 'IMG' ? imgElem.src : origin + '/favicon.ico';
        
                return {
                    title,
                    description,
                    href,
                    origin,
                    favicon
                }
            }
        })
        .filter(data => !!data);
`;

export default jsCode;