import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
const collectionShops = firestore.collection('shops');

/**
 *
 * @param shopifyDomain
 * @returns {Promise<(*&{shopId})|null>}
 */
export const getShopsByShopifyDomain = async shopifyDomain => {
  try {
    const shopsDocs = await collectionShops
      .where('shopifyDomain', '==', shopifyDomain)
      .limit(1)
      .get();
    if (shopsDocs.empty) {
      return null;
    }
    const shopsDoc = shopsDocs.docs[0];
    return {
      shopId: shopsDoc.id,
      ...shopsDoc.data()
    };
  } catch (e) {
    console.error(e);
  }
};
