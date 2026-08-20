import { User, Class, Subject, AttendanceSession, AttendanceRecord, ClassSubject } from '../database/models/index.js';

export async function dashboard(req, res, next) {
  try {
    const totalUsers = await User.count();
    const totalStudents = await User.count({ where: { role: 'student' } });
    const totalTeachers = await User.count({ where: { role: 'teacher' } });
    const totalClasses = await Class.count();
    const totalSubjects = await Subject.count();
    const totalSessions = await AttendanceSession.count();
    
    const present = await AttendanceRecord.count({ where: { status: 'present' } });
    const absent = await AttendanceRecord.count({ where: { status: 'absent' } });
    const late = await AttendanceRecord.count({ where: { status: 'late' } });
    const excused = await AttendanceRecord.count({ where: { status: 'excused' } });
    
    const overallMarked = present + absent + late + excused;
    const attendancePercentage = overallMarked === 0 ? 0 : Math.round((present + late) / overallMarked * 100);

    const totals = [
      { key: 'users', label: 'Total Users', value: totalUsers, icon: 'Users' },
      { key: 'students', label: 'Total Students', value: totalStudents, icon: 'UserRound' },
      { key: 'teachers', label: 'Total Teachers', value: totalTeachers, icon: 'UserRound' },
      { key: 'classes', label: 'Total Classes', value: totalClasses, icon: 'BookOpen' }
    ];

    const recentSessionsRows = await AttendanceSession.findAll({
      order: [['createdAt', 'DESC']],
      limit: 3,
      include: [{
        model: ClassSubject, as: 'classSubject',
        include: [{ model: Class, as: 'class' }, { model: Subject, as: 'subject' }]
      }]
    });

    const recentSessions = recentSessionsRows.map(s => ({
      id: s.id,
      title: s.title || s.classSubject?.subject?.name || 'Class Session',
      subtitle: `${s.startTime || s.date} • ${s.classSubject?.class?.name || 'Unknown Class'}`,
      status: s.status,
      statusLabel: s.status === 'open' ? 'Open' : (s.status === 'closed' ? 'Closed' : 'Late')
    }));

    res.json({ 
      success: true, 
      data: { 
        // AdminDashboard specific structures
        totals, 
        recentSessions,
        attendancePercentage,

        // HeadTeacherDashboard specific structures (legacy)
        totalUsers,
        totalStudents,
        totalTeachers,
        totalClasses,
        totalSubjects,
        totalSessions,
        present,
        absent,
        late,
        excused,
        overallAttendance: attendancePercentage
      } 
    });
  } catch (err) { next(err); }
}
