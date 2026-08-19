import { AttendanceRecord, AttendanceSession, StudentProfile, User, sequelize } from '../database/models/index.js';
import { Op } from 'sequelize';

export async function createRecord(req, res, next) {
  try {
    const { attendanceSessionId, studentId, status, remarks } = req.body;
    const session = await AttendanceSession.findByPk(attendanceSessionId);
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
    if (session.status !== 'open') return res.status(400).json({ success: false, message: 'Session not open' });
    // only teacher assigned or admin
    const cs = await session.getClassSubject();
    if (req.user.role === 'teacher' && cs.teacherId !== req.user.id) return res.status(403).json({ success: false, message: 'Not allowed' });
    // student must belong to the class
    const studentProfile = await StudentProfile.findOne({ where: { userId: studentId } });
    if (!studentProfile) return res.status(400).json({ success: false, message: 'Student not found in class' });
    const existing = await AttendanceRecord.findOne({ where: { attendanceSessionId, studentId } });
    if (existing) return res.status(409).json({ success: false, message: 'Duplicate record' });
    const rec = await AttendanceRecord.create({ attendanceSessionId, studentId, status, remarks, markedBy: req.user.id, checkInTime: new Date() });
    res.status(201).json({ success: true, data: rec });
  } catch (err) { next(err); }
}

export async function listSessionRecords(req, res, next) {
  try {
    const { sessionId } = req.params;
    const rows = await AttendanceRecord.findAll({ where: { attendanceSessionId: sessionId } });
    res.json({ success: true, data: rows });
  } catch (err) { next(err); }
}

export async function updateRecord(req, res, next) {
  try {
    const rec = await AttendanceRecord.findByPk(req.params.id);
    if (!rec) return res.status(404).json({ success: false, message: 'Not found' });
    const session = await AttendanceSession.findByPk(rec.attendanceSessionId);
    if (req.user.role === 'teacher' && session.createdBy !== req.user.id) return res.status(403).json({ success: false, message: 'Forbidden' });
    if (session.status !== 'open' && req.user.role !== 'admin') return res.status(400).json({ success: false, message: 'Session closed' });
    await rec.update(req.body);
    res.json({ success: true, data: rec });
  } catch (err) { next(err); }
}

export async function deleteRecord(req, res, next) {
  try {
    const rec = await AttendanceRecord.findByPk(req.params.id);
    if (!rec) return res.status(404).json({ success: false, message: 'Not found' });
    const session = await AttendanceSession.findByPk(rec.attendanceSessionId);
    if (req.user.role === 'teacher' && session.createdBy !== req.user.id) return res.status(403).json({ success: false, message: 'Forbidden' });
    await rec.destroy();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
}

export async function bulkRecords(req, res, next) {
  const t = await sequelize.transaction();
  try {
    const { sessionId, records } = req.body;
    const session = await AttendanceSession.findByPk(sessionId);
    if (!session) { await t.rollback(); return res.status(404).json({ success: false, message: 'Session not found' }); }
    if (session.status !== 'open') { await t.rollback(); return res.status(400).json({ success: false, message: 'Session not open' }); }
    const cs = await session.getClassSubject();
    if (req.user.role === 'teacher' && cs.teacherId !== req.user.id) { await t.rollback(); return res.status(403).json({ success: false, message: 'Not allowed' }); }
    const results = [];
    for (const r of records) {
      const existing = await AttendanceRecord.findOne({ where: { attendanceSessionId: sessionId, studentId: r.studentId }, transaction: t });
      if (existing) {
        await existing.update({ status: r.status, remarks: r.remarks, markedBy: req.user.id }, { transaction: t });
        results.push(existing);
      } else {
        const created = await AttendanceRecord.create({ attendanceSessionId: sessionId, studentId: r.studentId, status: r.status, remarks: r.remarks, markedBy: req.user.id, checkInTime: new Date() }, { transaction: t });
        results.push(created);
      }
    }
    await t.commit();
    res.json({ success: true, data: results });
  } catch (err) { await t.rollback(); next(err); }
}
