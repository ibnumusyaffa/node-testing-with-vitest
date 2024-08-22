import { describe, it, expect, vi, beforeEach } from "vitest"
import { createUser } from "./user.js"
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

      const createUserSpy = vi.spyOn(db, "createUser").mockResolvedValue(true)

      //act
      const result = await createUser(newUserData)

      //assert
      expect(result).toEqual(true)

      expect(createUserSpy).toHaveBeenCalledTimes(1)
      expect(createUserSpy).toHaveBeenCalledWith(newUserData)
    })
  })
})
