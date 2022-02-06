import bcrypt from 'bcrypt';
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { IPayload} from '../interfaces/util.interface'

export const encryptPassword = async function (password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

export const validatePassword = async function (password: string, passwordsaved: string): Promise<boolean> {
    
    return await bcrypt.compare(password, passwordsaved);
}