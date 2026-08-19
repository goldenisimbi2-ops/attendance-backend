import sequelize from '../config/database.js';
import * as fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

async function run() {
  const qi = sequelize.getQueryInterface();
  const migrationsDir = path.resolve('src/database/migrations');
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.js')).sort();
  for (const file of files) {
    const full = path.join(migrationsDir, file);
    const mod = await import(pathToFileURL(full).href);
    if (mod.up) {
      console.log('Running', file);
      await mod.up(qi);
    }
  }
  console.log('Migrations complete');
  process.exit(0);
}

run().catch(err=>{console.error(err);process.exit(1)});
