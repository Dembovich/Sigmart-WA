import Router from 'express'
import PostController from './PostController.js';

const router = new Router()

router.post('/ozon/push', PostController.OzonPushNotifications)



export default router;
