export async function up(models, seeded) {
  const { classes } = seeded;
  const { subjects } = seeded;
  const { users } = seeded;
  const c1 = classes.c1; const s1 = subjects.s1; const s2 = subjects.s2;
  const t1 = users.t1; const t2 = users.t2;
  const cs1 = await models.ClassSubject.create({ classId: c1.id, subjectId: s1.id, teacherId: t1.id });
  const cs2 = await models.ClassSubject.create({ classId: c1.id, subjectId: s2.id, teacherId: t2.id });
  return { cs1, cs2 };
}
