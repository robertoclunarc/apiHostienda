import { json, Request, Response } from "express";
import db from "../database";
import { IUsuarios, IUsuarioSucursal } from "../interfaces/usuarios";
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

export const SelectUsuarioSucursales = async (req: Request, resp: Response) => {
    let consulta = "SELECT u.*, s.* FROM tbusuarios u INNER JOIN tbsucursales s ON u.fksucursal=s.idSucursal";    
    try {
        const results = await db.querySelect(consulta);
        if (results.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        let usuarios: IUsuarioSucursal[]=[];
        let user: IUsuarioSucursal;
        for await (let result of results){
            user={},
            user.usuario={
                login :  result.login,
                nombres : result.nombres,
                cargo: result.cargo,
                nivel: result.nivel,
                email: result.email,  
                estatus: result.estatus,
                imagen: result.imagen
            }
            user.sucursal={
                idSucursal: result.idSucursal,
                nombreSucursal: result.nombreSucursal,
                rifSucursal: result.rifSucursal,
                direccionSucursal: result.direccionSucursal,
                tlfSucursal: result.tlfSucursal,
                encargado: result.encargado,
                emailSucursal: result.emailSucursal,
                fkempresa: result.fkempresa,
                logoSucursal: result.logoSucursal
            }
            usuarios.push(user);
            
        }

        return resp.status(201).json(usuarios);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}