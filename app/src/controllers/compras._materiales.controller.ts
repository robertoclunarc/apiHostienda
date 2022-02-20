import { json, Request, Response } from "express";
import db from "../database";
import { IMaterialesComprados, IdetallesCompras, IdetallesComprasConMateriales, IQueryComprasDetalles } from "../interfaces/materiales_compras";

export const SelectREcordAllCompras = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbmateriales_comprados ORDER BY fechaCompra";    
    try {
        const result: IMaterialesComprados[] = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const SelectREcordAllDetalles = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbdetalles_compras";    
    try {
        const result: IdetallesCompras[] = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const SelectRecordFilter = async (req: Request, resp: Response) => {
    let consulta = "SELECT a.*, b.*, c.*, d.*, e.NombresProveedor, e.direccionProveedor, e.estatus as estatusProveedor, s.* FROM tbmateriales_comprados a INNER JOIN tbdetalles_compras b ON a.idCompra=b.fkcompra INNER JOIN tbmonedas c ON a.fkMoneda=c.idMoneda INNER JOIN tbmateria_prima d ON b.fkMateriaPrima=d.idMateriaPrima INNER JOIN tbproveedores e ON a.idProveedor = e.idProveedor INNER JOIN tbsucursales s ON a.fkSucursal = s.idSucursal";

    let filtro = {
        idCompra: req.params.Id,        
        idMaterial: req.params.idmaterial,
        descripcionMaterial: req.params.descripcion,
        idSucursal: req.params.idSucursal,
        idProveedor: req.params.idProveedor
    }
    let fechaIni= req.params.fechaIni;
    let fechaFin= req.params.fechaFin;
    let where: string[] = [];
    
    if (filtro.idCompra!="NULL" || filtro.idMaterial!="NULL" || filtro.descripcionMaterial!="NULL" || filtro.idSucursal!="NULL" ){
        if(filtro.idCompra!="NULL" || fechaIni!="NULL"){   
            where.push( " a.idCompra =" + filtro.idCompra);
        }

        if(filtro.idMaterial!="NULL"){   
            where.push( " b.fkMateriaPrima =" + filtro.idMaterial);
        }

        if(filtro.idSucursal!="NULL"){   
            where.push( " a.fkSucursal =" + filtro.idSucursal);
        }

        if(filtro.idProveedor!="NULL"){   
            where.push( " a.fkProveedor =" + filtro.idProveedor);
        }

        if(fechaIni!="NULL" && fechaFin!="NULL"){
            where.push( " (a.fechaCompra BETWEEN '" + fechaIni + "' AND '" + fechaFin + "')");
        } 
        
        if(filtro.descripcionMaterial!="NULL"){
            where.push( " LOWER(d.descripcion) LIKE LOWER('%" + filtro.descripcionMaterial + "%')");
        } 

        where.forEach(function(where, index) {
            if (index==0){
                consulta = consulta + " WHERE " + where;
            }else{
                consulta = consulta + " OR " + where;
            }

        });
        
        consulta+=' ORDER BY a.fechaCompra DESC, a.idCompra DESC, b.idDetCompra'
        console.log(consulta);
    }
    try {
        const result: IQueryComprasDetalles [] = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        let comprasDet: IdetallesComprasConMateriales [] = [];
        let comp: IdetallesComprasConMateriales={};        
        let values: IQueryComprasDetalles[] =[];
        let pos: number; 
        let listo: number[]=[]  ;      

        let resultAux=result;
        
        result.forEach(function  (value) {
            pos=-1;
            if(value.idCompra){ pos= listo.indexOf(value.idCompra) }    
                    
            if (pos<0){
                values=resultAux.filter(m => m.idCompra===value.idCompra);
                comp=armandoCompras(values);           
                comprasDet.push(comp);
                if(value.idCompra){ listo.push(value.idCompra); }
            }        
        });
        
        return resp.status(201).json(comprasDet);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

function  armandoCompras(ar: IQueryComprasDetalles[]): IdetallesComprasConMateriales{
    let comp: IdetallesComprasConMateriales={};
    
    comp.compra={};
    comp.moneda={};
    comp.proveedor={};
    comp.sucursal={};
    comp.detalles=[];
    ar.forEach(function  (value, i) {
        if (i==0){
            comp.compra={
                idCompra: value.idCompra,
                fechaCompra: value.fechaCompra,
                tasaDia: value.tasaDia,
                fkMoneda: value.fkcompra,
                total: value.total,
                subtotal: value.subtotal,
                iva: value.iva,
                montoIva: value.montoIva,
                neto: value.neto,
                estatus: value.estatus,
                idProveedor: value.idProveedor,
                loginCrea: value.loginCrea,
                fkSucursal: value.fkSucursal,                   
            };
            
            comp.moneda={
                idMoneda: value.fkMoneda,
                tipoMoneda: value.tipoMoneda,
                abrevMoneda: value.abrevMoneda,
                descripcionMoneda: value.descripcionMoneda
            };

            comp.proveedor={
                idProveedor: value.idProveedor,
                NombresProveedor: value.NombresProveedor,
                direccionProveedor: value.direccionProveedor,
                estatus: value.estatusProveedor
            };

            comp.sucursal={
                idSucursal: value.fkSucursal,
                direccionSucursal: value.direccionSucursal,
                nombreSucursal: value.nombreSucursal,
                logoSucursal: value.logoSucursal,
                encargado: value.encargado,
                rifSucursal: value.rifSucursal,
                tlfSucursal: value.tlfSucursal,
                emailSucursal: value.emailSucursal,
                fkempresa: value.fkempresa,
            };                         
        }

        comp.detalles?.push({
            fkcompra: value.idCompra,
            idDetCompra: value.idDetCompra,
            MateriaPrima:{
                idMateriaPrima: value.fkMateriaPrima,
                descripcion: value.descripcion,
                marca: value.marca
            },
            cantidad: value.cantidad,
            unidad: value.unidad,
            precioUnitario: value.precioUnitario,
            subtotal: value.subtotal,
        });
        
        
    });   
    
    return comp
}

function buscarItem  (paja: IdetallesComprasConMateriales [], aguja: number):number {
    let index=-1;
    paja.forEach((obj , i)=>{
        if (obj.compra?.idCompra === aguja){
            index=i;
            return;
        }
    })
    return index;    
}

export const createRecordCompras = async (req: Request, resp: Response) => {
    let newPost: IMaterialesComprados = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO tbmateriales_comprados SET ?", [newPost]);    
        newPost.idCompra = result.insertId;
        return resp.status(201).json(newPost.idCompra);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const createRecordDetalle = async (req: Request, resp: Response) => {
    let newPost: IdetallesCompras = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO tbdetalles_compras SET ?", [newPost]);    
        newPost.idDetCompra = result.insertId;
        return resp.status(201).json(newPost.idDetCompra);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecordCompra = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: IMaterialesComprados = req.body;

    let consulta = ("UPDATE tbmateriales_comprados SET ? WHERE idCompra = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Compra actualizada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const updateRecordDetalle = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: IdetallesCompras = req.body;

    let consulta = ("UPDATE tbdetalles_compras SET ? WHERE idDetCompra = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Detalle actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecordCompra = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from tbmateriales_comprados WHERE idCompra = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Compra eliminada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecordDetalle = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from tbdetalles_compras WHERE idDetCompra = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Detalle eliminada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}