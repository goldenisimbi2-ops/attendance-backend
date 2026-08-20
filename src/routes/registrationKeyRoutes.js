import express from 'express';
import * as ctrl from '../controllers/registrationKeyController.js';
import auth from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(auth, authorizeRoles('admin'));
router.post('/', ctrl.generateKey);
router.get('/', ctrl.listKeys);

export default router;
