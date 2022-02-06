import { json, Request, Response } from "express";
import db from "../../database";
import { ImateriPrima } from "../../interfaces/materiaprima";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbmateria_prima";    
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
    let consulta = "SELECT * FROM tbmateria_prima";
    let Mat = {
        idmateriaprima: req.params.Id,        
        descripcion: req.params.descripcion,  
        marca: req.params.marca,
        
    }
    let where: string[] = [];
    
    if (Mat.idmateriaprima!="NULL" || Mat.descripcion!="NULL" || Mat.marca!="NULL" ){
        if(Mat.idmateriaprima!="NULL"){   
            where.push( " idmateriaprima =" + Mat.idmateriaprima);
        }

        if(Mat.descripcion!="NULL"){
            where.push( " LOWER(descripcion) LIKE LOWER('%" + Mat.descripcion + "%')");
        }

        if(Mat.marca!="NULL"){
            where.push( " LOWER(marca) LIKE LOWER('%" + Mat.marca + "%')");
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
    let newPost: ImateriPrima = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO tbmateria_prima SET ?", [newPost]);    
        newPost.idMateriaPrima = result.insertId;
        return resp.status(201).json(newPost.idMateriaPrima);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: ImateriPrima = req.body;

    let consulta = ("UPDATE tbmateria_prima SET ? WHERE idmateriaprima = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("material actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from tbmateria_prima WHERE idmateriaprima = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("material eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}