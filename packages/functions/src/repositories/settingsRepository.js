import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
const settingsRef = firestore.collection('settings');

/**
 *
 * @param shopId
 * @param defaultData
 * @returns {Promise<*>}
 */
export const createDefaultSetting = async ({shopId, defaultData}) => {
  const setting = await getSetting(shopId);
  if (!setting) {
    return settingsRef.add({
      ...defaultData,
      shopId
    });
  }
};

/**
 *
 * @param shopId
 * @returns {Promise<(*&{id})|null>}
 */
export const getSetting = async shopId => {
  const settingDocs = await settingsRef
    .where('shopId', '==', shopId)
    .limit(1)
    .get();
  if (settingDocs.empty) return null;
  const settingDoc = settingDocs.docs[0];
  return {
    id: settingDoc.id,
    ...settingDoc.data()
  };
};

/**
 *
 * @param shopId
 * @param updateData
 * @returns {Promise<void>}
 */
export const updateSetting = async (shopId, updateData) => {
  const settingDocs = await settingsRef
    .where('shopId', '==', shopId)
    .limit(1)
    .get();

  const docRef = settingDocs.docs[0].ref;
  const currentData = settingDocs.docs[0].data();
  const updatedData = {...currentData, ...updateData};

  await docRef.update(updatedData);
};
