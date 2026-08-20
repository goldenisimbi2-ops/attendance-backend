import express from 'express';
import * as ctrl from '../controllers/attendanceController.js';
import auth from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
const router = express.Router();

router.use(auth);
router.get('/', authorizeRoles('admin', 'head_teacher'), ctrl.listAllRecords);
router.get('/session/all', authorizeRoles('admin', 'head_teacher'), ctrl.listAllRecords);

router.post('/', authorizeRoles('teacher','admin'), ctrl.createRecord);
router.post('/bulk', authorizeRoles('teacher','admin'), ctrl.bulkRecords);
router.get('/session/:sessionId', authorizeRoles('teacher','admin'), ctrl.listSessionRecords);
router.put('/:id', authorizeRoles('teacher','admin'), ctrl.updateRecord);
router.delete('/:id', authorizeRoles('teacher','admin'), ctrl.deleteRecord);

export default router;
