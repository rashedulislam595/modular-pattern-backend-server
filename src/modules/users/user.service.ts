import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IUpdateUser, IUsers } from "./user.interface";
import { isatty } from "node:tty";

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

const getAllUserIntoDB = async()=>{
    const result = await pool.query(`
        SELECT id,name,email,age,is_active,created_at,updated_at FROM users
        `)
    return result
}

const getSingleUserIntoDB = async(id:string)=>{
    const result = await pool.query(`
    SELECT * FROM users WHERE id=$1
        `,[id])
    delete result.rows[0].password;
    return result;
}

const updateUserIntoDB = async(payload:IUpdateUser,id:string)=>{
    const {name,age,is_Active} = payload;
    
    const result = await pool.query(`
        UPDATE users
        SET 
        name = COALESCE($1,name),
        age = COALESCE($2,age),
        is_active = COALESCE($3,is_active),
        updated_at = NOW()

        WHERE id=$4 RETURNING *
        `,[name??null, age??null, is_Active??null, id])

        delete result.rows[0].password
        return result;
}

export const userServices ={
    createUserIntoDB,
    getAllUserIntoDB,
    getSingleUserIntoDB,
    updateUserIntoDB,
}