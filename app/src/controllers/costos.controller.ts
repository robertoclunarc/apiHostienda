import { json, Request, Response } from "express";
import db from "../database";
import { ICosto, ICostoGastos, IProductosCostos } from "../interfaces/costos_productos";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbcostos_productos";    
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
    const valueIsNull = [undefined, 'null', 'NULL', ''];
    const regex = /^[0-9]*$/;
    let consulta = "SELECT a.idCosto,a.fecha as fechacosto,a.fkProducto,a.ganancia_porc,a.total,a.neto,a.raciones,a.tasa,a.precio_venta, b.idgasto,b.descripcion_gasto,b.precio, b.fkmoneda,b.fecha as fechagasto FROM tbcostos_productos a left join tbgastos_productos b on b.fkCosto=a.idCosto";
    let filtro = {
        idCosto: valueIsNull.indexOf(req.params.Id)  != -1  ? null :  req.params.Id, 
        idProducto: valueIsNull.indexOf(req.params.idProducto)  != -1  ? null :  req.params.idProducto,
         
    }
    let where: string[] = [];
    
    if (filtro.idCosto!=null || filtro.idProducto!=null ){
        if(filtro.idCosto!=null  && regex.test(filtro.idCosto)){   
            where.push( " a.idCosto =" + filtro.idCosto);
        }

        if(filtro.idProducto!=null && regex.test(filtro.idProducto)){   
            where.push( " b.fkProducto =" + filtro.idProducto);
        }           

        where.forEach(function(where, index) {
            if (index==0){
                consulta = consulta + " WHERE " + where;
            }else{
                consulta = consulta + " OR " + where;
            }

        });        
        consulta = consulta + " order by a.idCosto desc";
    }
    try {
        const result = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        let costoGastos: ICostoGastos;
        let arrayCostosGastos: ICostoGastos[]=[];
        let registrados: any[]=[];
        
        for await (let rs of result){
            costoGastos={costo:{}, gastos:[]};            
            if (!registrados.includes(rs.idCosto))  {          
                registrados.push(rs.idCosto);
                costoGastos.costo={
                    idCosto: rs.idCosto,
                    fecha: rs.fechacosto,
                    fkProducto: rs.fkProducto,
                    ganancia_porc: rs.ganancia_porc,
                    total: rs.total,
                    neto: rs.neto,
                    raciones: rs.raciones,
                    tasa: rs.tasa,
                    precio_venta: rs.precio_venta
                };                
                costoGastos.gastos = await traerGrupo(rs.idCosto, result);
                arrayCostosGastos.push(costoGastos);
            }            
        }
        return resp.status(201).json(arrayCostosGastos);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const SelectRecordCostosProductos = async (req: Request, resp: Response) => {
    let consulta = "SELECT a.*, a.precio as precioprod, b.*, b.fecha as fechacosto, d.*, e.*, u.*  FROM tbproductos a  LEFT join  tbcostos_productos b  on a.idProducto=b.fkProducto  INNER JOIN tbsucursales d on d.idSucursal=a.fkSucursal INNER JOIN tbmonedas e on a.fkMoneda=e.idMoneda INNER JOIN tbusuarios u ON a.loginCrea=u.login";

    const valueIsNull = [undefined, 'null', 'NULL', ''];
    const regex = /^[0-9]*$/;
    
    let prod = {
          idProducto: valueIsNull.indexOf(req.params.Id)  != -1  ? null :  req.params.Id,        
          descripcion: valueIsNull.indexOf(req.params.descripcion)  != -1  ? null :  req.params.descripcion,
          idCosto: valueIsNull.indexOf(req.params.idCosto)  != -1  ? null :  req.params.idCosto,
          sucursal: valueIsNull.indexOf(req.params.idSucursal)  != -1  ? null :  req.params.idSucursal,     
    }
  
      let where: string[] = [];
      
      if (prod.idProducto!=null || prod.descripcion!=null || prod.idCosto!=null || prod.sucursal!=null){
          if(prod.idProducto!=null  && regex.test(prod.idProducto)){   
              where.push( " a.idProducto =" + prod.idProducto);
          }
  
          if(prod.descripcion!=null){
              where.push( " LOWER(a.descripcionProducto) LIKE LOWER('%" + prod.descripcion + "%')");
          }
          
          if(prod.idCosto!=null  && regex.test(prod.idCosto)){
            where.push( " b.idCosto =" + prod.idCosto + "");
          }

          if(prod.sucursal!=null && regex.test(prod.sucursal)){
            where.push( " d.idSucursal =" + prod.sucursal + "");
          }
  
          where.forEach(function(where, index) {
              if (index==0){
                  consulta = consulta + " AND " + where;
              }else{
                  consulta = consulta + " OR " + where;
              }
  
          }); 
          
          consulta = consulta + " ORDER BY a.idProducto desc, b.idCosto desc";
          
      }
      try {
          const result = await db.querySelect(consulta);
          if (result.length > 0) {
            let arrayProductosCosto:  IProductosCostos []=[];
            let productosCosto: IProductosCostos;
            //let moneda: IMoneda={};
           // detProductoConMaterial.materiaPrima=[];
            //let detProd: IdetProducto
            //let material: ImateriPrima={};
            let items: number=0;
            let i: number=0;
            for await (let det of result){
                
                productosCosto={};
                
                productosCosto.producto={
                    idProducto: det.idProducto,
                    descripcionProducto : det.descripcionProducto,
                    fechaProduccion: det.fechaProduccion,
                    imagenProducto: det.imagenProducto,
                    precio: det.precioprod,
                    fkSucursal: det.fkSucursal,
                    loginCrea: det.loginCrea,    
                    marcaProducto: det.marcaProducto,
                    retieneIva_prod: det.retieneIva_prod,
                    iva: det.iva,
                    montoIva: det.montoIva,
                    tasaDiaProd: det.tasaDiaProd,
                    fkMoneda: det.fkMoneda
                };

                productosCosto.usuarioSucursal={
                    
                    sucursal: { 
                        idSucursal: det.idSucursal,
                        nombreSucursal: det.nombreSucursal,
                        rifSucursal: det.rifSucursal,
                        direccionSucursal: det.direccionSucursal,
                        tlfSucursal: det.tlfSucursal,
                        encargado: det.encargado,
                        emailSucursal: det.emailSucursal,
                        fkempresa: det.fkempresa,
                        logoSucursal: det.logoSucursal
                    },
                    usuario: {
                        login: det.login,                        
                        nombres: det.nombres,
                        cargo: det.cargo,
                        nivel: det.nivel,
                        email: det.email,                        
                        estatus: det.estatus,
                        imagen: det.imagen
                    }
                };

                productosCosto.moneda={
                    idMoneda: det.fkMoneda,
                    descripcionMoneda: det.descripcionMoneda,
                    abrevMoneda: det.abrevMoneda
                };

                if (det.idCosto!=undefined && det.idCosto!=null && det.idCosto!=""){
                
                    productosCosto.costos={
                        idCosto: det.idCosto,
                        fecha: det.fechacosto,
                        fkProducto: det.fkProducto,
                        ganancia_porc: det.ganancia_porc,
                        total: det.total,
                        neto: det.neto,
                        raciones: det.raciones,
                        tasa: det.tasa,
                        precio_venta: det.precio_venta
                    }
                }
                arrayProductosCosto.push(productosCosto);
            }

            //console.log(detProductosConMateriales);
            return resp.status(201).json(arrayProductosCosto);
          }
          return resp.status(402).json({ msg: "No Data!" });
          
  
      } catch (error) {
          resp.status(401).json({ err: error });
      }
  }


const traerGrupo = async (aguja:number, paja:any[])=>{
    let grupo :  any[]=[];
    for await (let e of paja){
        if (e.idCosto==aguja){
            if (e.idgasto!=null){
                grupo.push({
                    idgasto: e.idgasto,
                    descripcion_gasto: e.descripcion_gasto,
                    fkCosto: e.idCosto,
                    precio: e.precio,
                    fkmoneda: e.fkmoneda,
                    fecha: e.fechagasto
                });
            }
        }
    }
    return grupo;
}

export const createRecord = async (req: Request, resp: Response) => {
    let newPost: ICosto = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO tbcostos_productos SET ?", [newPost]);    
        newPost.idCosto = result.insertId;
        return resp.status(201).json(newPost);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: ICosto = req.body;

    let consulta = ("UPDATE tbcostos_productos SET ? WHERE idCosto = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Costo actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from tbcostos_productos WHERE idCosto = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Costo eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}