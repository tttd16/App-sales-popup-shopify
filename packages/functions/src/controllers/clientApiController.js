import {getNotificationsByDomain} from '../repositories/notificationsRepository';
import {getSetting} from '../repositories/settingsRepository';

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
