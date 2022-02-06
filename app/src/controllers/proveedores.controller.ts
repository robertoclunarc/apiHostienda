import { json, Request, Response } from "express";
import db from "../database";
import { IProveedores } from "../interfaces/proveedores";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbproveedores";    
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
    let consulta = "SELECT * FROM tbproveedores";
    let prov = {
        idProveedor: req.params.Id,        
        nombre: req.params.nombre,  
        
        
    }
    let where: string[] = [];
    
    if (prov.idProveedor!="NULL" || prov.nombre!="NULL" ){
        if(prov.idProveedor!="NULL"){   
            where.push( " idProveedor =" + prov.idProveedor);
        }

        if(prov.nombre!="NULL"){
            where.push( " NombresProveedor LIKE '%" + prov.nombre + "%')");
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
    let newPost: IProveedores = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO tbproveedores SET ?", [newPost]);    
        newPost.idProveedor = result.insertId;
        return resp.status(201).json(newPost.idProveedor);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: IProveedores = req.body;

    let consulta = ("UPDATE tbproveedores SET ? WHERE idProveedor = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Proveedor actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from tbProveedor WHERE idProveedor = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Proveedor eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}