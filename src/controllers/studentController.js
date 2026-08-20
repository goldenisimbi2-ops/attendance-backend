import { User, StudentProfile, AttendanceRecord, AttendanceSession } from '../database/models/index.js';
import { Op } from 'sequelize';

export async function me(req, res, next) {
  try {
    const user = await User.findByPk(req.user.id, { include: ['studentProfile'] });
    res.json({ success: true, data: user });
  } catch (err) { next(err); }
}

export async function myAttendance(req, res, next) {
  try {
    const records = await AttendanceRecord.findAll({ where: { studentId: req.user.id } });
    res.json({ success: true, data: records });
  } catch (err) { next(err); }
}

export async function attendanceSummary(req, res, next) {
  try {
    const total = await AttendanceRecord.count({ where: { studentId: req.user.id } });
    const present = await AttendanceRecord.count({ where: { studentId: req.user.id, status: 'present' } });
    const absent = await AttendanceRecord.count({ where: { studentId: req.user.id, status: 'absent' } });
    const late = await AttendanceRecord.count({ where: { studentId: req.user.id, status: 'late' } });
    const excused = await AttendanceRecord.count({ where: { studentId: req.user.id, status: 'excused' } });
    const marked = present + absent + late + excused;
    const attendancePercentage = marked === 0 ? 0 : ((present + late) / marked) * 100;
    res.json({ success: true, data: { totalSessions: total, present, absent, late, excused, attendancePercentage } });
  } catch (err) { next(err); }
}

export async function listStudents(req, res, next) {
  try {
    const students = await User.findAll({
      where: { role: 'student' },
      include: ['studentProfile'],
      attributes: { exclude: ['password'] }
    });
    res.json({ success: true, data: students });
  } catch (err) { next(err); }
}
