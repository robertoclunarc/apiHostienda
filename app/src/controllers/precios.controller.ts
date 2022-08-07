import { json, Request, Response } from "express";
import db from "../database";
import { Iprecios } from "../interfaces/precios";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbprecios";    
    try {
        const result: Iprecios[] = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const SelectRecordFilterTipo = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbprecios WHERE tipo=?"; 
    
    try {
        const result: Iprecios[] = await db.querySelect(consulta,[req.params.tipo]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const SelectUltimoPrecioIdMaterial = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbprecios WHERE fechaPrecio=(select max(fechaPrecio) from tbprecios where tipo='MATERIAL' and fkmaterial=?) and fkmaterial=?;"; 
    
    try {
        const result: Iprecios[] = await db.querySelect(consulta,[req.params.idMaterial,req.params.idMaterial]);        

        return resp.status(201).json(result[0]);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const SelectUltimoPrecioTipo = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbprecios WHERE fechaPrecio=(select max(fechaPrecio) from tbprecios where tipo=?) and tipo=?;"; 
    
    try {
        const result: Iprecios[] = await db.querySelect(consulta,[req.params.tipo,req.params.tipo]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}


export const createRecord = async (req: Request, resp: Response) => {
    let newPost: Iprecios = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO tbprecios SET ?", [newPost]);    
        newPost.idPrecio = result.insertId;
        return resp.status(201).json(newPost.idPrecio);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: Iprecios = req.body;

    let consulta = ("UPDATE tbprecios SET ? WHERE idPrecio = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Precio actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from tbprecios WHERE idPrecio = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Precio eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}