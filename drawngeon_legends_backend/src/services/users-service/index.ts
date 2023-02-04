import userRepository from "@/repositories/user-repository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { conflictError } from "@/errors";

export async function createUser({ email, password }: CreateUserParams): Promise<User> {
  await validateUniqueEmail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    password: hashedPassword,
  });
}

async function validateUniqueEmail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if ( userWithSameEmail?.id ) {
    throw conflictError("emailDuplicate");
  }
}

export type CreateUserParams = Pick<User, "email" | "password">;

const userService = {
  createUser,
};

export default userService;
