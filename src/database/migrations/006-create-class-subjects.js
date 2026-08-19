import { DataTypes } from 'sequelize';
export async function up(queryInterface) {
  await queryInterface.createTable('ClassSubject', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    classId: { type: DataTypes.UUID, allowNull: false },
    subjectId: { type: DataTypes.UUID, allowNull: false },
    teacherId: { type: DataTypes.UUID, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false }
  });
  await queryInterface.addConstraint('ClassSubject', { fields: ['classId'], type: 'foreign key', name: 'fk_classsubject_class', references: { table: 'Class', field: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  await queryInterface.addConstraint('ClassSubject', { fields: ['subjectId'], type: 'foreign key', name: 'fk_classsubject_subject', references: { table: 'Subject', field: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  await queryInterface.addConstraint('ClassSubject', { fields: ['teacherId'], type: 'foreign key', name: 'fk_classsubject_teacher', references: { table: 'User', field: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
  await queryInterface.addIndex('ClassSubject', ['classId','subjectId'], { unique: true });
}
export async function down(queryInterface) { await queryInterface.dropTable('ClassSubject'); }
