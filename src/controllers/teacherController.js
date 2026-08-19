import { User, ClassSubject, AttendanceSession, AttendanceRecord } from '../database/models/index.js';

export async function me(req, res, next) {
  try { const user = await User.findByPk(req.user.id, { include: ['teacherProfile'] }); res.json({ success: true, data: user }); } catch(err){next(err)}
}

export async function myClasses(req, res, next) { try { const classes = await ClassSubject.findAll({ where: { teacherId: req.user.id } }); res.json({ success: true, data: classes }); } catch(err){next(err)} }
export async function mySessions(req, res, next) { try { const sessions = await AttendanceSession.findAll({ where: { createdBy: req.user.id } }); res.json({ success: true, data: sessions }); } catch(err){next(err)} }
export async function myAttendance(req, res, next) { try { const records = await AttendanceRecord.findAll({ where: { markedBy: req.user.id } }); res.json({ success: true, data: records }); } catch(err){next(err)} }
