import { isAmazonEndPageUrl } from "./isUrl";
import amazonScrapJSCode from '../js-code/scrappers/amazonProductScrapperJSCode';


export function getScrapperJSCode(url: string): string {
    if(isAmazonEndPageUrl(url)) {
        return amazonScrapJSCode;
    }

    return '';
}