import { User, ClassSubject, AttendanceSession, AttendanceRecord, Class, Subject, StudentProfile } from '../database/models/index.js';

export async function me(req, res, next) {
  try { const user = await User.findByPk(req.user.id, { include: ['teacherProfile'] }); res.json({ success: true, data: user }); } catch(err){next(err)}
}

export async function myClasses(req, res, next) { 
  try { 
    const classes = await ClassSubject.findAll({ 
      where: { teacherId: req.user.id },
      include: [
        { 
          model: Class, as: 'class',
          include: [{ 
            model: StudentProfile, as: 'students',
            include: [{ model: User, as: 'user', attributes: ['firstName', 'lastName'] }]
          }]
        },
        { model: Subject, as: 'subject' }
      ]
    }); 

    res.json({ success: true, data: classes }); 
  } catch(err){next(err)} 
}

export async function mySessions(req, res, next) { 
  try { 
    const sessions = await AttendanceSession.findAll({ 
      where: { createdBy: req.user.id },
      include: [{
        model: ClassSubject, as: 'classSubject',
        include: [
          { model: Class, as: 'class' },
          { model: Subject, as: 'subject' }
        ]
      }]
    }); 
    res.json({ success: true, data: sessions }); 
  } catch(err){next(err)} 
}

export async function myAttendance(req, res, next) { 
  try { 
    const records = await AttendanceRecord.findAll({ 
      where: { markedBy: req.user.id },
      include: [
        { model: User, as: 'student', attributes: ['firstName', 'lastName'] },
        {
          model: AttendanceSession, as: 'session',
          include: [{
            model: ClassSubject, as: 'classSubject',
            include: [
              { model: Class, as: 'class', attributes: ['name'] },
              { model: Subject, as: 'subject', attributes: ['name'] }
            ]
          }]
        }
      ],
      order: [['createdAt', 'DESC']]
    }); 
    res.json({ success: true, data: records }); 
  } catch(err){next(err)} 
}

export async function listTeachers(req, res, next) {
  try {
    const teachers = await User.findAll({
      where: { role: 'teacher' },
      include: ['teacherProfile'],
      attributes: { exclude: ['password'] }
    });
    res.json({ success: true, data: teachers });
  } catch (err) { next(err); }
}
