import express from 'express';
import * as ctrl from '../controllers/classSubjectController.js';
import auth from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
const router = express.Router();

router.use(auth, authorizeRoles('admin'));
router.post('/', ctrl.createAssignment);
router.get('/', ctrl.listAssignments);
router.get('/:id', ctrl.getAssignment);
router.put('/:id', ctrl.updateAssignment);
router.delete('/:id', ctrl.deleteAssignment);

export default router;
