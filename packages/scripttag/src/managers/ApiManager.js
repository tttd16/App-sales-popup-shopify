import makeRequest from '../helpers/api/makeRequest';

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };
  getApiData = async () => {
    const shopifyDomain = window.Shopify.shop;
    const apiUrl = `https://localhost:3000/clientApi/notifications?shopifyDomain=${shopifyDomain}`;
    const {notifications, settings} = await makeRequest(apiUrl);

    return {notifications, settings};
  };
}
