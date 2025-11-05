import { prisma } from './db';
import bcrypt from 'bcryptjs';

export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

export async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

export async function getUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email }
  });
}

export async function createUser(email, password, name, role = 'EMPLOYEE') {
  const hashedPassword = await hashPassword(password);
  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role
    }
  });
}
