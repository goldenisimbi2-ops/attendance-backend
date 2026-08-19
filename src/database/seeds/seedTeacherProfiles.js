export async function up(models, seeded) {
  const { users } = seeded;
  const t1 = users.t1; const t2 = users.t2;
  const tp1 = await models.TeacherProfile.create({ userId: t1.id, employeeNumber: 'T2001' });
  const tp2 = await models.TeacherProfile.create({ userId: t2.id, employeeNumber: 'T2002' });
  return { tp1, tp2 };
}
