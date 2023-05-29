import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export const api = new WooCommerceRestApi({
    url: "http://wp.annakuntcevich.com",
    consumerKey: "ck_c19f400dd9a98b489134ea0c5281829055eca07a",
    consumerSecret: "cs_99e14dff306f77ff1755b06f62ca71ce4b17f753",
    version: "wc/v3"
  });