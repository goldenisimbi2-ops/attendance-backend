export async function up(models) {
  const s1 = await models.Subject.create({ name: 'Mathematics', code: 'MATH101' });
  const s2 = await models.Subject.create({ name: 'English', code: 'ENG101' });
  return { s1, s2 };
}
