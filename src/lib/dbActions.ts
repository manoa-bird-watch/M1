'use server';

import { Sighting } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Adds a new Sighting to the database.
 * @param bird, an object with the following properties: name, sciname, time, user, description
 */
export async function addSighting(
  sighting: {
    imagepath: string; name: string; sciname: string; time: string; userid: number; description: string; },
) {
  await prisma.sighting.create({
    data: {
      imagepath: sighting.imagepath,
      name: sighting.name,
      sciname: sighting.sciname,
      time: sighting.time,
      userid: sighting.userid,
      description: sighting.description,
    },
  });
  redirect('/list');
}

/**
 * Edits an existing Sighting in the database.
 * @param sighting, an object with the following properties: name, sciname, time, user, description
 */
export async function editSighting(sighting: Sighting) {
  await prisma.sighting.update({
    where: { id: sighting.id },
    data: {
      id: sighting.id,
      imagepath: sighting.imagepath,
      name: sighting.name,
      sciname: sighting.sciname,
      time: sighting.time,
      userid: sighting.userid,
      description: sighting.description,
    },
  });
  redirect('/list');
}

/**
 * Deletes an existing Sighting from the database.
 * @param id, the id of the Bird to delete.
 */
export async function deleteSighting(id: number) {
  // console.log(`deleteStuff id: ${id}`);
  await prisma.sighting.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: name, email, password.
 */
export async function createUser(credentials: { name: string; email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      name: credentials.name,
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
