import { db } from "../db/index.js"

export async function insertUser(name: string, email: string) {
  return db
    .insertInto("users")
    .values({ name, email })
    .executeTakeFirstOrThrow()
}

export async function findUserByEmail(email: string) {
  return db
    .selectFrom("users")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst()
}
