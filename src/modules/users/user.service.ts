import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IUsers } from "./user.interface";

const createUserIntoDB=async(payload:IUsers)=>{
    const {name,email,password,age} = payload;

    // todo:password hashing
    const hashPassword = await bcrypt.hash(password,10)

    const result = await pool.query(`
        INSERT INTO users(name,email,password,age)
        VALUES($1,$2,$3,$4) RETURNING *
        `,[name,email,hashPassword,age])
    delete result.rows[0].password
    return result
}

export const userServices ={
    createUserIntoDB,
}