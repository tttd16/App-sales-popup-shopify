import Router from 'koa-router';
import * as notificationsController from '../controllers/notificationsController';

const router = new Router({
  prefix: '/clientApi'
});

router.get('/notifications', notificationsController.list);
export default router;
