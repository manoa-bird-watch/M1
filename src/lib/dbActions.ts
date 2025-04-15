'use server';

import { Bird } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Adds a new Bird to the database.
 * @param bird, an object with the following properties: name, sciname, time, user, description
 */
export async function addBird(
  bird: {
    imagepath: string; name: string; sciname: string; time: string; user: string; description: string; owner: string },
) {
  await prisma.bird.create({
    data: {
      imagepath: bird.imagepath,
      name: bird.name,
      sciname: bird.sciname,
      time: bird.time,
      user: bird.user,
      description: bird.description,
      owner: bird.owner,
    },
  });
  redirect('/list');
}

/**
 * Edits an existing Bird in the database.
 * @param bird, an object with the following properties: name, sciname, time, user, description
 */
export async function editBird(bird: Bird) {
  await prisma.bird.update({
    where: { id: bird.id },
    data: {
      id: bird.id,
      imagepath: bird.imagepath,
      name: bird.name,
      sciname: bird.sciname,
      time: bird.time,
      user: bird.user,
      description: bird.description,
      owner: bird.owner,
    },
  });
  redirect('/list');
}

/**
 * Deletes an existing Bird from the database.
 * @param id, the id of the Bird to delete.
 */
export async function deleteBird(id: number) {
  // console.log(`deleteStuff id: ${id}`);
  await prisma.bird.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
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
