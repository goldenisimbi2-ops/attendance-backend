import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/auth.js';
import { User } from '../database/models/index.js';

export default async function authMiddleware(req, res, next) {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'No token provided' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, jwtSecret);
    const user = await User.scope('withPassword').findByPk(payload.id);
    if (!user) return res.status(401).json({ success: false, message: 'Invalid token user' });
    req.user = { id: user.id, email: user.email, role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}
