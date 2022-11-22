import crypto from "crypto";
import bcrypt from "bcrypt";
import { v1 as uuidv1 } from "uuid";

const saltRound = 10;

export function createRandomKey(bites: number) {
  return crypto.randomBytes(bites || 8).toString("hex");
}

export async function generateHash(password: string): Promise<string> {
  return await bcrypt.hash(password, saltRound);
}

export async function compareHash(
  pass: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(pass, hash);
}

export const uuid = (): string => uuidv1();
