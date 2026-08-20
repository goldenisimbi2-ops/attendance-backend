import { ClassSubject, Class, Subject, User, AttendanceSession, AttendanceRecord } from '../database/models/index.js';

export async function createAssignment(req, res, next) {
  try {
    const { classId, subjectId, teacherId } = req.body;
    const cls = await Class.findByPk(classId); if(!cls) return res.status(404).json({success:false,message:'Class not found'});
    const sub = await Subject.findByPk(subjectId); if(!sub) return res.status(404).json({success:false,message:'Subject not found'});
    const teacher = await User.findByPk(teacherId); if(!teacher) return res.status(404).json({success:false,message:'Teacher not found'});
    const cs = await ClassSubject.create({ classId, subjectId, teacherId });
    res.status(201).json({ success: true, data: cs });
  } catch (err) { next(err); }
}

export async function listAssignments(req, res, next) { 
  try { 
    const rows = await ClassSubject.findAll({
      include: [
        { model: Class, as: 'class' },
        { model: Subject, as: 'subject' },
        { model: User, as: 'teacher' }
      ]
    }); 
    res.json({ success: true, data: rows }); 
  } catch (err){next(err)} 
}
export async function getAssignment(req, res, next){ try{ const row = await ClassSubject.findByPk(req.params.id, { include: ['class', 'subject', 'teacher'] }); if(!row) return res.status(404).json({success:false,message:'Not found'}); res.json({success:true,data:row}); }catch(err){next(err)} }
export async function updateAssignment(req, res, next){ try{ const row = await ClassSubject.findByPk(req.params.id); if(!row) return res.status(404).json({success:false,message:'Not found'}); await row.update(req.body); res.json({success:true,data:row}); }catch(err){next(err)} }
export async function deleteAssignment(req, res, next) {
  try {
    const row = await ClassSubject.findByPk(req.params.id);
    if (!row) return res.status(404).json({ success: false, message: 'Not found' });

    const sessions = await AttendanceSession.findAll({ where: { classSubjectId: row.id } });
    for (const session of sessions) {
      await AttendanceRecord.destroy({ where: { attendanceSessionId: session.id } });
      await session.destroy();
    }

    await row.destroy();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
}
