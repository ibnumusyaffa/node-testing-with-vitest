import { describe, it, expect, beforeAll, afterAll } from "vitest"
import * as userService from "./userService.js"

import { migrate, truncateAllTables, db } from "../db/index.js"
import { faker } from "@faker-js/faker"

describe("Create User", () => {
  beforeAll(async () => {
    await migrate()
  })

  afterAll(async () => {
    await truncateAllTables()
    await db.destroy()
  })

  it("should create a new user with valid data", async () => {
    // Arrange
    const name = faker.person.fullName()
    const email = faker.internet.email()

    // Act
    const result = await userService.createUser(name, email)

    // Assert
    expect(result).toBe(true)

    const users = await db
      .selectFrom("users")
      .selectAll()
      .where("email", "=", email)
      .execute()

    expect(users.length).toBe(1)
    expect(users[0]?.name).toBe(name)
  })

  it("should throw a Error when creating a user with an existing email", async () => {
    // Arrange
    const name = faker.person.fullName()
    const email = faker.internet.email()
    await db.insertInto("users").values({ name, email }).execute()

    // Act
    const result = userService.createUser(name, email)

    // Assert
    await expect(result).rejects.toThrow()

    // Assert only one user with this email exists
    const users = await db
      .selectFrom("users")
      .selectAll()
      .where("email", "=", email)
      .execute()
    expect(users.length).toBe(1)
  })
})
