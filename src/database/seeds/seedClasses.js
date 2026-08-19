export async function up(models) {
  const c1 = await models.Class.create({ name: 'Grade 10 A', code: 'G10A', description: 'Class 10 A' });
  const c2 = await models.Class.create({ name: 'Grade 11 B', code: 'G11B', description: 'Class 11 B' });
  return { c1, c2 };
}
