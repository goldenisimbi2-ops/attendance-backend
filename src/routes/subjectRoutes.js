import express from 'express';
import * as ctrl from '../controllers/subjectController.js';
import auth from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
const router = express.Router();

router.use(auth, authorizeRoles('admin'));
router.post('/', ctrl.createSubject);
router.get('/', ctrl.listSubjects);
router.get('/:id', ctrl.getSubject);
router.put('/:id', ctrl.updateSubject);
router.delete('/:id', ctrl.deleteSubject);

export default router;
