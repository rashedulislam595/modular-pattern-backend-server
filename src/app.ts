import express, { type Request, type Response } from 'express';
import { userRouter } from './modules/users/user.route';
const app = express()

app.use(express.json());

app.use("/api/v1/users",userRouter)

app.get('/', (req:Request, res:Response) => {
  res.status(200).json({
    success:true,
    message:"Server connected successful!",
    author:"HR Rashed"
  })
})

export default app;

