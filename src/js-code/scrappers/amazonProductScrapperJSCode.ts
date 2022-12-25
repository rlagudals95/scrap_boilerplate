
// Array.from(document.querySelectorAll('[data-a-state]')).map((elem) => {
//   console.info(`${elem.dataset.aState} ${elem.textContent}`);
// });

const jsCode = `
    function getAState(keyList, fieldName) {
        const targetSelector = Array.from(keyList || [])
            .map(key => "[data-a-state='" + '{"key":"' + key + '"}' + "']")
            .find(selector => document.querySelector(selector));

        if (!targetSelector) {
            return null;
        }

        const elem = document.querySelector(targetSelector);
        const object = elem && elem.textContent && JSON.parse(elem.textContent);

        return (object && fieldName && object[fieldName]) ? object[fieldName] : object;
    }

    const url = document.URL;
    const amazonIdx = /amazon./.exec(url)?.index || 0; // amazon.com/dp/B085K45C3S 또는 amazon.com/Samsung-Electronics-Heatsink-Compatible-MZ-V8P1T0CW/dp/B09JHL33X7
    const dpIdx = /\\/dp\\//.exec(url)?.index || 0; // /dp/B085K45C3S
    const endIdx = /\\?/.exec(url)?.index || url.length;

    const companyDomain = url
        .slice(amazonIdx + 7, dpIdx)
        .split('/')
        .shift();
    const ASIN = url
        .slice(dpIdx + 4, endIdx)
        .split('/')
        .shift();

    const href = 'https://www.amazon.' + companyDomain + '/dp/' + ASIN;

    // 상품 카테고리
    const categories = Array.from(document.querySelectorAll('#breadcrumb_feature_div a.a-link-child') || [])
        .map(aElem => {
            return {
                name: aElem.textContent,
                href: aElem.href
            };
        })

    // 상품 제목
    const titleElem = document.querySelector('#title');
    const title = titleElem && titleElem.textContent.trim();

    // 옵션이 여러개일 경우, {0:0: 'B010RWDC6E', 0:1: 'B0059CVERW', 0:2: 'B010RWDEMQ', 1:2: 'B010RWCZN0', 0:3: 'B010RWDHAK'}
    // 옵션이 한개일 경우, {0: 'B0B5FCYMFD', 1: 'B0B5F9SZW7', 2: 'B0B5FGP237'}
    // 옵션이 없을 경우, null
    const optionASINList = getAState(["mobile-inline-twister-dims-to-asin-list", "twister-plus-mobile-inline-twister-dims-to-asin-list"]);

    // 옵션이 여러개인 경우, ["color_name","size_name"]
    // 옵션이 한개인 경우, ["color_name"]
    // 옵션이 없을 경우, null
    const optionKeyList = getAState(["mobile-inline-twister-dim-list", "mobile-twister-dim-list"], "key");

    // 옵션이 여러개인 경우, {size_name: 'Size', color_name: 'Color'}
    // 옵션이 한개인 경우, {color_name: 'Color'}
    // 옵션이 없은 경우, null
    const optionDisplayNameList = getAState([
        "twister-plus-mobile-inline-twister",
        "mobile-inline-twister-dim-display-text",
        "mobile-inline-twister-dim-val-list",
        "mobile-twister",
    ], "dimensionDisplayText");

    // 옵션이 여러개인 경우, {"size_name":["X-Small","LG (US Men's Shoe 8-12, Women's Shoe 10-13)","Small","Medium","Large","X-Large"],"color_name":["White/Black","Black/White"]}
    // 옵션이 한개인 경우, {"color_name":["Black/Lilac Bliss","Black/Midnight Zen","Black/Morning Glow"]}
    // 옵션이 없은 경우, null
    const optionValueList = getAState([
        "twister-plus-mobile-inline-twister-dim-val-list",
        "mobile-twister-dim-val-list",
        "mobile-inline-twister-dim-val-list",
    ]);    
 
    // 옵션값 별칭이 있는 경우, {"X-Small":"XS","Small":"S","Medium":"M","Large":"L","X-Large":"XL"}
    // 옵션이 없은 경우, null
    const optionValueDisplayList = getAState([
        "mobile-inline-twister-alpha-mapping"
    ], "alphaSizesMap");

    // {'color_name::0':'https://m.media-amazon.com/images/I/41PqhEMRNhL._QL92_SH45_SS200_.jpg','color_name::2':'https://m.media-amazon.com/images/I/41Chh1OrGBS._QL92_SH45_SS200_.jpg'}
    let optionImageList = getAState([
        "mobile-inline-twister-btf-data",
        "mobile-inline-twister-sheet-view-html-data",
    ], "hiResImageUrlMap");

    if (!optionImageList) {
        // {color_name::0: 'https://m.media-amazon.com/images/I/51uOTGPzKGL._SR120,110_.jpg', color_name::1: 'https://m.media-amazon.com/images/I/51lrUC61r6L._SR120,110_.jpg'}
        optionImageList = getAState([
            "twister-plus-mobile-inline-twister-view-html-data",
            "mobile-inline-twister-sheet-view-html-data"
        ], "imageUrlMap");
    }

    const properties = Array.from(optionKeyList || [])
        .map((optionKey) => {
            const optionName = optionDisplayNameList[optionKey];

            const optionDisplayValueList = Array.from(optionValueList[optionKey] || [])
                .map((optionValue, idx) => {
                    const result = {
                        value: optionValue,
                    }

                    if (optionValueDisplayList && optionValueDisplayList[optionValue]) {
                        result.value = optionValueDisplayList[optionValue];
                    }

                    if (optionImageList) {
                        const targetImage = Array.from(Object.entries(optionImageList))
                            .find(([key, image]) => {
                                return key.includes(optionKey + "::"+ idx);
                            });
                        
                        if (targetImage) {
                            result.image = targetImage[1];
                        }
                    }

                    return result;
                });
            
            return {
                name: optionName,
                values: optionDisplayValueList
            };
        });

    // 상품 선택했을 경우 가격 
    // 가격 176.79
    // [
    //     {"displayPrice":"$24.99","priceAmount":24.99,"currencySymbol":"$","integerValue":"24","decimalSeparator":".","fractionalValue":"99","symbolPosition":"left","hasSpace":false,"showFractionalPartIfEmpty":true,"offerListingId":"...","locale":"en-US","buyingOptionType":"NEW"},
    //     {"displayPrice":"$24.99","priceAmount":24.99,"currencySymbol":"$","integerValue":"24","decimalSeparator":".","fractionalValue":"99","symbolPosition":"left","hasSpace":false,"showFractionalPartIfEmpty":true,"offerListingId":null,"locale":"en-US","buyingOptionType":"PICKUP"}
    // ]

    const priceElem = document.querySelector('.twister-plus-buying-options-price-data');
    const priceData = priceElem && JSON.parse(priceElem.textContent);
    const priceValue = priceData && priceData.length > 0 && priceData[0].priceAmount + '';
    const priceCurrency = priceData && priceData.length > 0 && priceData[0].currencySymbol;

    let price = null;
    if (priceValue && priceCurrency) {
        price = {
            value: priceValue,
            currency: priceCurrency
        };
    } else {
        const priceElem = document.querySelector('#corePrice_feature_div .a-offscreen');
        const priceWidthCurrency = priceElem && priceElem.textContent.trim() || '';
        const priceValue = priceWidthCurrency.replace(/[^-\.,0-9]/g,'').replace(/,/g, '.');
        const priceCurrency = priceWidthCurrency.replace(/[-\.,0-9]/g,'');

        if (priceValue && priceCurrency) {
            price = {
                value: priceValue,
                currency: priceCurrency
            };
        }
    }

    // 할인전 가격
    // 가격 23.23
    // 화폐 단위 $
    const basisPriceElem = document.querySelector('#corePriceDisplay_mobile_feature_div .basisPrice .a-offscreen');
    const basisPriceWidthCurrency = basisPriceElem && basisPriceElem.textContent.trim() || '';
    const basisPriceValue = basisPriceWidthCurrency.replace(/[^-\.,0-9]/g,'').replace(/,/g, '.');
    const basisPriceCurrency = basisPriceWidthCurrency.replace(/[-\.,0-9]/g,'');

    // 범위 가격
    // 가격 123.22
    // 화폐 단위 $
    const rangePriceElemList = document.querySelectorAll('#corePrice_feature_div .a-price-range .a-offscreen');
    let rangePrice = null;

    if (rangePriceElemList.length > 1) {
        // 범위 시작 가격
        const startPriceWithCurrency = rangePriceElemList[0].textContent.trim() || '';
        const startPrice = startPriceWithCurrency.replace(/[^-\.0-9]/g,'');
        const startPriceCurrency = startPriceWithCurrency.replace(/[-\.0-9]/g,'');

        // 범위 종료 가격
        const endPriceWithCurrency = rangePriceElemList[1].textContent.trim() || '';
        const endPrice = endPriceWithCurrency.replace(/[^-\.0-9]/g,'');
        const endPriceCurrency = endPriceWithCurrency.replace(/[-\.0-9]/g,'');

        rangePrice = {
            startPrice: {
                value: startPrice,
                currency: startPriceCurrency,
            },
            endPrice: {
                value: endPrice,
                currency: endPriceCurrency
            },
        }
    }

    const inStock = !!price || !!rangePrice;

    const productInformationTrElem = Array.from(document.querySelectorAll('#productDetails_techSpec_sections tr') || []);

    // 상품 무게
    // 무게 23.2
    // 무게 단위 lb
    const weightTrElem = productInformationTrElem.find(trElem => {
        const thElem = trElem.querySelector('th');

        if (thElem) {
            return thElem.textContent.trim().replace(/(&nbsp;| )/g, '') === 'ItemWeight';
        }
    });

    const weightWithUnit = weightTrElem && weightTrElem.querySelector('td') && weightTrElem.querySelector('td').textContent.replace(/(&nbsp;| )/g, '').trim() || '';
    const weightValue = weightWithUnit.replace(/[^-\.0-9]/g,'').trim().replace(/(&nbsp;| )/g, '');
    const weightUnit = weightWithUnit.replace(/[-\.0-9]/g,'').trim().replace(/(&nbsp;| |${String.fromCharCode(8206)})/g, '');

    let weight = null;
    if (weightValue && weightUnit) {
        weight = {
            value: weightValue,
            unit: weightUnit
        };
    }

    // 상품 크기
    // 크기 12.21x32.13x23.63
    // 무게 단위 inches
    const dimensionTrElem = productInformationTrElem.find(trElem => {
        const thElem = trElem.querySelector('th');

        if (thElem) {
            return thElem.textContent.trim().replace(/(&nbsp;| )/g, '') === 'ProductDimensions';
        }
    });
    
    let dimensions = null;
    const dimensionsWithUnit = dimensionTrElem && dimensionTrElem.querySelector('td') && dimensionTrElem.querySelector('td').textContent.trim().split(';')[0] || '';
    const fullDimensions = dimensionsWithUnit.replace(/[^-\.0-9x]/g,'').split("x");
    const depth = fullDimensions[0];
    const width = fullDimensions[1];
    const height = fullDimensions[2];
    const dimensionUnit = dimensionsWithUnit.replace(/[-\.0-9x ]/g,'').trim().replace(/((&nbsp;| |${String.fromCharCode(8206)})| )/g, '') || '';

    if (dimensionsWithUnit) {
        dimensions = {
            width,
            height,
            depth,
            unit: dimensionUnit
        };
    }

    let targetAttributes = null;
    const skus = Array.from(Object.entries(optionASINList || {}))
        .map(([optionIndexes, asin]) => {
            const result = {
                id: asin,
            };

            const attributes = Array.from(optionIndexes.split(":") || [])
                .map((optionIdx, idx) => {
                    const optionKey = optionKeyList[idx];
                    const result = {
                        name: optionDisplayNameList[optionKey]
                    };
                    
                    let optionValue = optionValueList[optionKey][optionIdx];

                    if (optionValueDisplayList && optionValueDisplayList[optionValue]) {
                        optionValue = optionValueDisplayList[optionValue];
                    }

                    result.value = optionValue;

                    if (optionImageList) {
                        const targetImage = Array.from(Object.entries(optionImageList || {}))
                            .find(([key, image]) => {
                                return key.includes(optionKey) && key.includes(optionIdx);
                            });
                        
                        if (targetImage) {
                            result.image = targetImage[1];
                        }
                    }

                    return result;
                });

            if (attributes) {
                result.attributes = attributes;
            }

            if (asin === ASIN) {
                result.inStock = inStock;

                if (attributes) {
                    targetAttributes = attributes;
                }

                if (price) {
                    result.price = price;
                }
            
                if (weight) {
                    result.weight = weight;
                }
            
                if (basisPriceValue) {
                    result.basisPrice = {
                        value: basisPriceValue,
                        currency: basisPriceCurrency
                    };
                }

                if (dimensions) {
                    result.dimensions = dimensions;
                }
            }
            
            return result;
        });

    if (skus.length === 0) {
        const result = {
            id: ASIN
        };

        result.inStock = inStock;

        if (price) {
            result.price = price;
        }
    
        if (weight) {
            result.weight = weight;
        }
    
        if (basisPriceValue) {
            result.basisPrice = {
                value: basisPriceValue,
                currency: basisPriceCurrency
            };
        }

        if (dimensions) {
            result.dimensions = dimensions;
        }

        skus.push(result);
    }

    const result = {
        title,
        href,
        inStock,
        options: {
            properties,
        }
    };

    if (categories.length > 0) {
        result.categories = categories;
    }

    if (targetAttributes) {
        result.attributes = targetAttributes;
    }

    if (price) {
        result.price = price;
    }

    if (weight) {
        result.weight = weight;
    }

    if (basisPriceValue) {
        result.basisPrice = {
            value: basisPriceValue,
            currency: basisPriceCurrency
        };
    }

    if (dimensions) {
        result.dimensions = dimensions;
    }

    if (rangePrice) {
        result.options.rangePrice = rangePrice;
    }

    if (skus.length > 0) {
        result.options.skus = skus;
    }

    return result;
`;

export default jsCode;
