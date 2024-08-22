import { randomUUID } from "crypto"
import { User, ValidationError } from "./types.js"
import * as db from "./db.js"

const isValidEmail = (email: string): boolean => {
  return email.includes("@")
}

export const createUser = async (userData: Omit<User, "id">): Promise<Boolean> => {
  if (!isValidEmail(userData.email)) {
    throw new ValidationError("Invalid email format: must contain @")
  }

  if (userData.name.length < 2 || userData.name.length > 50) {
    throw new ValidationError("Name must be between 2 and 50 characters")
  }

  const newUser = { id: randomUUID(), ...userData }
  return db.createUser(newUser)
}
