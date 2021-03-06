import { json, Request, Response } from "express";
import db from "../../database";
import { IinventariosMateriales, IMaterialesEnInventario } from "../../interfaces/inventarios";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT a.*, b.* FROM tbinventarios_materiales a inner join tbmateria_prima b on a.fkMateriaPrima=b.idMateriaPrima order by a.fksucursal";
    let material: IMaterialesEnInventario;
    let materiales: IMaterialesEnInventario[]=[];
    try {
        const result = await db.querySelect(consulta);
        for await (const res of result){
            material={};
            material={
                idInventario: res.idInventario,
                MateriaPrima: {
                    idMateriaPrima : res.idMateriaPrima,
                    descripcion : res.descripcion,
                    marca: res.marca,
                    retieneIva: res.retieneIva,
                },
                cantidad: res.cantidad,
                cantidadAcumulada: res.cantidadAcumulada,
                unidad: res.unidad,
                precio1:res.precio1,
                fkMonedaPrecio1: res.fkMonedaPrecio1,
                precio2: res.precio2,
                fkMonedaPrecio2: res.fkMonedaPrecio2,
                fksucursal: res.fksucursal,
                ubicacionA:res.ubicacionA,
                ubicacionB: res.ubicacionB,
                loginCrea: res.loginCrea,
                fechaCrea: res.fechaCrea,
                loginActualiza: res.loginActualiza,
                fechaActualiza: res.fechaActualiza,
                estatus: res.estatus,
            }
            materiales.push(material);
        }

        return resp.status(201).json(materiales);

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
        fechaCrea: req.params.fechaCrea,
        unidad: req.params.unidad,
    }
    
    let where: string[] = [];
    
    if (filtro.fkMateriaPrima!='NULL' || filtro.fksucursal!='NULL' || filtro.ubicacionA!='NULL' || filtro.fechaCrea!='NULL' || filtro.unidad!='NULL'){ 
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

        if (filtro.unidad!='NULL'){            
            where.push( " LOWER(unidad) = LOWER('" + filtro.unidad + "')");
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

export const sumarInventario = async (req: Request, resp: Response) => {
    let newPost: IinventariosMateriales = req.body;
    let resultado: any;
    
    let consulta = "SELECT * FROM tbinventarios_materiales WHERE fkMateriaPrima=? AND unidad=? AND fksucursal=?";    
    try {
        let result: IinventariosMateriales[] = await db.querySelect(consulta, [newPost.fkMateriaPrima, newPost.unidad, newPost.fksucursal]);
        if (result.length <= 0) {
            //console.log(newPost);
            //console.log(result);
            resultado = await db.querySelect("INSERT INTO tbinventarios_materiales SET ?", [newPost]);    
            newPost.idInventario = resultado.insertId;
            return resp.status(201).json(newPost.idInventario);
        }
        else{
            consulta = ("UPDATE tbinventarios_materiales SET loginActualiza=?, fechaActualiza=?, precio1=?, cantidad=?, cantidadAcumulada=cantidadAcumulada+? WHERE fkMateriaPrima = ? and unidad=? AND fksucursal=? and estatus='ACTIVO'");
            resultado = await db.querySelect(consulta, [newPost.loginCrea, newPost.fechaCrea, newPost.precio1, newPost.cantidad, newPost.cantidad, newPost.fkMateriaPrima, newPost.unidad, newPost.fksucursal]);
            return resp.status(201).json("Inventario actualizado correctamente");
        }
    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const restarInventario = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let cant = req.params.cant;    
    let und = req.params.unidad;
    let sucursal = req.params.sucursal;
    let consulta = ("UPDATE tbinventarios_materiales SET cantidad=?, cantidadAcumulada=cantidadAcumulada-? WHERE fkMateriaPrima = ? and unidad=? AND fksucursal=? and estatus='ACTIVO'");
    try {
        const result = await db.querySelect(consulta, [cant, cant, idx, und, sucursal]);
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