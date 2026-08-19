import express from 'express';
import * as ctrl from '../controllers/studentController.js';
import auth from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
const router = express.Router();

router.use(auth, authorizeRoles('student'));
router.get('/me', ctrl.me);
router.get('/me/attendance', ctrl.myAttendance);
router.get('/me/attendance/summary', ctrl.attendanceSummary);

export default router;
