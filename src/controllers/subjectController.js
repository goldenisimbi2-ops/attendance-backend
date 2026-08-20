import { Subject, ClassSubject, AttendanceSession, AttendanceRecord, Class } from '../database/models/index.js';

export async function createSubject(req, res, next) {
  try { const s = await Subject.create(req.body); res.status(201).json({ success: true, data: s }); } catch (err) { next(err); }
}
export async function listSubjects(req, res, next) { try { const rows = await Subject.findAll({ include: [{ model: Class, as: 'class' }] }); res.json({ success: true, data: rows }); } catch (err) { next(err); } }
export async function getSubject(req, res, next) { try { const row = await Subject.findByPk(req.params.id, { include: [{ model: Class, as: 'class' }] }); if(!row) return res.status(404).json({success:false,message:'Not found'}); res.json({success:true,data:row}); } catch(err){next(err)} }
export async function updateSubject(req, res, next) { try { const row = await Subject.findByPk(req.params.id); if(!row) return res.status(404).json({success:false,message:'Not found'}); await row.update(req.body); res.json({success:true,data:row}); } catch(err){next(err)} }
export async function deleteSubject(req, res, next) {
  try {
    const row = await Subject.findByPk(req.params.id);
    if (!row) return res.status(404).json({ success: false, message: 'Not found' });

    // Manually cascade deletes to avoid SQLite foreign key constraints
    const classSubjects = await ClassSubject.findAll({ where: { subjectId: row.id } });
    for (const cs of classSubjects) {
      const sessions = await AttendanceSession.findAll({ where: { classSubjectId: cs.id } });
      for (const session of sessions) {
        await AttendanceRecord.destroy({ where: { attendanceSessionId: session.id } });
        await session.destroy();
      }
      await cs.destroy();
    }

    await row.destroy();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
}
