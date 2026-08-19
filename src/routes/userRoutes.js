import express from 'express';
import * as ctrl from '../controllers/userController.js';
import auth from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
const router = express.Router();

router.use(auth, authorizeRoles('admin'));
router.get('/', ctrl.listUsers);
router.get('/:id', ctrl.getUser);
router.post('/', ctrl.createUser);
router.put('/:id', ctrl.updateUser);
router.delete('/:id', ctrl.deleteUser);
router.patch('/:id/status', ctrl.patchStatus);

export default router;
