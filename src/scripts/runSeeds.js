import sequelize from '../config/database.js';
import { User, Class, Subject, StudentProfile, TeacherProfile, ClassSubject } from '../database/models/index.js';
import * as fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const models = { User, Class, Subject, StudentProfile, TeacherProfile, ClassSubject };

async function run() {
  const seedsDir = path.resolve('src/database/seeds');
  const files = fs.readdirSync(seedsDir).filter(f => f.endsWith('.js')).sort();
  const seeded = {};
  for (const file of files) {
    console.log('Seeding', file);
    const full = path.join(seedsDir, file);
    const mod = await import(pathToFileURL(full).href);
    if (mod.up) {
      const res = await mod.up(models, seeded);
      seeded[file.replace('.js','').replace('seed','')] = res || res;
    }
  }
  console.log('Seeding complete');
  process.exit(0);
}

run().catch(err=>{console.error(err);process.exit(1)});
