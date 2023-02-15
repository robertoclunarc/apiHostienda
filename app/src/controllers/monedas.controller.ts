import { json, Request, Response } from "express";
import db from "../database";
import { IMoneda } from "../interfaces/monedas";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbmonedas";    
    try {
        const result = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const SelectRecordFilter = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbmonedas";
    let mon = {
        idmoneda: req.params.Id,        
        descripcionMoneda: req.params.nombre,  
         
    }
    let where: string[] = [];
    
    if (mon.idmoneda!="NULL" || mon.descripcionMoneda!="NULL" ){
        if(mon.idmoneda!="NULL"){   
            where.push( " idMoneda =" + mon.idmoneda);
        }

        if(mon.descripcionMoneda!="NULL"){
            where.push( " LOWER(descripcionMoneda) LIKE LOWER('%" + mon.descripcionMoneda + "%')");
        }               

        where.forEach(function(where, index) {
            if (index==0){
                consulta = consulta + " WHERE " + where;
            }else{
                consulta = consulta + " OR " + where;
            }

        });        
        
    }
    try {
        const result = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const createRecord = async (req: Request, resp: Response) => {
    let newPost: IMoneda = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO tbmonedas SET ?", [newPost]);    
        newPost.idMoneda = result.insertId;
        return resp.status(201).json(newPost.idMoneda);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: IMoneda = req.body;

    let consulta = ("UPDATE tbmonedas SET ? WHERE idMoneda = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Moneda actualizada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from tbmonedas WHERE idMoneda = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Moneda eliminada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}