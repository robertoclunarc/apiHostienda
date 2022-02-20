import { json, Request, Response } from "express";
import db from "../database";
import { ITasaCambio, ItasaCambioMoneda } from "../interfaces/tasas_cambios";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT a.* FROM tbtasas_cambios a ";    
    try {
        const result: ITasaCambio[] = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const ultimaTasa = async (req: Request, resp: Response) => {
    let moneda=  req.params.idMoneda;
    let consulta = "SELECT a.* FROM tbtasas_cambios a WHERE a.fechaCambio = (select max(fechaCambio) from tbtasas_cambios) AND a.idMoneda=?";    
    try {
        const result: ITasaCambio[] = await db.querySelect(consulta,[moneda]);
        /*if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }*/

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const SelectRecordFilter = async (req: Request, resp: Response) => {
    let consulta = "SELECT a.*, b.* FROM tbtasas_cambios a INNER JOIN tbmonedas b ON a.idMoneda=b.idMoneda";
    let tasa = {
        idCambio: req.params.Id,        
        idMoneda: req.params.idMoneda,  
        descripcionMoneda: req.params.nombre,         
        
    }
    let fechaIni = req.params.fechaIni;
    let fechaFin = req.params.fechaFin;
    let where: string[] = [];
    
    if (tasa.idCambio!="NULL" || tasa.idMoneda!="NULL" || tasa.descripcionMoneda!="NULL"){
        if(tasa.idCambio!="NULL"){   
            where.push( " a.idCambio =" +tasa.idCambio);
        }

        if(tasa.descripcionMoneda!="NULL"){
            where.push( " LOWER(b.descripcionMoneda) LIKE LOWER('%" + tasa.descripcionMoneda + "%')");
        }        
        
        if(tasa.idMoneda!="NULL"){
            where.push( " a.idMoneda =" + tasa.idMoneda );
        }

        if(fechaIni!="NULL" && fechaFin!="NULL"){
            where.push(" (a.fechaCambio BETWEEN '" + fechaIni + "' AND '" + fechaFin + "')")
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
        const result: ItasaCambioMoneda[] = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const createRecord = async (req: Request, resp: Response) => {
    let newPost: ITasaCambio = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO tbtasas_cambios SET ?", [newPost]);    
        newPost.idCambio = result.insertId;
        return resp.status(201).json(newPost.idCambio);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: ITasaCambio = req.body;

    let consulta = ("UPDATE tbtasas_cambios SET ? WHERE idCambio = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Tasa Cambio actualizada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from tbtasas_cambios WHERE idCambio = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Tasa cambio eliminada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}