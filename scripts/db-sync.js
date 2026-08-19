import sequelize from '../src/config/database.js';
import '../src/database/models/index.js';

async function run() {
  await sequelize.sync({ alter: true });
  console.log('Database synced');
  process.exit(0);
}

run().catch((err) => { console.error(err); process.exit(1); });
