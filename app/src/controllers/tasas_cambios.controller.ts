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
    const valueIsNull = [undefined, 'undefined', 'null', 'NULL', ''];
    const regex = /^[0-9]*$/;
    let consulta = "SELECT a.*, b.* FROM tbtasas_cambios a INNER JOIN tbmonedas b ON a.idMoneda=b.idMoneda";
    let filtro = {
        idCambio: valueIsNull.indexOf(req.params.Id)  != -1  ? null : req.params.Id,        
        idMoneda: valueIsNull.indexOf(req.params.idMoneda)  != -1  ? null : req.params.idMoneda,  
        descripcionMoneda: valueIsNull.indexOf(req.params.nombre)  != -1  ? null : req.params.nombre,         
        
    }
    let fechaIni = valueIsNull.indexOf(req.params.fechaIni)  != -1  ? null : req.params.fechaIni;
    let fechaFin = valueIsNull.indexOf(req.params.fechaFin)  != -1  ? null : req.params.fechaFin;
    let where: string[] = [];
    
    if (filtro.idCambio!=null || filtro.idMoneda!=null || filtro.descripcionMoneda!=null){
        if(filtro.idCambio!=null   && regex.test(filtro.idCambio)){   
            where.push( " a.idCambio =" + filtro.idCambio);
        }

        if(filtro.descripcionMoneda!=null){
            where.push( " LOWER(b.descripcionMoneda) LIKE LOWER('%" + filtro.descripcionMoneda + "%')");
        }        
        
        if(filtro.idMoneda!=null   && regex.test(filtro.idMoneda)){
            where.push( " a.idMoneda =" + filtro.idMoneda );
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
        consulta = consulta + " ORDER BY a.fechaCambio desc"
    }
    try {
        const result = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        let tasasCambios: ItasaCambioMoneda[]=[];
        let tasaCambio: ItasaCambioMoneda;
        for await (let rs of result){
            tasaCambio={};
            tasaCambio.tasa={
                idCambio: rs.idCambio,
                fechaCambio: rs.fechaCambio,
                tasaDia:rs.tasaDia,
                idMoneda: rs.idMoneda
            };
            tasaCambio.moneda={
                idMoneda: rs.idMoneda,
                descripcionMoneda: rs.descripcionMoneda,
                abrevMoneda: rs.abrevMoneda,
                tipoMoneda: rs.tipoMoneda
            };
            tasasCambios.push(tasaCambio);
        }

        return resp.status(201).json(tasasCambios);

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