import { RegistrationKey, User } from '../database/models/index.js';
import crypto from 'crypto';

export async function generateKey(req, res, next) {
  try {
    const { role } = req.body;
    if (!['admin', 'head_teacher', 'teacher'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role for key generation' });
    }
    const keyString = crypto.randomBytes(16).toString('hex');
    const key = await RegistrationKey.create({
      key: keyString,
      role,
      createdBy: req.user.id
    });
    res.status(201).json({ success: true, message: 'Key generated', data: key });
  } catch (err) { next(err); }
}

export async function listKeys(req, res, next) {
  try {
    const keys = await RegistrationKey.findAll({
      include: [
        { model: User, as: 'user', attributes: ['id', 'firstName', 'lastName'] },
        { model: User, as: 'creator', attributes: ['id', 'firstName', 'lastName'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, data: keys });
  } catch (err) { next(err); }
}
