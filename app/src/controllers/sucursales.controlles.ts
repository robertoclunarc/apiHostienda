import { json, Request, Response } from "express";
import db from "../database";
import { ISucursal } from "../interfaces/sucursales";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbsucursales";    
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
    let consulta = "SELECT * FROM tbsucursales";
    let suc = {
        idSucursal: req.params.Id,        
        nombreSucursal: req.params.nombre,  
        rifSucursal: req.params.rif, 
        fkempresa: req.params.idEmpresa,
        
    }
    let where: string[] = [];
    
    if (suc.idSucursal!="NULL" || suc.nombreSucursal!="NULL" || suc.rifSucursal!="NULL"  || suc.fkempresa!="NULL"){
        if(suc.idSucursal!="NULL"){   
            where.push( " idSucursal =" +suc.idSucursal);
        }

        if(suc.nombreSucursal!="NULL"){
            where.push( " LOWER(nombreSucursal) LIKE LOWER('%" + suc.nombreSucursal + "%')");
        }

        if(suc.rifSucursal!="NULL"){
            where.push( " LOWER(rifSucursal) LIKE LOWER('%" + suc.rifSucursal + "%')");
        }
        
        if(suc.fkempresa!="NULL"){
            where.push( " fkEmpresa =" + suc.fkempresa );
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
    let newPost: ISucursal = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO tbsucursales SET ?", [newPost]);    
        newPost.idSucursal = result.insertId;
        return resp.status(201).json(newPost.idSucursal);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: ISucursal = req.body;

    let consulta = ("UPDATE tbsucursales SET ? WHERE idSucursal = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Sucursal actualizada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from tbsucursales WHERE idSucursal = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Sucursal eliminada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}