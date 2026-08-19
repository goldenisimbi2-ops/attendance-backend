import express from 'express';
import * as ctrl from '../controllers/attendanceSessionController.js';
import auth from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
const router = express.Router();

router.use(auth);
router.post('/', authorizeRoles('teacher','admin'), ctrl.createSession);
router.get('/', authorizeRoles('teacher','admin'), ctrl.listSessions);
router.get('/:id', authorizeRoles('teacher','admin'), ctrl.getSession);
router.put('/:id', authorizeRoles('teacher','admin'), ctrl.updateSession);
router.patch('/:id/status', authorizeRoles('teacher','admin'), ctrl.patchStatus);
router.delete('/:id', authorizeRoles('teacher','admin'), ctrl.deleteSession);

export default router;
