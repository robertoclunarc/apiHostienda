import { ImateriPrima } from './materiaprima';
import { ISucursal } from './sucursales'
import { IMoneda } from './monedas';

export interface IProductos{ 
    idProducto ?: number;
    descripcionProducto? : string;
    fechaProduccion?: string;
    imagenProducto?: string;
    fkSucursal?: number;    
    marca?: string;
    retieneIva_prod?: boolean;
    precio?: number;
    fkMoneda?: number;
}

export interface IDetProductos{   
    idDetProducto?: number;
    fkProducto?: number;
    fkMateria?: number;
    cantidad?: number;
    unidad?: string;
}

/*export interface IMateriales{    
    materiaPrima?: ImateriPrima;
    cantidad?: number;
    unidad?: string;
}*/

export interface IdetProducto{   
    idDetProducto?: number;
    fkProducto?: number;
    Materia?:ImateriPrima;
    cantidad?: number;
    unidad?: string;
}

export interface IdetProductosConMateriales{    
    producto?:IProductos,
    moneda?: IMoneda,
    materiaPrima?: IdetProducto[];  
    sucursal?: ISucursal
}
