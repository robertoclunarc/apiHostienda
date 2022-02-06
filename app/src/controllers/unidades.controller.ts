import { json, Request, Response } from "express";
import db from "../database";
import { IUnidades } from "../interfaces/unidades";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbunidades";    
    try {
        const result: IUnidades[] = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const SelectRecordFilter = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbunidades";
    let und = {
        idUnidad: req.params.Id,        
        nombre: req.params.nombre,
        
    }
    let where: string[] = [];
    
    if (und.idUnidad!="NULL" || und.nombre!="NULL"){
        if(und.idUnidad!="NULL"){   
            where.push( " idUnidad =" + und.idUnidad);
        }

        if(und.nombre!="NULL"){
            where.push( " LOWER(descripcion) LIKE LOWER('%" + und.nombre + "%')");
        }        

        where.forEach(function(where, index) {
            if (index==0){
                consulta = consulta + " WHERE " + where;
            }else{
                consulta = consulta + " OR " + where;
            }

        });        
        console.log(consulta);
    }
    try {
        const result: IUnidades[] = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const createRecord = async (req: Request, resp: Response) => {
    let newPost: IUnidades = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO tbunidades SET ?", [newPost]);    
        newPost.idUnidad = result.insertId;
        return resp.status(201).json(newPost.idUnidad);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: IUnidades = req.body;

    let consulta = ("UPDATE tbunidades SET ? WHERE idUnidad = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Unidad actualizada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from tbunidades WHERE idUnidad = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Unidad eliminada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}