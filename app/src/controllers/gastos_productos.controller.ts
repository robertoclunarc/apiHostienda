import { json, Request, Response } from "express";
import db from "../database";
import { IGastosProductos } from "../interfaces/gastos_productos";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbgastos_productos";    
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
    const valueIsNull = [undefined, 'undefined', 'null', 'NULL', ''];
    const regex = /^[0-9]*$/;
    let consulta = "SELECT a.* FROM tbgastos_productos a left join tbcostos_productos b on a.fkCosto=b.idCosto";
    let filtro = {
        idGasto: valueIsNull.indexOf(req.params.Id)  != -1  ? null : req.params.Id, 
        idCosto: valueIsNull.indexOf(req.params.idCosto)  != -1  ? null :  req.params.idCosto,       
        descripcion: valueIsNull.indexOf(req.params.descripcion)  != -1  ? null :  req.params.descripcion,  
         
    }
    let condicion: string = req.params.condicion;
    let gasto: IGastosProductos[]=[];
    let where: string[] = [];
    
    if (filtro.idGasto!=null || filtro.descripcion!=null  || filtro.idCosto!=null ){
        if(filtro.idGasto!=null  && regex.test(filtro.idGasto)){   
            where.push( " a.idgasto =" + filtro.idGasto);
        }

        if(filtro.idCosto!=null  && regex.test(filtro.idCosto)){   
            where.push( " a.fkCosto =" + filtro.idCosto);
        }

        if(filtro.descripcion!=null){
            where.push( " LOWER(a.descripcion_gasto) LIKE LOWER('%" + filtro.descripcion + "%')");
        }               

        where.forEach(function(where, index) {
            if (index==0){
                consulta = consulta + " WHERE " + where;
            }else{
                consulta = consulta + " " + condicion + " " + where;
            }

        });        
        consulta = consulta + " order by a.fkCosto desc, a.idgasto ";
    }
    try {
        const result = await db.querySelect(consulta);
        if (result.length > 0) {
            gasto=result;
        }
        
        return resp.status(201).json(gasto);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const createRecord = async (req: Request, resp: Response) => {
    let newPost: IGastosProductos = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO tbgastos_productos SET ?", [newPost]);    
        newPost.idgasto = result.insertId;
        return resp.status(201).json(newPost.idgasto);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: IGastosProductos = req.body;

    let consulta = ("UPDATE tbgastos_productos SET ? WHERE idgasto = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Gasto actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from tbgastos_productos WHERE idgasto = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Gasto eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}