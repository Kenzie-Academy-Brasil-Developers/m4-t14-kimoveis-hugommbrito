import express, { Application, json } from "express";
import 'express-async-errors'
import { handleErrors } from "./errors";
import { authRouter } from "./routers/auth.routes";
import { userRouter } from "./routers/user.routes";


const app: Application = express()
app.use(express.json())

app.use('/users', userRouter)
app.use('/login', authRouter)

app.use(handleErrors)

export default app