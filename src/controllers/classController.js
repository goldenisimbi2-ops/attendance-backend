import { Class, ClassSubject, AttendanceSession, AttendanceRecord, StudentProfile, User } from '../database/models/index.js';

export async function createClass(req, res, next) {
  try {
    const cls = await Class.create(req.body);
    res.status(201).json({ success: true, data: cls });
  } catch (err) { next(err); }
}

export async function listClasses(req, res, next) {
  try { const rows = await Class.findAll(); res.json({ success: true, data: rows }); } catch (err) { next(err); }
}

export async function listClassesPublic(req, res, next) {
  try { const rows = await Class.findAll(); res.json({ success: true, data: rows }); } catch (err) { next(err); }
}

export async function getClass(req, res, next) {
  try { const row = await Class.findByPk(req.params.id); if(!row) return res.status(404).json({success:false,message:'Not found'}); res.json({success:true,data:row}); } catch(err){next(err)}
}

export async function updateClass(req, res, next) {
  try { const row = await Class.findByPk(req.params.id); if(!row) return res.status(404).json({success:false,message:'Not found'}); await row.update(req.body); res.json({success:true,data:row}); } catch(err){next(err)}
}

export async function deleteClass(req, res, next) {
  try {
    const row = await Class.findByPk(req.params.id);
    if (!row) return res.status(404).json({ success: false, message: 'Not found' });

    // Manually cascade deletes to avoid SQLite foreign key constraint failures
    const classSubjects = await ClassSubject.findAll({ where: { classId: row.id } });
    for (const cs of classSubjects) {
      const sessions = await AttendanceSession.findAll({ where: { classSubjectId: cs.id } });
      for (const session of sessions) {
        await AttendanceRecord.destroy({ where: { attendanceSessionId: session.id } });
        await session.destroy();
      }
      await cs.destroy();
    }

    // Unlink students from the class
    await StudentProfile.update({ classId: null }, { where: { classId: row.id } });

    await row.destroy();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
}

export async function getClassStudents(req, res, next) {
  try {
    const students = await User.findAll({
      where: { role: 'student' },
      include: [{
        model: StudentProfile,
        as: 'studentProfile',
        where: { classId: req.params.id },
        required: true
      }],
      attributes: { exclude: ['password'] }
    });
    res.json({ success: true, data: students });
  } catch (err) { next(err); }
}
