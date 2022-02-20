import { json, Request, Response } from "express";
import db from "../database";
import { IparametrosGrales } from "../interfaces/util.interface";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT a.* FROM tblparametros_grales a ";    
    try {
        const result: IparametrosGrales[] = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const ConsultarIva = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tblparametros_grales WHERE fechaAct = (select max(fechaAct) from tblparametros_grales)";
       
    try {
        const result: IparametrosGrales[] = await db.querySelect(consulta);
        /*if (result.length <= 0) {
            
            return resp.status(201).json(result[0]);
        }*/
        
        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const createRecord = async (req: Request, resp: Response) => {
    let newPost: IparametrosGrales = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO IparametrosGrales SET ?", [newPost]);    
        newPost.idParametro = result.insertId;
        return resp.status(201).json(newPost.idParametro);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: IparametrosGrales = req.body;

    let consulta = ("UPDATE IparametrosGrales SET ? WHERE idParametro = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Parmetro actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from IparametrosGrales WHERE idParametro = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Parametro eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}