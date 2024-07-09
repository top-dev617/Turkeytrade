import Cookies from "js-cookie";

export const base_url = process.env.NEXT_PUBLIC_SERVER_URL;
export const socket_url = process.env.NEXT_PUBLIC_SOCKET_URL;

export const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

export const TURKEY_TOKEN = Cookies.get("turkey-trade-market");
export const TURKEY_TOKEN_NAME = "turkey-trade-market";
export const TURKEY_SAVE_PRODUCTS_NAME = "save-products";
export const TURKEY_VIEW_PRODUCTS_NAME = "view-prods";
export const TURKEY_STORE_MODAL = "storeModal";
export const TURKEY_PRODUCT_INFO = "productInfo";
export const TURKEY_WELCOME_MODAL = "welcomeModal";

export const setTurkeyToken = async (token) => {
  await Cookies.set(TURKEY_TOKEN_NAME, token, { expires: 7 });
  return true;
};
