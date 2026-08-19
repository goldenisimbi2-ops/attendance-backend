import express from 'express';
import { dashboard } from '../controllers/dashboardController.js';
import auth from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
const router = express.Router();

router.use(auth, authorizeRoles('admin'));
router.get('/', dashboard);

export default router;
