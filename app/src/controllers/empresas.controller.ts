import { json, Request, Response } from "express";
import db from "../database";
import { IEmpresa } from "../interfaces/empresa";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbempresas";    
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
    let consulta = "SELECT * FROM tbempresas";
    let emp = {
        idEmpresa: req.params.Id,        
        nombreEmpresa: req.params.nombre,  
        rifEmpresa: req.params.rif, 
    }
    let where: string[] = [];
    
    if (emp.idEmpresa!="NULL" || emp.nombreEmpresa!="NULL" || emp.rifEmpresa!="NULL" ){
        if(emp.idEmpresa!="NULL"){   
            where.push( " idempresa =" + emp.idEmpresa);
        }

        if(emp.nombreEmpresa!="NULL"){
            where.push( " LOWER(nombreEmpresa) LIKE LOWER('%" + emp.nombreEmpresa + "%')");
        }

        if(emp.rifEmpresa!="NULL"){
            where.push( " LOWER(rifEmpresa) LIKE LOWER('%" + emp.rifEmpresa + "%')");
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
    let newPost: IEmpresa = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO tbempresas SET ?", [newPost]);    
        newPost.idEmpresa = result.insertId;
        return resp.status(201).json(newPost.idEmpresa);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: IEmpresa = req.body;

    let consulta = ("UPDATE tbempresas SET ? WHERE idEmpresa = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Empresa actualizada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from tbempresas WHERE idEmpresa = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Empresa eliminada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}