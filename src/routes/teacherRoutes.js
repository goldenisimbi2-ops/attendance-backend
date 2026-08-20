import express from 'express';
import * as ctrl from '../controllers/teacherController.js';
import auth from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
const router = express.Router();

router.get('/', auth, authorizeRoles('admin', 'head_teacher'), ctrl.listTeachers);

router.use(auth, authorizeRoles('teacher'));
router.get('/me', ctrl.me);
router.get('/me/classes', ctrl.myClasses);
router.get('/me/sessions', ctrl.mySessions);
router.get('/me/attendance', ctrl.myAttendance);

export default router;
