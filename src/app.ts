import express from "express"
import userRouter from "./users/userRouter.js"

const app = express()
app.use(express.json())
app.get("/", (req, res) => {
  return res.send("it works")
})
app.use("/users", userRouter)

export default app
