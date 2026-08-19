import express from 'express';
import * as ctrl from '../controllers/classController.js';
import auth from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
const router = express.Router();

router.use(auth, authorizeRoles('admin'));
router.post('/', ctrl.createClass);
router.get('/', ctrl.listClasses);
router.get('/:id', ctrl.getClass);
router.put('/:id', ctrl.updateClass);
router.delete('/:id', ctrl.deleteClass);

export default router;
