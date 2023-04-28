/**
 *
 * @param ms
 * @returns {Promise<unknown>}
 */
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
