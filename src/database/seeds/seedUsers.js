export async function up(models) {
  const password = 'Password123!';
  const admin = await models.User.create({ firstName: 'Admin', lastName: 'User', email: 'admin@example.com', password, role: 'admin' });
  const ht = await models.User.create({ firstName: 'Head', lastName: 'Teacher', email: 'headteacher@example.com', password, role: 'head_teacher' });
  const t1 = await models.User.create({ firstName: 'Alice', lastName: 'Teacher', email: 'alice.teacher@example.com', password, role: 'teacher' });
  const t2 = await models.User.create({ firstName: 'Bob', lastName: 'Teacher', email: 'bob.teacher@example.com', password, role: 'teacher' });
  const s1 = await models.User.create({ firstName: 'Charlie', lastName: 'Student', email: 'charlie.student@example.com', password, role: 'student' });
  const s2 = await models.User.create({ firstName: 'Dana', lastName: 'Student', email: 'dana.student@example.com', password, role: 'student' });
  return { admin, ht, t1, t2, s1, s2 };
}
