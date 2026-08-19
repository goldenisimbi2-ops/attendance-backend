import { Class } from '../database/models/index.js';

export async function createClass(req, res, next) {
  try {
    const cls = await Class.create(req.body);
    res.status(201).json({ success: true, data: cls });
  } catch (err) { next(err); }
}

export async function listClasses(req, res, next) {
  try { const rows = await Class.findAll(); res.json({ success: true, data: rows }); } catch (err) { next(err); }
}

export async function getClass(req, res, next) {
  try { const row = await Class.findByPk(req.params.id); if(!row) return res.status(404).json({success:false,message:'Not found'}); res.json({success:true,data:row}); } catch(err){next(err)}
}

export async function updateClass(req, res, next) {
  try { const row = await Class.findByPk(req.params.id); if(!row) return res.status(404).json({success:false,message:'Not found'}); await row.update(req.body); res.json({success:true,data:row}); } catch(err){next(err)}
}

export async function deleteClass(req, res, next) {
  try { const row = await Class.findByPk(req.params.id); if(!row) return res.status(404).json({success:false,message:'Not found'}); await row.destroy(); res.json({success:true,message:'Deleted'}); } catch(err){next(err)}
}
