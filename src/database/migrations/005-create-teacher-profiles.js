import { DataTypes } from 'sequelize';
export async function up(queryInterface) {
  await queryInterface.createTable('TeacherProfile', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, unique: true },
    employeeNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false }
  });
  await queryInterface.addConstraint('TeacherProfile', { fields: ['userId'], type: 'foreign key', name: 'fk_teacher_user', references: { table: 'User', field: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' });
}
export async function down(queryInterface) { await queryInterface.dropTable('TeacherProfile'); }
