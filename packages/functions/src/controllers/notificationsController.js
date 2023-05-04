import {getNotifications} from '../repositories/notificationsRepository';
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
