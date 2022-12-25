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
import jsCode from '../amazonUSScrapperJSCode';

const html = `
<html>
  <body>
    <div id="search">
      <span data-component-type="s-result-info-bar" class="rush-component">
        <div
          data-uuid="889a8e18-f9a0-4ff3-90fe-135d5582f6d7"
          cel_widget_id="UPPER-RESULT_INFO_BAR-0"
          class="s-widget-container s-spacing-small s-widget-container-height-small celwidget slot=UPPER template=RESULT_INFO_BAR widgetId=result-info-bar"
        >
          <h1 class="a-size-base s-desktop-toolbar a-text-normal">
            <div class="s-desktop-width-max sg-row-align-items-center sg-row">
              <div
                class="sg-col-14-of-20 sg-col s-breadcrumb sg-col-10-of-16 sg-col-6-of-12"
              >
                <div class="sg-col-inner">
                  <div class="a-section a-spacing-small a-spacing-top-small">
                    <span>1-24 of over 1,000 results for</span><span> </span
                    ><span class="a-color-state a-text-bold"
                      >&quot;Stroller Accessories&quot;</span
                    >
                  </div>
                </div>
              </div>
              <div class="sg-col-6-of-20 sg-col sg-col-6-of-16 sg-col-6-of-12">
                <div class="sg-col-inner">
                  <div
                    class="a-section a-spacing-small a-spacing-top-small a-text-right"
                  >
                    <form
                      method="get"
                      action="/s"
                      class="aok-inline-block a-spacing-none"
                    >
                      <input
                        type="hidden"
                        name="k"
                        value="Stroller Accessories"
                      />

                      <input type="hidden" name="i" value="baby-products" />

                      <input type="hidden" name="rh" value="n:166843011" />

                      <input type="hidden" name="qid" value="1667455019" />

                      <input type="hidden" name="ref" value="nb_sb_noss" />

                      <span class="a-dropdown-container"
                        ><label
                          for="s-result-sort-select"
                          class="a-native-dropdown"
                          >Sort by:</label
                        ><select
                          name="s"
                          autocomplete="off"
                          id="s-result-sort-select"
                          tabindex="0"
                          data-action="a-dropdown-select"
                          class="a-native-dropdown a-declarative"
                        >
                          <option
                            data-url="/s?k=Stroller+Accessories&amp;i=baby-products&amp;rh=n%3A166843011&amp;s=relevancerank&amp;qid=1667455019&amp;ref=sr_st_relevancerank&amp;ds=v1%3AR6e7kV7%2B3k4QGfZ98NjC5IaXfSkuimmY1%2FFenk8xuL8"
                            value="relevancerank"
                            selected
                          >
                            Featured
                          </option>

                          <option
                            data-url="/s?k=Stroller+Accessories&amp;i=baby-products&amp;rh=n%3A166843011&amp;s=price-asc-rank&amp;qid=1667455019&amp;ref=sr_st_price-asc-rank&amp;ds=v1%3ANe4G9HORmC85FzpYogVFW6AoCOlUq1okbMY%2FG70i7dk"
                            value="price-asc-rank"
                          >
                            Price: Low to High
                          </option>

                          <option
                            data-url="/s?k=Stroller+Accessories&amp;i=baby-products&amp;rh=n%3A166843011&amp;s=price-desc-rank&amp;qid=1667455019&amp;ref=sr_st_price-desc-rank&amp;ds=v1%3Av%2BJIH4wvldajNNyY%2FQrtFYyjfXZC%2BWtg%2FhGmDn6L6no"
                            value="price-desc-rank"
                          >
                            Price: High to Low
                          </option>

                          <option
                            data-url="/s?k=Stroller+Accessories&amp;i=baby-products&amp;rh=n%3A166843011&amp;s=review-rank&amp;qid=1667455019&amp;ref=sr_st_review-rank&amp;ds=v1%3AhUkRwF0Carx9VspF0%2FGBuSOY14B6nadMHZM17goLYds"
                            value="review-rank"
                          >
                            Avg. Customer Review
                          </option>

                          <option
                            data-url="/s?k=Stroller+Accessories&amp;i=baby-products&amp;rh=n%3A166843011&amp;s=date-desc-rank&amp;qid=1667455019&amp;ref=sr_st_date-desc-rank&amp;ds=v1%3AaK7SbcxEOupn5pW3ZeyoxlD6V4XSnG4Ups6p3rWpkhg"
                            value="date-desc-rank"
                          >
                            Newest Arrivals
                          </option></select
                        ><span
                          tabindex="-1"
                          aria-label="Sort by:"
                          class="a-button a-button-dropdown a-button-small"
                          aria-hidden="true"
                          ><span class="a-button-inner"
                            ><span
                              class="a-button-text a-declarative"
                              data-csa-c-func-deps="aui-da-a-dropdown-button"
                              data-csa-c-type="widget"
                              data-csa-interaction-events="click"
                              data-action="a-dropdown-button"
                              aria-hidden="true"
                              ><span class="a-dropdown-label">Sort by:</span
                              ><span class="a-dropdown-prompt"
                                >Featured</span
                              ></span
                            ><i class="a-icon a-icon-dropdown"></i></span></span
                      ></span>
                      <noscript
                        ><span class="a-button a-button-base"
                          ><span class="a-button-inner"
                            ><input
                              class="a-button-input"
                              type="submit"
                              value="Go"
                            /><span class="a-button-text" aria-hidden="true"
                              >Go</span
                            ></span
                          ></span
                        ></noscript
                      >
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </h1>
        </div>
      </span>

      <div class="s-desktop-width-max s-desktop-content s-opposite-dir sg-row">
        <div
          class="s-matching-dir sg-col-16-of-20 sg-col sg-col-8-of-12 sg-col-12-of-16"
        >
          <div class="sg-col-inner">
            <div id="s-skipLinkTargetForMainSearchResults" tabindex="-1"></div>

            <span
              data-component-type="s-search-results"
              class="rush-component s-latency-cf-section"
            >
              <div class="s-main-slot s-result-list s-search-results sg-row">
                <div
                  data-asin=""
                  data-index="0"
                  class="a-section a-spacing-none s-result-item s-flex-full-width s-border-bottom-none s-widget s-widget-spacing-medium"
                >
                  <div
                    data-uuid="0224c434-4475-47cf-b780-111c0984c7e8"
                    cel_widget_id="MAIN-TOP_BANNER_MESSAGE-0"
                    class="s-widget-container s-spacing-mini s-widget-container-height-mini celwidget slot=MAIN template=TOP_BANNER_MESSAGE widgetId=messaging-messages-results-header-builder-legal-disclaimer-and-ranking-disclosure-builder"
                  >
                    <span
                      data-component-type="s-messaging-widget-results-header"
                      class="rush-component"
                    >
                      <div
                        class="a-section a-spacing-none a-spacing-top-mini s-messaging-widget-results-header"
                      >
                        <div tabindex="0" class="s-no-outline">
                          <span
                            class="a-size-medium a-color-base puis-medium-weight-text"
                            >RESULTS</span
                          >
                          <div class="a-row a-size-base">
                            <span
                              class="a-size-base a-color-base puis-light-weight-text"
                              >Price and other details may vary based on product
                              size and color.</span
                            >
                          </div>
                        </div>
                      </div>
                    </span>
                  </div>
                </div>

                <div
                  data-asin="B07JMZYJVW"
                  data-index="1"
                  data-uuid="07c05b89-a541-4253-af87-46a62e5b9802"
                  data-component-type="s-search-result"
                  class="s-result-item s-asin sg-col-0-of-12 sg-col-16-of-20 AdHolder sg-col s-widget-spacing-small sg-col-12-of-16"
                >
                  <div class="sg-col-inner">
                    <div
                      cel_widget_id="MAIN-SEARCH_RESULTS-1"
                      class="s-widget-container s-spacing-small s-widget-container-height-small celwidget slot=MAIN template=SEARCH_RESULTS widgetId=search-results_1"
                      data-csa-c-pos="1"
                      data-csa-c-item-id="amzn1.asin.1.B07JMZYJVW"
                      data-csa-op-log-render=""
                      data-csa-c-type="item"
                    >
                      <div
                        data-component-type="s-impression-logger"
                        data-component-props="{&#34;percentageShownToFire&#34;:&#34;50&#34;,&#34;batchable&#34;:true,&#34;requiredElementSelector&#34;:&#34;.s-image:visible&#34;,&#34;url&#34;:&#34;https://unagi-na.amazon.com/1/events/com.amazon.eel.SponsoredProductsEventTracking.prod?qualifier=1667455019&amp;id=4913019353421437&amp;widgetName=sp_atf&amp;adId=200038515293398&amp;eventType=1&amp;adIndex=0&#34;}"
                        class="rush-component"
                      >
                        <div
                          data-component-type="s-impression-counter"
                          data-component-props="{&#34;presenceCounterName&#34;:&#34;sp_delivered&#34;,&#34;testElementSelector&#34;:&#34;.s-image&#34;,&#34;hiddenCounterName&#34;:&#34;sp_hidden&#34;}"
                          class="rush-component s-featured-result-item"
                        >
                          <div
                            class="s-card-container s-overflow-hidden aok-relative puis-include-content-margin puis s-latency-cf-section s-card-border"
                          >
                            <div class="a-section">
                              <div class="sg-row">
                                <div
                                  class="sg-col sg-col-4-of-12 sg-col-4-of-16 sg-col-4-of-20 s-list-col-left"
                                >
                                  <div class="sg-col-inner">
                                    <div
                                      class="a-section a-spacing-none aok-relative puis-status-badge-container s-list-status-badge-container"
                                    >
                                      <div
                                        class="a-section a-spacing-none s-badge-spacing"
                                      >
                                        <span
                                          data-component-type="s-status-badge-component"
                                          class="rush-component"
                                          data-component-props='{"badgeType":"best-seller","asin":"B07JMZYJVW"}'
                                          ><div class="a-row a-badge-region">
                                            <span
                                              id="B07JMZYJVW-best-seller"
                                              class="a-badge"
                                              aria-labelledby="B07JMZYJVW-best-seller-label B07JMZYJVW-best-seller-supplementary"
                                              data-a-badge-supplementary-position="right"
                                              tabindex="0"
                                              data-a-badge-type="status"
                                              ><span
                                                id="B07JMZYJVW-best-seller-label"
                                                class="a-badge-label"
                                                data-a-badge-color="sx-orange"
                                                aria-hidden="true"
                                                ><span
                                                  class="a-badge-label-inner a-text-ellipsis"
                                                  ><span
                                                    class="a-badge-text"
                                                    data-a-badge-color="sx-cloud"
                                                    >Best Seller</span
                                                  ></span
                                                ></span
                                              ><span
                                                id="B07JMZYJVW-best-seller-supplementary"
                                                class="a-badge-supplementary-text a-text-ellipsis"
                                                aria-hidden="true"
                                                >in Baby Stroller
                                                Organizers</span
                                              ></span
                                            >
                                          </div></span
                                        >
                                      </div>
                                    </div>
                                    <div
                                      class="s-product-image-container aok-relative s-image-overlay-grey s-text-center s-padding-left-small s-padding-right-small s-flex-expand-height"
                                    >
                                      <div class="aok-relative">
                                        <span
                                          data-component-type="s-product-image"
                                          class="rush-component"
                                          ><a
                                            class="a-link-normal s-no-outline"
                                            href="/sspa/click?ie=UTF8&amp;spc=MTo0OTEzMDE5MzUzNDIxNDM3OjE2Njc0NTUwMTk6c3BfYXRmOjIwMDAzODUxNTI5MzM5ODo6MDo6&amp;sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&amp;url=%2FUniversal-Stroller-Organizer-Insulated-Momcozy%2Fdp%2FB07JMZYJVW%2Fref%3Dsr_1_1_sspa%3Fkeywords%3DStroller%2BAccessories%26qid%3D1667455019%26qu%3DeyJxc2MiOiI3LjE5IiwicXNhIjoiNi42NiIsInFzcCI6IjYuMDgifQ%253D%253D%26s%3Dbaby-products%26sr%3D1-1-spons%26psc%3D1%26smid%3DA3O35FW0HAF8LI"
                                            ><div
                                              class="a-section aok-relative s-image-fixed-height"
                                            >
                                              <img
                                                class="s-image"
                                                src="https://m.media-amazon.com/images/I/71E8RZFpNRL._AC_UY218_.jpg"
                                                srcset="
                                                  https://m.media-amazon.com/images/I/71E8RZFpNRL._AC_UY218_.jpg      1x,
                                                  https://m.media-amazon.com/images/I/71E8RZFpNRL._AC_UY327_QL65_.jpg 1.5x,
                                                  https://m.media-amazon.com/images/I/71E8RZFpNRL._AC_UY436_QL65_.jpg 2x,
                                                  https://m.media-amazon.com/images/I/71E8RZFpNRL._AC_UY545_QL65_.jpg 2.5x,
                                                  https://m.media-amazon.com/images/I/71E8RZFpNRL._AC_UY654_QL65_.jpg 3x
                                                "
                                                alt="Sponsored Ad - Momcozy Universal Baby Stroller Organizer, 2 Insulated Cup Holder, Detachable Zippered Pocket, Adjustable S..."
                                                data-image-index="1"
                                                data-image-load=""
                                                data-image-latency="s-product-image"
                                                data-image-source-density="1"
                                              /></div></a
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  class="sg-col sg-col-4-of-12 sg-col-8-of-16 sg-col-12-of-20 s-list-col-right"
                                >
                                  <div class="sg-col-inner">
                                    <div
                                      class="a-section a-spacing-small a-spacing-top-small"
                                    >
                                      <div
                                        class="a-section a-spacing-none puis-padding-right-small s-title-instructions-style"
                                      >
                                        <div class="a-row a-spacing-micro">
                                          <span
                                            class="a-declarative"
                                            data-action="a-popover"
                                            data-csa-c-type="widget"
                                            data-csa-c-func-deps="aui-da-a-popover"
                                            data-a-popover='{"closeButton":"true","dataStrategy":"preload","name":"sp-info-popover-B07JMZYJVW","position":"triggerVertical"}'
                                            ><a
                                              href="javascript:void(0)"
                                              role="button"
                                              style="text-decoration: none"
                                              aria-label="View Sponsored information or leave ad feedback"
                                              class="s-label-popover s-sponsored-label-text"
                                              ><span
                                                class="s-label-popover-default"
                                                ><span
                                                  class="a-color-secondary puis-light-weight-text"
                                                  >Sponsored</span
                                                ></span
                                              ><span
                                                class="s-label-popover-hover"
                                                ><span class="a-color-base"
                                                  >Sponsored</span
                                                ></span
                                              >
                                              <span
                                                class="aok-inline-block s-sponsored-label-info-icon"
                                              ></span></a
                                          ></span>
                                          <div
                                            class="a-popover-preload"
                                            id="a-popover-sp-info-popover-B07JMZYJVW"
                                          >
                                            <span
                                              >You’re seeing this ad based on
                                              the product’s relevance to your
                                              search query.</span
                                            >
                                            <div class="a-row">
                                              <span
                                                class="a-declarative"
                                                data-action="s-safe-ajax-modal-trigger"
                                                data-csa-c-type="widget"
                                                data-csa-c-func-deps="aui-da-s-safe-ajax-modal-trigger"
                                                data-s-safe-ajax-modal-trigger='{"ajaxUrl":"/af/sp-loom/feedback-form?pl=%7B%22adPlacementMetaData%22%3A%7B%22searchTerms%22%3A%22U3Ryb2xsZXIgQWNjZXNzb3JpZXM%3D%22%2C%22pageType%22%3A%22Search%22%2C%22feedbackType%22%3A%22sponsoredProductsLoom%22%2C%22slotName%22%3A%22TOP%22%7D%2C%22adCreativeMetaData%22%3A%7B%22adProgramId%22%3A1024%2C%22adCreativeDetails%22%3A%5B%7B%22asin%22%3A%22B07JMZYJVW%22%2C%22title%22%3A%22Momcozy+Universal+Baby+Stroller+Organizer%2C+2+Insulated+Cup+Holder%2C+Detachable+Zippered+Pocket%2C+Adjus%22%2C%22priceInfo%22%3A%7B%22amount%22%3A24.99%2C%22currencyCode%22%3A%22USD%22%7D%2C%22sku%22%3A%22MAM-STRO-US%22%2C%22adId%22%3A%22A059928936GAPJKDPFA71%22%2C%22campaignId%22%3A%22A03297782A9O7XJFYWLHC%22%7D%5D%7D%7D","dataStrategy":"ajax","header":"Share your feedback"}'
                                                ><a
                                                  class="a-link-normal s-underline-text s-underline-link-text s-link-style"
                                                  href="#"
                                                  ><span
                                                    >Leave ad feedback</span
                                                  >
                                                </a>
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <h2
                                          class="a-size-mini a-spacing-none a-color-base s-line-clamp-2"
                                        >
                                          <a
                                            class="a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"
                                            href="/sspa/click?ie=UTF8&amp;spc=MTo0OTEzMDE5MzUzNDIxNDM3OjE2Njc0NTUwMTk6c3BfYXRmOjIwMDAzODUxNTI5MzM5ODo6MDo6&amp;sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&amp;url=%2FUniversal-Stroller-Organizer-Insulated-Momcozy%2Fdp%2FB07JMZYJVW%2Fref%3Dsr_1_1_sspa%3Fkeywords%3DStroller%2BAccessories%26qid%3D1667455019%26qu%3DeyJxc2MiOiI3LjE5IiwicXNhIjoiNi42NiIsInFzcCI6IjYuMDgifQ%253D%253D%26s%3Dbaby-products%26sr%3D1-1-spons%26psc%3D1%26smid%3DA3O35FW0HAF8LI"
                                            ><span
                                              class="a-size-medium a-color-base a-text-normal"
                                              >Momcozy Universal Baby Stroller Organizer, 2 Insulated Cup Holder, Detachable Zippered Pocket, Adjustable Shoulder Strap, Large Capacity for Baby Essentials, Compact Design Fits Most Strollers(Black)</span
                                            >
                                          </a>
                                        </h2>
                                        <div
                                          class="a-row a-size-base a-color-secondary"
                                        >
                                          <div
                                            class="a-row a-spacing-top-micro a-color-base"
                                          >
                                            <span
                                              class="a-size-base-plus a-color-information puis-medium-weight-text"
                                              >1 Count (Pack of 1)</span
                                            >
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        class="a-section a-spacing-none a-spacing-top-micro"
                                      >
                                        <div class="a-row a-size-small">
                                          <span aria-label="4.6 out of 5 stars"
                                            ><span
                                              class="a-declarative"
                                              data-action="a-popover"
                                              data-csa-c-type="widget"
                                              data-csa-c-func-deps="aui-da-a-popover"
                                              data-a-popover='{"closeButton":false,"closeButtonLabel":"","position":"triggerBottom","popoverLabel":"","url":"/review/widgets/average-customer-review/popover/ref=acr_search__popover?ie=UTF8&amp;asin=B07JMZYJVW&amp;ref=acr_search__popover&amp;contextId=search"}'
                                              ><a
                                                href="javascript:void(0)"
                                                role="button"
                                                class="a-popover-trigger a-declarative"
                                                ><i
                                                  class="a-icon a-icon-star-small a-star-small-4-5 aok-align-bottom"
                                                  ><span class="a-icon-alt"
                                                    >4.6 out of 5 stars</span
                                                  ></i
                                                ><i
                                                  class="a-icon a-icon-popover"
                                                ></i></a
                                            ></span> </span
                                          ><span aria-label="11,953"
                                            ><a
                                              class="a-link-normal s-underline-text s-underline-link-text s-link-style s-link-centralized-style"
                                              href="/sspa/click?ie=UTF8&amp;spc=MTo0OTEzMDE5MzUzNDIxNDM3OjE2Njc0NTUwMTk6c3BfYXRmOjIwMDAzODUxNTI5MzM5ODo6MDo6&amp;sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&amp;url=%2FUniversal-Stroller-Organizer-Insulated-Momcozy%2Fdp%2FB07JMZYJVW%2Fref%3Dsr_1_1_sspa%3Fkeywords%3DStroller%2BAccessories%26qid%3D1667455019%26qu%3DeyJxc2MiOiI3LjE5IiwicXNhIjoiNi42NiIsInFzcCI6IjYuMDgifQ%253D%253D%26s%3Dbaby-products%26sr%3D1-1-spons%26psc%3D1%26smid%3DA3O35FW0HAF8LI#customerReviews"
                                              ><span
                                                class="a-size-base puis-light-weight-text s-link-centralized-style"
                                                >11,953</span
                                              >
                                            </a>
                                          </span>
                                        </div>
                                      </div>
                                      <div class="sg-row">
                                        <div
                                          class="sg-col sg-col-4-of-12 sg-col-4-of-16 sg-col-4-of-20"
                                        >
                                          <div class="sg-col-inner">
                                            <div
                                              class="a-section a-spacing-none a-spacing-top-micro s-price-instructions-style"
                                            >
                                              <div
                                                class="a-row a-size-base a-color-base"
                                              >
                                                <a
                                                  class="a-size-base a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"
                                                  href="/sspa/click?ie=UTF8&amp;spc=MTo0OTEzMDE5MzUzNDIxNDM3OjE2Njc0NTUwMTk6c3BfYXRmOjIwMDAzODUxNTI5MzM5ODo6MDo6&amp;sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&amp;url=%2FUniversal-Stroller-Organizer-Insulated-Momcozy%2Fdp%2FB07JMZYJVW%2Fref%3Dsr_1_1_sspa%3Fkeywords%3DStroller%2BAccessories%26qid%3D1667455019%26qu%3DeyJxc2MiOiI3LjE5IiwicXNhIjoiNi42NiIsInFzcCI6IjYuMDgifQ%253D%253D%26s%3Dbaby-products%26sr%3D1-1-spons%26psc%3D1%26smid%3DA3O35FW0HAF8LI"
                                                  ><span
                                                    class="a-price"
                                                    data-a-size="xl"
                                                    data-a-color="base"
                                                    ><span class="a-offscreen"
                                                      >$24.99</span
                                                    ><span aria-hidden="true"
                                                      ><span
                                                        class="a-price-symbol"
                                                        >$</span
                                                      ><span
                                                        class="a-price-whole"
                                                        >24<span
                                                          class="a-price-decimal"
                                                          >.</span
                                                        ></span
                                                      ><span
                                                        class="a-price-fraction"
                                                        >99</span
                                                      ></span
                                                    ></span
                                                  >
                                                  <span
                                                    class="a-size-base a-color-secondary"
                                                    >($24.99/Count)</span
                                                  >
                                                  <span
                                                    class="a-price a-text-price"
                                                    data-a-size="b"
                                                    data-a-strike="true"
                                                    data-a-color="secondary"
                                                    ><span class="a-offscreen"
                                                      >$31.99</span
                                                    ><span aria-hidden="true"
                                                      >$31.99</span
                                                    ></span
                                                  >
                                                </a>
                                              </div>
                                              <div
                                                class="a-row a-size-small a-color-secondary"
                                              >
                                                <span
                                                  data-component-type="s-coupon-component"
                                                  class="rush-component"
                                                  data-component-props='{"asin":"B07JMZYJVW"}'
                                                  ><span
                                                    class="s-coupon-clipped aok-hidden"
                                                    ><span
                                                      class="a-color-base puis-light-weight-text"
                                                      >5% coupon applied at
                                                      checkout</span
                                                    ></span
                                                  ><span
                                                    class="s-coupon-unclipped"
                                                    ><span
                                                      class="a-size-base s-highlighted-text-padding aok-inline-block s-coupon-highlight-color"
                                                      >Save 5%</span
                                                    >
                                                    <span
                                                      class="a-color-base puis-light-weight-text"
                                                    >
                                                      with coupon</span
                                                    ></span
                                                  ></span
                                                >
                                              </div>
                                            </div>
                                            <div
                                              class="a-section a-spacing-none a-spacing-top-micro"
                                            >
                                              <div
                                                class="a-row a-size-base a-color-secondary s-align-children-center"
                                              >
                                                <span
                                                  class="a-size-small a-color-base puis-light-weight-text"
                                                  >Ships to Republic of
                                                  Korea</span
                                                >
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          class="sg-col sg-col-4-of-12 sg-col-4-of-16 sg-col-8-of-20"
                                        >
                                          <div class="sg-col-inner"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="s-result-list-placeholder aok-hidden sg-row">
                <div class="a-spinner-wrapper">
                  <span class="a-spinner a-spinner-medium"></span>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`;

describe('amazonUSScrapperJSCode', () => {
  test('검색 결과 추출', () => {
    const instruction = jsCode;

    const { document } = new JSDOM(html).window;

    Object.defineProperty(window, 'document', {
      writable: true,
      value: document,
    });

    const scrap = new Function(instruction);

    const result = scrap();

    expect(result[0].title).toBe('Momcozy Universal Baby Stroller Organizer, 2 Insulated Cup Holder, Detachable Zippered Pocket, Adjustable Shoulder Strap, Large Capacity for Baby Essentials, Compact Design Fits Most Strollers(Black)');
    expect(result[0].image).toBe('https://m.media-amazon.com/images/I/71E8RZFpNRL._AC_UY218_.jpg');
    expect(result[0].href).toBe('https://amazon.com/dp/B07JMZYJVW');
    expect(result[0].price).toBe('24.99');
    expect(result[0].symbol).toBe('$');
  });
});
