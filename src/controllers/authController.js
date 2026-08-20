import { User, RegistrationKey, StudentProfile } from '../database/models/index.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtSecret, jwtExpiresIn } from '../config/auth.js';

export async function register(req, res, next) {
  try {
    const { firstName, lastName, email, password, role, secretKey, classId } = req.body;
    if (!firstName || !lastName || !email || !password) return res.status(422).json({ success: false, message: 'Missing fields' });
    
    if (role && role !== 'student') {
      if (!secretKey) return res.status(422).json({ success: false, message: 'Secret key is required for staff roles' });
      const rKey = await RegistrationKey.findOne({ where: { key: secretKey, role, isUsed: false } });
      if (!rKey) return res.status(403).json({ success: false, message: 'Invalid or already used secret key' });
    } else if (role === 'student' || !role) {
      if (!classId) return res.status(422).json({ success: false, message: 'Class selection is required for students' });
    }
    
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ success: false, message: 'Email already in use' });
    
    const user = await User.create({ firstName, lastName, email, password, role: role || 'student' });
    
    if (user.role !== 'student') {
      const rKey = await RegistrationKey.findOne({ where: { key: secretKey } });
      if (rKey) {
        await rKey.update({ isUsed: true, usedBy: user.id });
      }
    } else {
      const studentNumber = `STU-${new Date().getFullYear()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
      await StudentProfile.create({
        userId: user.id,
        classId,
        studentNumber
      });
    }
    
    res.status(201).json({ success: true, message: 'User created', data: user });
  } catch (err) { next(err); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(422).json({ success: false, message: 'Missing credentials' });
    const user = await User.scope('withPassword').findOne({ where: { email } });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    if (!user.isActive) return res.status(403).json({ success: false, message: 'User is inactive' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });
    const safe = await User.findByPk(user.id);
    res.json({ success: true, message: 'Logged in', data: { token, user: safe } });
  } catch (err) { next(err); }
}

export async function me(req, res, next) {
  try {
    const user = await User.findByPk(req.user.id);
    res.json({ success: true, data: user });
  } catch (err) { next(err); }
}
