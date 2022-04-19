import { json, Request, Response } from "express";
import db from "../../database";
import { IProductos, IDetProductos, IdetProductosConMateriales, IdetProducto } from "../../interfaces/productos";
import { ImateriPrima } from "../../interfaces/materiaprima";
import { IMoneda } from '../../interfaces/monedas';

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM tbproductos";    
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
    let consulta = "SELECT tbproductos.* FROM tbproductos";
    let prod = {
        idProducto: req.params.Id,        
        descripcion: req.params.descripcion,        
    }

    let where: string[] = [];
    
    if (prod.idProducto!="NULL" || prod.descripcion!="NULL"){
        if(prod.idProducto!="NULL"){   
            where.push( " idProducto =" + prod.idProducto);
        }

        if(prod.descripcion!="NULL"){
            where.push( " LOWER(descripcionProducto) LIKE LOWER('%" + prod.descripcion + "%')");
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

export const SelectRecordDetProductos = async (req: Request, resp: Response) => {
    let consulta = "SELECT a.*, b.*, c.*, d.*, e.*, u.*  FROM tbproductos a  LEFT join  tbdetetalles_productos b  on a.idProducto=b.fkProducto     LEFT join tbmateria_prima c on b.fkMateria=c.idMateriaPrima INNER JOIN tbsucursales d on d.idSucursal=a.fkSucursal INNER JOIN tbmonedas e on a.fkMoneda=e.idMoneda INNER JOIN tbusuarios u ON a.loginCrea=u.login";
    
      let prod = {
          idProducto: req.params.Id!='null'?req.params.Id:'NULL',        
          descripcion: req.params.descripcion!='null'?req.params.descripcion:'NULL',
          material: req.params.idMaterial!='null'?req.params.IdMaterial:'NULL',
          sucursal: req.params.idSucursal!='null'?req.params.idSucursal:'NULL',     
      }
  
      let where: string[] = [];
      
      if (prod.idProducto!="NULL" || prod.descripcion!="NULL" || prod.material!="NULL" || prod.sucursal!="NULL"){
          if(prod.idProducto!="NULL"){   
              where.push( " a.idProducto =" + prod.idProducto);
          }
  
          if(prod.descripcion!="NULL"){
              where.push( " LOWER(a.descripcionProducto) LIKE LOWER('%" + prod.descripcion + "%')");
          }
          
          if(prod.material!="NULL"){
            where.push( " c.idMateriaPrima =" + prod.material + "");
          }

          if(prod.sucursal!="NULL"){
            where.push( " d.idSucursal =" + prod.sucursal + "");
          }
  
          where.forEach(function(where, index) {
              if (index==0){
                  consulta = consulta + " AND " + where;
              }else{
                  consulta = consulta + " OR " + where;
              }
  
          }); 
          
          consulta = consulta + " ORDER BY a.idProducto, b.idDetProducto ";
          console.log(consulta);
      }
      try {
          const result = await db.querySelect(consulta);
          if (result.length > 0) {
            let detProductosConMateriales:  IdetProductosConMateriales []=[];
            let detProductoConMaterial: IdetProductosConMateriales={};
            let moneda: IMoneda={};
            detProductoConMaterial.materiaPrima=[];
            //let detProd: IdetProducto
            let material: ImateriPrima={};
            let items: number=0;
            let i: number=0;
            for await (let det of result){
                
                //detProd={};
                
                detProductoConMaterial.producto={
                    idProducto: det.idProducto,
                    descripcionProducto : det.descripcionProducto,
                    fechaProduccion: det.fechaProduccion,
                    imagenProducto: det.imagenProducto,
                    precio: det.precio,
                    fkSucursal: det.fkSucursal,
                    loginCrea: det.loginCrea,    
                    marcaProducto: det.marcaProducto,
                    retieneIva_prod: det.retieneIva_prod,
                    iva: det.iva,
                    montoIva: det.montoIva,
                    tasaDiaProd: det.tasaDiaProd,
                };

                detProductoConMaterial.usuarioSucursal={
                    
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

                detProductoConMaterial.moneda={
                    idMoneda: det.fkMoneda,
                    descripcionMoneda: det.descripcionMoneda,
                    abrevMoneda: det.abrevMoneda
                };

                if (det.idDetProducto!=undefined && det.idDetProducto!=null && det.idDetProducto!=""){
                
                    material={ 
                        idMateriaPrima: det.idMateriaPrima,  
                        descripcion: det.descripcion,  
                        marca: det.marca,  
                        retieneIva: det.retieneIva 
                    };

                    detProductoConMaterial.materiaPrima?.push({
                        idDetProducto: det.idDetProducto,
                        fkProducto: det.fkProducto,
                        Materia: material,
                        cantidad: det.cantidad,
                        unidad: det.cantidad
                    });
                }               

                items= await result.filter( (I:any) => I.idProducto==det.idProducto).length;
               
                if (i === items-1){
                    
                    detProductosConMateriales.push(detProductoConMaterial);
                    i=0;
                    detProductoConMaterial={};
                    detProductoConMaterial.materiaPrima=[];
                    material={};
                }else{
                    
                    i++;
                }
            }


            return resp.status(201).json(detProductosConMateriales);
          }
          return resp.status(402).json({ msg: "No Data!" });
          
  
      } catch (error) {
          resp.status(401).json({ err: error });
      }
  }

export const createRecordProducto = async (req: Request, resp: Response) => {
    let newPost: IProductos = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO tbproductos SET ?", [newPost]);    
        newPost.idProducto = result.insertId;
        return resp.status(201).json(newPost.idProducto);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const createRecordDetallesProducto = async (req: Request, resp: Response) => {
    let newPost: IDetProductos = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO tbdetalles_productos SET ?", [newPost]);    
        newPost.idDetProducto = result.insertId;
        return resp.status(201).json(newPost.idDetProducto);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecordProducto = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: IProductos = req.body;

    let consulta = ("UPDATE tbproductos SET ? WHERE idProducto = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Producto actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const updateRecordDetallesProducto = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: IProductos = req.body;

    let consulta = ("UPDATE tbdetalles_productos SET ? WHERE idDetProducto = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Producto actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecordProducto = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from tbproductos WHERE idProducto = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Producto eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecordDetallesProducto = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from tbdetalles_productos WHERE idDetProducto = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Producto eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteTodoDetallesProducto = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("delete from tbdetalles_productos WHERE idProducto = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Detalles Producto eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}