import { sequelize } from '../src/database/models/index.js';

async function migrate() {
  try {
    await sequelize.query('PRAGMA foreign_keys=off;');
    await sequelize.transaction(async (t) => {
      await sequelize.query("CREATE TABLE `StudentProfile_new` (`id` UUID UNIQUE PRIMARY KEY, `userId` UUID NOT NULL UNIQUE REFERENCES `User` (`id`), `studentNumber` VARCHAR(255) NOT NULL UNIQUE, `classId` UUID REFERENCES `Class` (`id`) ON DELETE SET NULL, `dateOfBirth` DATE, `gender` TEXT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL)", { transaction: t });
      await sequelize.query("INSERT INTO `StudentProfile_new` SELECT * FROM `StudentProfile`", { transaction: t });
      await sequelize.query("DROP TABLE `StudentProfile`", { transaction: t });
      await sequelize.query("ALTER TABLE `StudentProfile_new` RENAME TO `StudentProfile`", { transaction: t });
    });
    await sequelize.query('PRAGMA foreign_keys=on;');
    console.log('Migration successful');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    process.exit(0);
  }
}
migrate();
