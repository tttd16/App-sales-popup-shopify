import {getShopsByShopifyDomain} from '../repositories/shopsRepository';
import {
  addNotification,
  getNotificationItem
} from '../repositories/notificationsRepository';

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean}|{orderNew: *, success: boolean}>}
 */
export const listenNewOrder = async ctx => {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const orderData = [ctx.req.body];
    const {shopId, accessToken} = await getShopsByShopifyDomain(shopifyDomain);
    const notificationItem = await getNotificationItem({
      shopName: shopifyDomain,
      accessToken: accessToken,
      notificationItem: orderData
    });
    await addNotification({
      shopId: shopId,
      shopifyDomain: shopifyDomain,
      data: notificationItem[0]
    });
    return (ctx.body = {
      success: true
    });
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false
    });
  }
};
