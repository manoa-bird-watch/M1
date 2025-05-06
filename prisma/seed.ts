import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();
/* eslint-disable no-await-in-loop */
async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);
  config.defaultAccounts.forEach(async (account) => {
    const role = account.role as Role || Role.USER;
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
      },
    });
  });

  for (const bird of config.defaultData) {
    console.log(`  Adding bird: ${bird.name}`);
    await prisma.bird.upsert({
      where: { id: bird.id },
      update: {},
      create: {
        id: bird.id,
        imagepath: bird.imagepath,
        name: bird.name,
        sciname: bird.sciname,
        description: bird.description,
      },
    });
  }

  for (const sighting of config.defaultSightings) {
    console.log(`  Adding sighting: ${sighting.name}`);
    await prisma.sighting.upsert({
      where: { id: sighting.id },
      update: {},
      create: {
        id: sighting.id,
        imagepath: sighting.imagepath,
        name: sighting.name,
        sciname: sighting.sciname,
        time: sighting.time,
        location: sighting.location,
        userid: sighting.userid,
        description: sighting.description,
        owner: sighting.owner,
      },
    });
  }
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
