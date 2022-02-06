import { json, Request, Response } from "express";
import db from "../database";
import { IUsuarios } from "../interfaces/usuarios";
import { createJWT } from "./auth.controller";
import { encryptPassword, validatePassword } from "../middlewares/password";

export const signUp = async (req: Request, resp: Response) => {
    let newUsuario: IUsuarios = req.body;  
    newUsuario.passw = await encryptPassword(newUsuario.passw);
    try {
        const result = await db.querySelect("INSERT INTO tbusuarios SET ?", [newUsuario]);
        
        const token: string = createJWT(newUsuario.login, newUsuario.cargo, newUsuario.nivel);

        resp.header('auth-token', token).json(newUsuario);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
};

export const signIn = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbusuarios where login = ?";    
    try {
        const result: IUsuarios[] = await db.querySelect(consulta, [req.body.login]);
        if (result.length <= 0) {
            return resp.status(400).json({ msg: "Usuario no existe!" });
        }

        if (await validatePassword(req.body.passw, result[0].passw)){
            const token: string = createJWT(result[0].login, result[0].cargo, result[0].nivel);
            resp.header('auth-token', token).json(result[0]);
        }
        else{
            return resp.status(400).json({ msg: "clave incorrecta!" });
        }

    } catch (error) {
        resp.status(401).json({ err: error });
    }
};

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM  tbusuarios ORDER BY nombres";    
    try {
        const result:IUsuarios[] = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}