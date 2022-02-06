import { ImateriPrima } from './materiaprima';
import { IMoneda } from './monedas';
import { IProveedores } from './proveedores';
import { ISucursal } from './sucursales';

export interface IMaterialesComprados{
    idCompra?: number;
    fechaCompra?: string;
    tasaDia?: number;
    fkMoneda?: number;
    total?: number;
    subtotal?: number;
    iva?: number;
    montoIva?: number;
    neto?: number;
    estatus?: string;
    idProveedor?: number;
    loginCrea?: string;
    fkSucursal?: number;
}

export interface IdetallesCompras{
    fkcompra?: number;
    idDetCompra?: number;
    fkMateriaPrima?: number;
    cantidad?: number;
    unidad?: string;
    precioUnitario?: number;
    subtotal?: number;
}

export interface IDetallesCompra{
    fkcompra?: number;
    idDetCompra?: number;
    MateriaPrima?: ImateriPrima;
    cantidad?: number;
    unidad?: string;
    precioUnitario?: number;
    subtotal?: number;
}

export interface IdetallesComprasConMateriales{
    compra?: IMaterialesComprados;
    moneda?: IMoneda;
    proveedor?: IProveedores;
    sucursal?:ISucursal;
    detalles?: IDetallesCompra[];    
}

export interface IQueryComprasDetalles{
    idCompra?: number;
    fechaCompra?: string;
    tasaDia?: number;
    fkMoneda?: number;
    total?: number;
    subtotal?: number;
    iva?: number;
    montoIva?: number;
    neto?: number;
    estatus?: string;
    loginCrea?: string;
    fkSucursal?: number;
    fkcompra?: number;
    idDetCompra?: number;
    fkMateriaPrima?: number;
    cantidad?: number;
    unidad?: string;
    precioUnitario?: number;
    idMoneda?: number;
    descripcionMoneda?: string;
    abrevMoneda?: string;
    tipoMoneda?: string;
    idMateriaPrima?: number;
    descripcion?: string;
    marca?: string;
    idProveedor?: number; 
    NombresProveedor?: string;
    direccionProveedor?: string;
    estatusProveedor?: string;
    idSucursal?: number; 
    nombreSucursal?: string;
    rifSucursal?: string;
    direccionSucursal?: string;
    tlfSucursal?: string;
    encargado?: string;
    emailSucursal?: string;
    fkempresa?: number; 
    logoSucursal?: string; 
  }