import express, { type Request, type Response } from 'express';
const app = express()

app.use(express.json());

app.get('/', (req:Request, res:Response) => {
  res.status(200).json({
    success:true,
    message:"Server connected successful!",
    author:"HR Rashed"
  })
})

export default app;

