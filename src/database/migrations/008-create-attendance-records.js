import { DataTypes } from 'sequelize';
export async function up(queryInterface) {
  await queryInterface.createTable('AttendanceRecord', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    attendanceSessionId: { type: DataTypes.UUID, allowNull: false },
    studentId: { type: DataTypes.UUID, allowNull: false },
    status: { type: DataTypes.ENUM('present','absent','late','excused'), allowNull: false },
    checkInTime: { type: DataTypes.DATE },
    remarks: { type: DataTypes.TEXT },
    markedBy: { type: DataTypes.UUID, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false }
  });
  await queryInterface.addConstraint('AttendanceRecord', { fields: ['attendanceSessionId'], type: 'foreign key', name: 'fk_record_session', references: { table: 'AttendanceSession', field: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  await queryInterface.addConstraint('AttendanceRecord', { fields: ['studentId'], type: 'foreign key', name: 'fk_record_student', references: { table: 'User', field: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  await queryInterface.addConstraint('AttendanceRecord', { fields: ['markedBy'], type: 'foreign key', name: 'fk_record_marker', references: { table: 'User', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
  await queryInterface.addIndex('AttendanceRecord', ['attendanceSessionId','studentId'], { unique: true });
}
export async function down(queryInterface) { await queryInterface.dropTable('AttendanceRecord'); }
