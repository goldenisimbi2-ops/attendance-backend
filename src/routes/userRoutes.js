import express from 'express';
import * as ctrl from '../controllers/userController.js';
import auth from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
const router = express.Router();

router.use(auth);

router.get('/', authorizeRoles('admin', 'head_teacher'), ctrl.listUsers);
router.get('/:id', authorizeRoles('admin', 'head_teacher'), ctrl.getUser);

router.post('/', authorizeRoles('admin'), ctrl.createUser);
router.put('/:id', authorizeRoles('admin'), ctrl.updateUser);
router.delete('/:id', authorizeRoles('admin'), ctrl.deleteUser);
router.patch('/:id/status', authorizeRoles('admin'), ctrl.patchStatus);

export default router;
