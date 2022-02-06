import { json, Request, Response } from "express";
import db from "../database";
import { IVentas, IdetVenta, IDetallesVentas } from "../interfaces/ventas";

export const SelectREcordAllVentas = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbventas";    
    try {
        const result: IVentas[] = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const SelectREcordAllDetVentas = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbdetalles_ventas";    
    try {
        const result: IdetVenta[] = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const SelectRecordFilter = async (req: Request, resp: Response) => {
    let consulta = "SELECT v.*, dt.*, p.*, s.*, m.* FROM tbventas v INNER JOIN tbdetalles_ventas dt ON v.idVenta=dt.fkVenta INNER JOIN tbsucursales s on v.fkSucursal=s.idSucursal INNER JOIN tbmonedas m on v.fkMoneda=m.idMoneda INNER JOIN tbproductos p ON dt.fkProducto=p.idProducto ";
    let venta = {
        idVenta: req.params.Id,        
        idProducto: req.params.idProducto,  
        fechaventa: req.params.fecha,
        descripcionProducto: req.params.descripcion,
        idSucursal: req.params.idSucursal,
        comprador: req.params.comprador
    }
    let fechaIni= req.params.fechaIni;
    let fechaFin= req.params.fechaFin;
    let where: string[] = [];
    
    if (venta.idVenta!="NULL" || venta.idProducto!="NULL" || venta.descripcionProducto!="NULL" || venta.idSucursal!="NULL" || venta.comprador!="NULL" || fechaIni!="NULL" ){
        if(venta.idVenta!="NULL"){   
            where.push( " v.idVenta =" + venta.idVenta);
        }

        if(venta.idProducto!="NULL"){   
            where.push( " v.fkProducto =" + venta.idProducto);
        }

        if(venta.idSucursal!="NULL"){   
            where.push( " v.fkSucursal =" + venta.idSucursal);
        }        

        if(fechaIni!="NULL" && fechaFin!="NULL"){
            where.push( " (v.fechaVenta BETWEEN '" + fechaIni + "' AND '" + fechaFin + "')");
        } 
        
        if(venta.descripcionProducto!="NULL"){
            where.push( " LOWER(p.descripcionProducto) LIKE LOWER('%" + venta.descripcionProducto + "%')");
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
        const result: IDetallesVentas [] = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const createRecordVenta = async (req: Request, resp: Response) => {
    let newPost: IVentas = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO tbventas SET ?", [newPost]);    
        newPost.idVenta = result.insertId;
        return resp.status(201).json(newPost.idVenta);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const createRecordDetalle = async (req: Request, resp: Response) => {
    let newPost: IdetVenta = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO tbdetalles_ventas SET ?", [newPost]);    
        newPost.idDetVenta = result.insertId;
        return resp.status(201).json(newPost.idDetVenta);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecordVenta = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: IVentas = req.body;

    let consulta = ("UPDATE tbventas SET ? WHERE idVenta = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Venta actualizada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const updateRecordDetalle = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: IdetVenta = req.body;

    let consulta = ("UPDATE tbdetalles_ventas SET ? WHERE idDetVenta = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Detalle actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecordVenta = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from tbventas WHERE idVenta = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Venta eliminada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecordDetalle = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from tbdetalles_ventas WHERE idDetVenta = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Detalle eliminada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}