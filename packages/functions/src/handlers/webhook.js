import App from 'koa';
import * as errorService from '../services/errorService';
import router from '../routes/webhook';
import cors from '@koa/cors';

const api = new App();

api.use(cors());
api.proxy = true;

// Register all routes for the application
api.use(router.allowedMethods());
api.use(router.routes());

// Handling all errors
api.on('error', errorService.handleError);
export default api;
