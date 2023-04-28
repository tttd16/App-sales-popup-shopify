import {addNotification} from '../repositories/notificationsRepository';

/**
 *
 * @param orders
 * @param productIds
 * @param shopify
 * @returns {Promise<*>}
 */
export const convertOrderToNotificationItem = async ({
  orders,
  productIds,
  shopify
}) => {
  const products = await shopify.product.list({
    limit: 30,
    ids: productIds
  });
  return orders.map(orderItem => {
    const productId = orderItem.line_items[0].product_id;
    const productItem = products.find(product => product.id === productId);
    return {
      city: orderItem.billing_address.city,
      country: orderItem.billing_address.country,
      firstName: orderItem.billing_address.first_name,
      timestamp: new Date(orderItem.created_at),
      productName: orderItem.line_items[0].name,
      productId: productItem.id,
      productImage:
        productItem.image.src ||
        'https://stormgain.com/sites/default/files/news/DOGE.jpg'
    };
  });
};

/**
 *
 * @param ref
 * @param orders
 * @param shopify
 * @param shopId
 * @param shopName
 * @param productIds
 * @returns {Promise<*>}
 */
export const convertOrdersToNotifications = async ({
  orders,
  shopify,
  shopId,
  shopName,
  productIds
}) => {
  const ordersMap = await convertOrderToNotificationItem({
    orders: orders,
    productIds: productIds,
    shopify: shopify
  });
  return ordersMap.map(item => {
    return addNotification({shopId, shopifyDomain: shopName, data: item});
  });
};
