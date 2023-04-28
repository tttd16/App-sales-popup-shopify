import Shopify from 'shopify-api-node';

/**
 *
 * @param shopName
 * @param accessToken
 * @returns {Shopify}
 */
export const getShopify = (shopName, accessToken) => {
  return new Shopify({
    shopName: shopName,
    accessToken: accessToken
  });
};
