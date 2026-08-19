import { AttendanceSession, ClassSubject, User } from '../database/models/index.js';

export async function createSession(req, res, next) {
  try {
    const { classSubjectId, date, startTime, endTime, title, description } = req.body;
    const cs = await ClassSubject.findByPk(classSubjectId);
    if (!cs) return res.status(404).json({ success: false, message: 'ClassSubject not found' });
    // only teacher assigned or admin
    if (req.user.role === 'teacher' && cs.teacherId !== req.user.id) return res.status(403).json({ success: false, message: 'Not allowed' });
    const session = await AttendanceSession.create({ classSubjectId, date, startTime, endTime, title, description, createdBy: req.user.id });
    res.status(201).json({ success: true, data: session });
  } catch (err) { next(err); }
}

export async function listSessions(req, res, next) {
  try {
    if (req.user.role === 'teacher') {
      const sessions = await AttendanceSession.findAll({ where: { createdBy: req.user.id } });
      return res.json({ success: true, data: sessions });
    }
    const sessions = await AttendanceSession.findAll();
    res.json({ success: true, data: sessions });
  } catch (err) { next(err); }
}

export async function getSession(req, res, next) { try { const s = await AttendanceSession.findByPk(req.params.id); if(!s) return res.status(404).json({success:false,message:'Not found'}); res.json({success:true,data:s}); } catch(err){next(err)} }

export async function updateSession(req, res, next) { try { const s = await AttendanceSession.findByPk(req.params.id); if(!s) return res.status(404).json({success:false,message:'Not found'}); if(req.user.role==='teacher' && s.createdBy!==req.user.id) return res.status(403).json({success:false,message:'Forbidden'}); await s.update(req.body); res.json({success:true,data:s}); } catch(err){next(err)} }

export async function patchStatus(req, res, next) { try { const s = await AttendanceSession.findByPk(req.params.id); if(!s) return res.status(404).json({success:false,message:'Not found'}); if(req.user.role==='teacher' && s.createdBy!==req.user.id) return res.status(403).json({success:false,message:'Forbidden'}); s.status = req.body.status; await s.save(); res.json({success:true,data:s}); } catch(err){next(err)} }

export async function deleteSession(req, res, next) { try { const s = await AttendanceSession.findByPk(req.params.id); if(!s) return res.status(404).json({success:false,message:'Not found'}); if(req.user.role==='teacher' && s.createdBy!==req.user.id) return res.status(403).json({success:false,message:'Forbidden'}); await s.destroy(); res.json({success:true,message:'Deleted'}); } catch(err){next(err)} }
