import App from 'koa';
import 'isomorphic-fetch';
import {shopifyAuth} from '@avada/shopify-auth';
import shopifyConfig from '../config/shopify';
import render from 'koa-ejs';
import path from 'path';
import createErrorHandler from '../middleware/errorHandler';
import firebase from 'firebase-admin';
import * as errorService from '../services/errorService';
import api from './api';
import {createDefaultSetting} from '../repositories/settingsRepository';
import {getShopsByShopifyDomain} from '../repositories/shopsRepository';
import {syncOrdersToNotifications} from '../repositories/notificationsRepository';
import {getShopify} from '../services/shopifyService';
import defaultSettings from '../const/settings/defaultSettings';

if (firebase.apps.length === 0) {
  firebase.initializeApp();
}

// Initialize all demand configuration for an application
const app = new App();
app.proxy = true;

render(app, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
});
app.use(createErrorHandler());

// Register all routes for the application
app.use(
  shopifyAuth({
    apiKey: shopifyConfig.apiKey,
    firebaseApiKey: shopifyConfig.firebaseApiKey,
    initialPlan: {
      features: {},
      id: 'free',
      name: 'Free plan',
      periodDays: 3650,
      price: 0,
      trialDays: 0
    },
    scopes: shopifyConfig.scopes,
    secret: shopifyConfig.secret,
    successRedirect: '/notifications',
    afterInstall: async ctx => {
      try {
        const {shop, accessToken} = ctx.state.shopify;
        const {shopId} = await getShopsByShopifyDomain(shop);
        const shopify = getShopify(shop, accessToken);
        await Promise.all([
          createDefaultSetting({
            shopId: shopId,
            defaultData: defaultSettings
          }),
          syncOrdersToNotifications({
            shopId: shopId,
            shopName: shop,
            accessToken: accessToken
          }),
          shopify.webhook.create({
            topic: 'orders/create',
            address:
              'https://26e9-113-190-27-55.ngrok-free.app/webhook/order/new',
            format: 'json'
          }),
          shopify.scriptTag.create({
            event: 'onload',
            src: 'https://localhost:3000/scripttag/avada-sale-pop.min.js'
          })
        ]);
      } catch (e) {
        console.error(e);
      }
    }
  }).routes()
);

// Handling all errors
api.on('error', errorService.handleError);

export default app;
