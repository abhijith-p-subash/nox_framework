import bcrypt from "bcrypt";
import { v1 as uuidv1 } from 'uuid';

const saltRound = 10;

export async function generateHash(password: string): Promise<string> {
  return await bcrypt.hash(password, saltRound);
}

export const uuid = ():string => uuidv1();