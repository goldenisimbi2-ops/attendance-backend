import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config();
let sequelize;
const useSqlite = process.env.DB_DIALECT === 'sqlite' || !process.env.DB_USER;
if (useSqlite) {
  sequelize = new Sequelize({ dialect: 'sqlite', storage: process.env.SQLITE_STORAGE || 'database.sqlite', logging: process.env.NODE_ENV === 'development' ? console.log : false, define: { underscored: false, freezeTableName: true } });
} else {
  sequelize = new Sequelize(process.env.DB_NAME || 'attendance', process.env.DB_USER || 'root', process.env.DB_PASSWORD || '', {
    host: process.env.DB_HOST || '127.0.0.1', port: Number(process.env.DB_PORT || 3306), dialect: process.env.DB_DIALECT || 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: { underscored: false, freezeTableName: true }
  });
}
export default sequelize;
