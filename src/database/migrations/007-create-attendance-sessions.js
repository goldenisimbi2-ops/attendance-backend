import { DataTypes } from 'sequelize';
export async function up(queryInterface) {
  await queryInterface.createTable('AttendanceSession', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    classSubjectId: { type: DataTypes.UUID, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    startTime: { type: DataTypes.TIME, allowNull: false },
    endTime: { type: DataTypes.TIME, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM('open','closed','cancelled'), defaultValue: 'open' },
    createdBy: { type: DataTypes.UUID, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false }
  });
  await queryInterface.addConstraint('AttendanceSession', { fields: ['classSubjectId'], type: 'foreign key', name: 'fk_session_classsubject', references: { table: 'ClassSubject', field: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  await queryInterface.addConstraint('AttendanceSession', { fields: ['createdBy'], type: 'foreign key', name: 'fk_session_creator', references: { table: 'User', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
}
export async function down(queryInterface) { await queryInterface.dropTable('AttendanceSession'); }
