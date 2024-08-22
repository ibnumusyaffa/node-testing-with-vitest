import { describe, it, expect, beforeAll, afterAll } from "vitest";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { migrate, truncateAllTables, db } from "../db/index.js";
import app from "../app.js"; // Assuming you have an Express app exported

const request = supertest(app);

describe("User API", () => {
  beforeAll(async () => {
    await migrate();
  });

  afterAll(async () => {
    await truncateAllTables();
    await db.destroy();
  });

  it("should create a new user with valid data", async () => {
    // Arrange
    const name = faker.person.fullName();
    const email = faker.internet.email();

    // Act
    const response = await request
      .post("/users")
      .send({ name, email })

    // Assert
    expect(response.body.message).toBe("User created successfully");
    expect(response.status).toBe(201)

    const users = await db
      .selectFrom("users")
      .selectAll()
      .where("email", "=", email)
      .execute();

    expect(users.length).toBe(1);
    expect(users[0]?.name).toBe(name);
  });

  it("should return 400 when creating a user with an existing email", async () => {
    // Arrange
    const name = faker.person.fullName();
    const email = faker.internet.email();
    await db.insertInto("users").values({ name, email }).execute();

    // Act
    const response = await request
      .post("/users")
      .send({ name, email })

    // Assert
    expect(response.body.error).toBe("Email already exists");
    expect(response.statusCode).toBe(422)

    // Assert only one user with this email exists
    const users = await db
      .selectFrom("users")
      .selectAll()
      .where("email", "=", email)
      .execute();
    expect(users.length).toBe(1);
  });
});