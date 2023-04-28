import {Firestore} from '@google-cloud/firestore';
import {getShopify} from '../services/shopifyService';
import {
  convertOrdersToNotifications,
  convertOrderToNotificationItem
} from '../services/convertOrderToNotificationService';
import moment from 'moment';

const firestore = new Firestore();
const notificationsRef = firestore.collection('notifications');

/**
 *
 * @returns {Promise<null>}
 */
export const checkNotification = async () => {
  const notification = await notificationsRef.limit(1).get();
  if (notification.empty) return null;
};

/**
 *
 * @returns {Promise<*>}
 */
export const getNotifications = async ({shopifyDomain}) => {
  const check = await checkNotification();
  if (!check) {
    const notificationsDocs = await notificationsRef
      .where('shopifyDomain', '==', shopifyDomain)
      .get();
    return notificationsDocs.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      timestamp: doc.data().timestamp.toDate()
    }));
  }
};

/**
 *
 * @param shopId
 * @param shopName
 * @param accessToken
 * @returns {Promise<*>}
 */
export const syncOrdersToNotifications = async ({
  shopId,
  shopName,
  accessToken
}) => {
  const notifications = await getNotifications({shopifyDomain: shopName});
  if (notifications.length === 0) {
    const shopify = getShopify(shopName, accessToken);
    const orders = await shopify.order.list({limit: 30});
    const arrIds = orders.map(order => order.line_items[0].product_id);
    const productIds = [...new Set(arrIds)].join(',');

    return convertOrdersToNotifications({
      orders: orders,
      shopify: shopify,
      shopId: shopId,
      shopName: shopName,
      productIds: productIds
    });
  }
};

/**
 *
 * @param shopName
 * @param accessToken
 * @param orderData
 * @returns {Promise<*>}
 */
export const getNotificationItem = async ({
  shopName,
  accessToken,
  notificationItem
}) => {
  const shopify = getShopify(shopName, accessToken);
  const productId = notificationItem[0].line_items[0].product_id;
  return convertOrderToNotificationItem({
    orders: notificationItem,
    productIds: productId,
    shopify: shopify
  });
};

/**
 *
 * @param shopId
 * @param shopifyDomain
 * @param data
 * @returns {Promise<*>}
 */
export const addNotification = async ({shopId, shopifyDomain, data}) => {
  return notificationsRef.add({
    ...data,
    shopId: shopId,
    shopifyDomain: shopifyDomain
  });
};

/**
 *
 * @param shopifyDomain
 * @returns {Promise<*|null>}
 */

export const getNotificationsByDomain = async shopifyDomain => {
  const check = await checkNotification();
  if (!check) {
    const notificationsDocs = await notificationsRef
      .where('shopifyDomain', '==', shopifyDomain)
      .get();
    return notificationsDocs.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: moment(doc.data().timestamp.toDate()).fromNow()
    }));
  }
};
