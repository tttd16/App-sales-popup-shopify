import {
  getNotificationsByDomain,
  getNotifications
} from '../repositories/notificationsRepository';
import {getSetting} from '../repositories/settingsRepository';
import {getCurrentUserInstance} from '../helpers/auth';

/**
 *
 * @param ctx
 * @returns {Promise<*>}
 */
export const get = async ctx => {
  const {shop} = getCurrentUserInstance(ctx);
  const data = await getNotifications({shopifyDomain: shop.shopifyDomain});
  return (ctx.body = data);
};

/**
 *
 * @param ctx
 * @returns {Promise<{data: *[], error}>}
 */
export const list = async ctx => {
  try {
    const {shopifyDomain} = ctx.query;
    const notifications = await getNotificationsByDomain(shopifyDomain);
    const shopId = notifications[0].shopId;
    const setting = await getSetting(shopId);

    ctx.body = {
      notifications: notifications,
      settings: setting
    };
  } catch (e) {
    return (ctx.body = {
      data: [],
      error: e.message
    });
  }
};
