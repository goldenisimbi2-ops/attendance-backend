import { User } from '../database/models/index.js';

export async function listUsers(req, res, next) {
  try {
    const users = await User.findAll();
    res.json({ success: true, data: users });
  } catch (err) { next(err); }
}

export async function getUser(req, res, next) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: user });
  } catch (err) { next(err); }
}

export async function createUser(req, res, next) {
  try {
    const { firstName, lastName, email, password, role, phone } = req.body;
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ success: false, message: 'Email exists' });
    const user = await User.create({ firstName, lastName, email, password, role, phone });
    res.status(201).json({ success: true, data: user });
  } catch (err) { next(err); }
}

export async function updateUser(req, res, next) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'Not found' });
    await user.update(req.body);
    res.json({ success: true, data: user });
  } catch (err) { next(err); }
}

export async function deleteUser(req, res, next) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'Not found' });
    await user.destroy();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
}

export async function patchStatus(req, res, next) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'Not found' });
    user.isActive = req.body.isActive;
    await user.save();
    res.json({ success: true, data: user });
  } catch (err) { next(err); }
}
