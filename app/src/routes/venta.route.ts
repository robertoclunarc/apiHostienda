import { Router } from "express";
import { SelectREcordAllVentas, SelectREcordAllDetVentas, SelectRecordFilter, createRecordVenta, createRecordDetalle, updateRecordVenta, updateRecordDetalle, deleteRecordVenta, deleteRecordDetalle } from '../controllers/ventas.controllers';
//import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar', SelectREcordAllVentas);
router.get('/consultar/detalles', SelectREcordAllDetVentas);
router.get('/filtrar/:Id/:idProducto/:fecha/:descripcion/:idSucursal/:comprador/:fechaIni/:fechaFin', SelectRecordFilter);
router.post('/insertar',  createRecordVenta);
router.post('/detalles/insertar',  createRecordDetalle);
router.put('/actualizar/:IdRec', updateRecordVenta);
router.put('/detalles/actualizar/:IdRec', updateRecordDetalle);
router.delete('/eliminar/:IdRec',  deleteRecordVenta);
router.delete('/detalles/eliminar/:IdRec',  deleteRecordDetalle);

export default router;