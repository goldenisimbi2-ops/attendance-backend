import express from 'express';
import * as ctrl from '../controllers/classController.js';
import auth from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
const router = express.Router();

router.get('/public', ctrl.listClassesPublic);

router.use(auth);

// Allow teachers to read class details and student lists
router.get('/:id', authorizeRoles('admin', 'head_teacher', 'teacher'), ctrl.getClass);
router.get('/:id/students', authorizeRoles('admin', 'head_teacher', 'teacher'), ctrl.getClassStudents);

// Admin / head teacher only for mutations and full list
router.post('/', authorizeRoles('admin', 'head_teacher'), ctrl.createClass);
router.get('/', authorizeRoles('admin', 'head_teacher'), ctrl.listClasses);
router.put('/:id', authorizeRoles('admin', 'head_teacher'), ctrl.updateClass);
router.delete('/:id', authorizeRoles('admin', 'head_teacher'), ctrl.deleteClass);

export default router;
