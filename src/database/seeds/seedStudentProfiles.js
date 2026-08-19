export async function up(models, seeded) {
  const { classes } = seeded;
  const { users } = seeded;
  const c1 = classes.c1;
  const s1 = users.s1;
  const s2 = users.s2;
  const sp1 = await models.StudentProfile.create({ userId: s1.id, studentNumber: 'S1001', classId: c1.id });
  const sp2 = await models.StudentProfile.create({ userId: s2.id, studentNumber: 'S1002', classId: c1.id });
  return { sp1, sp2 };
}
