import { Subject } from '../database/models/index.js';

export async function createSubject(req, res, next) {
  try { const s = await Subject.create(req.body); res.status(201).json({ success: true, data: s }); } catch (err) { next(err); }
}
export async function listSubjects(req, res, next) { try { const rows = await Subject.findAll(); res.json({ success: true, data: rows }); } catch (err) { next(err); } }
export async function getSubject(req, res, next) { try { const row = await Subject.findByPk(req.params.id); if(!row) return res.status(404).json({success:false,message:'Not found'}); res.json({success:true,data:row}); } catch(err){next(err)} }
export async function updateSubject(req, res, next) { try { const row = await Subject.findByPk(req.params.id); if(!row) return res.status(404).json({success:false,message:'Not found'}); await row.update(req.body); res.json({success:true,data:row}); } catch(err){next(err)} }
export async function deleteSubject(req, res, next) { try { const row = await Subject.findByPk(req.params.id); if(!row) return res.status(404).json({success:false,message:'Not found'}); await row.destroy(); res.json({success:true,message:'Deleted'}); } catch(err){next(err)} }
