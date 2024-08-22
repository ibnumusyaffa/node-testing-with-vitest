import { describe, it, expect, vi, beforeEach } from "vitest"
import { createUser } from "./user.js"
import {  ValidationError } from "./types.js"
import * as db from "./db.js"

vi.mock("./db.js")

describe("User Service", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("createUser", () => {
    it("should create a new user with valid data", async () => {
      //arrange
      const newUserData = { name: "Jane Doe", email: "jane@example.com" }
      vi.mocked(db.createUser).mockResolvedValue(true)

      //act
      const result = await createUser(newUserData)

      //assert
      expect(result).toEqual(true)
    })

    it("should throw ValidationError for email without @", async () => {
      //arrange
      const newUserData = { name: "John Doe", email: "invalid-email" }

      //act
      const result = createUser(newUserData)

      //assert
      await expect(result).rejects.toThrow(ValidationError)
      await expect(result).rejects.toThrow(
        "Invalid email format: must contain @"
      )
    })

    it("should throw ValidationError for too short name", async () => {
      //arrange
      const newUserData = { name: "J", email: "john@example.com" }

      //act
      const result = createUser(newUserData)

      //assert
      await expect(result).rejects.toThrow(ValidationError)
      await expect(result).rejects.toThrow(
        "Name must be between 2 and 50 characters"
      )
    })
  })
})
