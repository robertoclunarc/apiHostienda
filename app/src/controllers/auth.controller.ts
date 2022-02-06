import { Request, Response, NextFunction } from "express";
//import db from "../database";
import jwt from "jsonwebtoken";
import { IPayload } from '../interfaces/util.interface';


export function createJWT(login: string, cargo: string, niv: number) {
    return jwt.sign({ _login: login, _car: cargo, _niv: niv }, process.env.JWT_SECRET || "secret", {
        expiresIn: 3600 * 24
    });
}
/*
export const getJWT = async (req: Request, resp: Response) => {
    
    try {
        
        if (!req.idapp) {
            return resp.status(402).json({ msg: "No esta logueado" });
        }        
        const token: string = createJWT(req.idapp, req.cargo, req.niv);

        return token;

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}
*/
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json('Es necesario el token de autenticación');    
    let lastError = null;
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || "secret") as IPayload ;
        req.userId = payload._id;
        req.cargo = payload._car;        
        req.niv = payload._niv;
        console.log(payload);
        next();
    } catch(error) {
        
        lastError = error;
        //if (error.message !== 'invalid signature') {
            res.status(401).json(lastError);
       // }
    }
}