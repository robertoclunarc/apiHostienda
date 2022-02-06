import { json, Request, Response } from "express";
import db from "../../database";
import { IinventariosMateriales } from "../../interfaces/inventarios";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbinventarios_materiales";    
    try {
        const result: IinventariosMateriales[] = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const SelectREcordOne = async (req: Request, resp: Response) => {
    let idInventario = req.params.idRec;
    let consulta = "SELECT * FROM tbinventarios_materiales WHERE idInventario = ?";    
    try {
        const result: IinventariosMateriales[] = await db.querySelect(consulta, [idInventario]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result[0]);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const SelectRecordFilter = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbinventarios_materiales";
    let filtro = {
        fkMateriaPrima: req.params.fkMateriaPrima,
        fksucursal: req.params.fksucursal,
        ubicacionA: req.params.ubicacionA,
        fechaCrea: req.params.fechaCrea
    }
    
    let where: string[] = [];
    
    if (filtro.fkMateriaPrima!='NULL' || filtro.fksucursal!='NULL' || filtro.ubicacionA!='NULL' || filtro.fechaCrea!='NULL'){ 
        if (filtro.fkMateriaPrima!='NULL'){  
            where.push( " fkMateriaPrima =" + filtro.fkMateriaPrima);
        }

        if(filtro.fechaCrea!='NULL'){
            where.push( " fechaCrea =  '" + filtro.fechaCrea + "'");
        }

        if(filtro.fksucursal!='NULL'){
            where.push( " fksucursal =" + filtro.fksucursal);
        }
        
        if (filtro.ubicacionA!='NULL'){            
            where.push( " LOWER(ubicacionA) LIKE LOWER('%" + filtro.ubicacionA + "%')");
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
        const result: IinventariosMateriales[] = await db.querySelect(consulta);
        if (result) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const createRecord = async (req: Request, resp: Response) => {
    let newPost: IinventariosMateriales = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO tbinventarios_materiales SET ?", [newPost]);    
        newPost.idInventario = result.insertId;
        return resp.status(201).json(newPost.idInventario);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: IinventariosMateriales  = req.body;

    let consulta = ("UPDATE tbinventarios_materiales SET ? WHERE idInventario = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Inventario actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }
}


export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from tbinventarios_materiales WHERE idInventario = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Inventario eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}