import App from 'koa';
import cors from '@koa/cors';
import * as errorService from '../services/errorService';
import router from '../routes/clientApi';

const api = new App();

api.use(cors());
api.proxy = true;

// Register all routes for the application
api.use(router.allowedMethods());
api.use(router.routes());

// Handling all errors
api.on('error', errorService.handleError);

export default api;
