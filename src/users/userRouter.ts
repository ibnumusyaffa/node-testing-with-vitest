import express, { Router, Request, Response } from "express"
import * as usersRepo from "./userRepo.js"

const router: Router = express.Router()

interface CreateUserRequest {
  name: string
  email: string
}

router.post(
  "/",
  async (req: Request<{}, {}, CreateUserRequest>, res: Response) => {
    try {
      const { name, email } = req.body

      // Validation
      const existingUser = await usersRepo.findUserByEmail(email)
      if (existingUser) {
        return res.status(422).json({ error: "Email already exists" })
      }

      // Insert
      await usersRepo.insertUser(name, email)

      res.status(201).json({ message: "User created successfully" })
    } catch (error) {
      console.error("Error creating user:", error)
      res.status(500).json({ error: "Internal server error" })
    }
  }
)

export default router
