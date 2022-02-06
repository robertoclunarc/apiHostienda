import { json, Request, Response } from "express";
import db from "../database";
import { ICompradores } from "../interfaces/compradores";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbcompradores";    
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
    let consulta = "SELECT * FROM tbcompradores";
    let comp = {
        idComprador: req.params.Id,        
        nombreComprador: req.params.nombre,  
        rifComprador: req.params.rif,
        
    }
    let where: string[] = [];
    
    if (comp.idComprador!="NULL" || comp.nombreComprador!="NULL" || comp.rifComprador!="NULL" ){
        if(comp.idComprador!="NULL"){   
            where.push( " idComprador =" + comp.idComprador);
        }

        if(comp.nombreComprador!="NULL"){
            where.push( " LOWER(nombreComprador) LIKE LOWER('%" + comp.nombreComprador + "%')");
        }

        if(comp.rifComprador!="NULL"){
            where.push( " LOWER(rifComprador) LIKE LOWER('%" + comp.rifComprador + "%')");
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
    let newPost: ICompradores = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO tbcompradores SET ?", [newPost]);    
        newPost.idComprador = result.insertId;
        return resp.status(201).json(newPost.idComprador);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: ICompradores = req.body;

    let consulta = ("UPDATE tbcompradores SET ? WHERE idComprador = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Comprador actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from tbcompradores WHERE idComprador = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Comprador eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}