import {getCurrentShop, getCurrentUserInstance} from '../helpers/auth';
import {getSetting, updateSetting} from '../repositories/settingsRepository';

/**
 *
 * @param ctx
 * @returns {Promise<{data: (*&{id: *}), success: boolean}|{data: {}, success: boolean}>}
 */
export const get = async ctx => {
  try {
    const shopId = getCurrentShop(ctx);
    const setting = await getSetting(shopId);
    return (ctx.body = {
      data: setting,
      success: true
    });
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      data: {},
      success: false
    });
  }
};

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean}>}
 */
export const update = async ctx => {
  try {
    const updateData = ctx.req.body;
    const shopId = getCurrentShop(ctx);
    await updateSetting(shopId, updateData);
    ctx.body = {
      success: true
    };
  } catch (error) {
    ctx.status = 404;
    return (ctx.body = {
      success: false
    });
  }
};
