
import { getScrapperJSCode } from "@utils/getScrapperJSCode";
import { useCallback, useContext } from "react";
import { ScrapperContext } from "../providers/scrapperProvider/ScrapperProvider";



const useScrapper = () => {
  const { scrap } = useContext(ScrapperContext);

  const getMainSku = useCallback((productInfo: ProductInfo) => {
    return (productInfo.options?.skus || []).find((sku) => {
      return (sku.attributes || []).every((skuAttr) =>
        (productInfo.attributes || []).find(
          (attr) => attr.name === skuAttr.name && attr.value === skuAttr.value
        )
      );
    });
  }, []);

  const scrapProductInfo = useCallback(async (url: string) => {
    try {
      const scrapperJSCode = getScrapperJSCode(url);
      const productInfo: ProductInfo = await scrap(url, scrapperJSCode);

      if (productInfo.title === null) {
        // @TODO 정상 스크랩 못했을 경우, title = null 이다.
        throw new Error("title is null");
      }

      const request = productInfoToCalculateRequest(productInfo);

      const deliveryFee = await DeliveryApi.deliveryFeeCalculate(request);

      productInfo.extraCost = { ...deliveryFee };

      const mainSku = getMainSku(productInfo);

      if (mainSku) {
        mainSku.extraCost = { ...deliveryFee };
      } else {
        throw new Error("no main sku");
      }

      return productInfo;
    } catch (e: any) {
      console.warn(`useScrapper.scrapProductInfo: ${e.message}`);
      throw e;
    }
  }, []);

  
  return { scrap };
};

export default useScrapper;
