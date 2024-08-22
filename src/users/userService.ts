import * as usersRepo from "./userRepo.js"

export async function createUser(name: string, email: string) {
  //validation
  const existingUser = await usersRepo.findUserByEmail(email)
  if (existingUser) {
    throw new Error("Email exist")
  }

  //insert
  await usersRepo.insertUser(name, email)

  return true
}
