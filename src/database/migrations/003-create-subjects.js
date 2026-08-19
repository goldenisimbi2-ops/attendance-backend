import { DataTypes } from 'sequelize';
export async function up(queryInterface) {
  await queryInterface.createTable('Subject', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false }
  });
}
export async function down(queryInterface) { await queryInterface.dropTable('Subject'); }
