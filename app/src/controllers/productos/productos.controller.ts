import { json, Request, Response } from "express";
import db from "../../database";
import { IProductos, IDetProductos } from "../../interfaces/productos";

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
    let consulta = "SELECT tbproductos.*, tbdetetalles_productos.*, tbmateria_prima.* FROM tbproductos, tbdetetalles_productos, tbmateria_prima WHERE idProducto=fkProducto AND fkMateria=IdMateriaPrima";
    
      let prod = {
          idProducto: req.params.Id,        
          descripcion: req.params.descripcion,
          material: req.params.material       
      }
  
      let where: string[] = [];
      
      if (prod.idProducto!="NULL" || prod.descripcion!="NULL"){
          if(prod.idProducto!="NULL"){   
              where.push( " idProducto =" + prod.idProducto);
          }
  
          if(prod.descripcion!="NULL"){
              where.push( " LOWER(descripcionProducto) LIKE LOWER('%" + prod.descripcion + "%')");
          }
          
          if(prod.material!="NULL"){
            where.push( " LOWER(tbmateria_prima.descripcion) LIKE LOWER('%" + prod.material + "%')");
        }
  
          where.forEach(function(where, index) {
              if (index==0){
                  consulta = consulta + " AND " + where;
              }else{
                  consulta = consulta + " OR " + where;
              }
  
          }); 
          
          consulta = consulta + " ORDER BY idDetProducto ";
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