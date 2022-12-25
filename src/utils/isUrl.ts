export function isAmazonUrl(url: string): boolean {
    return /amazon./.test(url);
}

export function isAmazonEndPageUrl(url: string): boolean {
    if (!isAmazonUrl(url)) {
        return false;
    }

    return /\/dp\//.test(url);
}

export function isJingDong(url: string): boolean {
    return /jd.com/.test(url);
}

export function isJingDongEndPageUrl(url: string): boolean {
    return /(item.jd.com|item.m.jd.com)/.test(url);
}

export function isShoppingPlatform(url: string): boolean {
    return isAmazonUrl(url) || isJingDong(url);
}

export function isShoppingEndpage(url: string): boolean {
    if (isAmazonEndPageUrl(url) || isJingDongEndPageUrl(url)) {
        return true;
    } else {
        return false;
    }
}