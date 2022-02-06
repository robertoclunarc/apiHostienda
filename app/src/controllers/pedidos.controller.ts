import { json, Request, Response } from "express";
import db from "../database";
import { IPedidos, IDetPedidos, IPedidosDetalles } from "../interfaces/pedidos";

export const SelectREcordAllPedidos = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbpedidos";    
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

export const SelectPedidosAsociados = async (req: Request, resp: Response) => {
    let idPedido = req.params.idPedido;
    let consulta = "SELECT * FROM tbpedidos_asociados WHERE fkPedido = ?";    
    try {
        const result = await db.querySelect(consulta, [idPedido]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const SelectRecordFilter = async (req: Request, resp: Response) => {
    let consulta = "SELECT a.*, b.*, c.* FROM tbpedidos a INNER JOIN tbdetallespedidos b ON a.idPedido=b.fkPedido INNER JOIN tbsucursales c ON a.fkSucursal=c.idSucursal";
    let pedido: IPedidos = {
        idPedido:  parseInt(req.params.Id) || undefined,  
        fechaPedido: req.params.fecha || undefined,  
        idVentaAsociada: parseInt(req.params.idVenta) || undefined,  
        idCompraAsociada: parseInt(req.params.idCompra) || undefined,  
        idProveedor: parseInt(req.params.idProveedor) || undefined,  
        idComprador: parseInt(req.params.idComprador) || undefined,  
        tipoPedido: req.params.tipoPedido || undefined,  
        estatusPedido: req.params.estatus || undefined,  
        loginCrea: req.params.loginCrea || undefined,  
        fkSucursal: req.params.idSucursal || undefined,
    }
    let fechaIni = req.params.fechaIni || undefined;
    let fechaFin = req.params.fechaFin || undefined;

    let where: string[] = [];
    
    if (pedido.idPedido!=undefined || pedido.fechaPedido!=undefined || pedido.idVentaAsociada!=undefined || pedido.idCompraAsociada!=undefined || pedido.idProveedor!=undefined || pedido.idComprador!=undefined || pedido.tipoPedido!=undefined || pedido.estatusPedido!=undefined || pedido.loginCrea!=undefined ){
        if(pedido.idPedido!=undefined){   
            where.push( " a.idPedido =" + pedido.idPedido);
        }

        if(fechaIni!=undefined && fechaFin!=undefined){
            where.push( " a.fechaPedido BETWEEN '" + fechaIni + "' AND '" + fechaFin + "'");
        }

        if(pedido.idVentaAsociada!=undefined){
            where.push( " a.idVentaAsociada =" + pedido.idVentaAsociada);
        }
        
        if (pedido.idCompraAsociada!=undefined){
            where.push(" a.idCompraAsociada = " + pedido.idCompraAsociada)
        }

        if (pedido.idProveedor!=undefined){
            where.push(" a.idProveedor = " + pedido.idProveedor)
        }

        if (pedido.idComprador!=undefined){
            where.push(" a.idComprador = " + pedido.idComprador)
        }

        if (pedido.tipoPedido!=undefined){
            where.push(" a.tipoPedido = '" + pedido.tipoPedido + "'")
        }

        if (pedido.estatusPedido!=undefined){
            where.push(" a.estatusPedido = '" + pedido.estatusPedido + "'")
        }

        if (pedido.loginCrea!=undefined){
            where.push(" a.loginCrea = '" + pedido.loginCrea + "'")
        }

        if (pedido.fkSucursal!=undefined){
            where.push(" a.fkSucursal = '" + pedido.fkSucursal + "'")
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
        const result: IPedidosDetalles = await db.querySelect(consulta);
        if (result) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const createRecordPedido = async (req: Request, resp: Response) => {
    let newPost: IPedidos = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO tbpedidos SET ?", [newPost]);    
        newPost.idPedido = result.insertId;
        return resp.status(201).json(newPost.idPedido);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const createRecordDetallesPedido = async (req: Request, resp: Response) => {
    let newPost: IDetPedidos = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO tbdetalles_pedidos SET ?", [newPost]);    
        newPost.idDetPedido = result.insertId;
        return resp.status(201).json(newPost.idDetPedido);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecordPedido = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: IPedidos  = req.body;

    let consulta = ("UPDATE tbpedidos SET ? WHERE idPedido = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Pedido actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }
}

export const updateRecordDetallesPedido = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: IDetPedidos  = req.body;

    let consulta = ("UPDATE tbdetalles_pedidos SET ? WHERE idDetPedido = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Pedido actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }
}

export const deleteRecordPedido = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from tbpedidos WHERE idPedido = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Pedido eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecordDetallesPedido = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from tbdetalles_pedidos WHERE idDetPedido = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Detalle de pedido eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}