import type { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async(req:Request,res:Response)=>{
    try {
        const result = await userServices.createUserIntoDB(req.body)

        res.status(201).json({
            success:true,
            message:"Product created successful!!",
            data:result.rows[0]
        })
        
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message,
            error:error
        })
    }
}

const getAllUser = async(req:Request, res:Response)=>{
    try {
        const result = await userServices.getAllUserIntoDB();

        res.status(200).json({
            success:true,
            message:"User retrieve successful!!",
            data:result.rows
        })
        
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message,
            error:error
        })
    }
}

const getSingleUser = async(req:Request,res:Response)=>{
    try {
        const {id} = req.params;
        const result = await userServices.getSingleUserIntoDB(id as string)

        res.status(200).json({
            success:true,
            message:"User retrieve successful!!",
            data:result.rows[0]
        })
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message,
            error:error
        })
    }
}

export const userController = {
    createUser,
    getAllUser,
    getSingleUser
}