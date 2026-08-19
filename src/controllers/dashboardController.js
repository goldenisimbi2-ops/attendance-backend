import { User, Class, Subject, AttendanceSession, AttendanceRecord } from '../database/models/index.js';

export async function dashboard(req, res, next) {
  try {
    const totalUsers = await User.count();
    const totalStudents = await User.count({ where: { role: 'student' } });
    const totalTeachers = await User.count({ where: { role: 'teacher' } });
    const totalClasses = await Class.count();
    const totalSubjects = await Subject.count();
    const totalSessions = await AttendanceSession.count();
    const totalRecords = await AttendanceRecord.count();
    const present = await AttendanceRecord.count({ where: { status: 'present' } });
    const absent = await AttendanceRecord.count({ where: { status: 'absent' } });
    const late = await AttendanceRecord.count({ where: { status: 'late' } });
    const excused = await AttendanceRecord.count({ where: { status: 'excused' } });
    const overallMarked = present + absent + late + excused;
    const overallAttendance = overallMarked === 0 ? 0 : (present + late) / overallMarked * 100;
    res.json({ success: true, data: { totalUsers, totalStudents, totalTeachers, totalClasses, totalSubjects, totalSessions, totalRecords, present, absent, late, excused, overallAttendance } });
  } catch (err) { next(err); }
}
