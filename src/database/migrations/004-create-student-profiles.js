import { DataTypes } from 'sequelize';
export async function up(queryInterface) {
  await queryInterface.createTable('StudentProfile', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, unique: true },
    studentNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
    classId: { type: DataTypes.UUID, allowNull: true },
    dateOfBirth: { type: DataTypes.DATEONLY },
    gender: { type: DataTypes.ENUM('male','female','other','prefer_not_to_say') },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false }
  });
  await queryInterface.addConstraint('StudentProfile', { fields: ['userId'], type: 'foreign key', name: 'fk_student_user', references: { table: 'User', field: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  await queryInterface.addConstraint('StudentProfile', { fields: ['classId'], type: 'foreign key', name: 'fk_student_class', references: { table: 'Class', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
}
export async function down(queryInterface) { await queryInterface.dropTable('StudentProfile'); }
