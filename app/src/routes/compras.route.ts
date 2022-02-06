import { Router } from "express";
import { SelectREcordAllCompras, SelectREcordAllDetalles, SelectRecordFilter, createRecordCompras, createRecordDetalle, updateRecordCompra, updateRecordDetalle, deleteRecordCompra, deleteRecordDetalle } from '../controllers/compras._materiales.controller';
//import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar', SelectREcordAllCompras);
router.get('/consultar/detalles', SelectREcordAllDetalles);
router.get('/filtrar/:Id/:idmaterial/:descripcion/:idSucursal/:idProveedor/:fechaIni/:fechaFin', SelectRecordFilter);
router.post('/insertar',  createRecordCompras);
router.post('/detalles/insertar',  createRecordDetalle);
router.put('/actualizar/:IdRec', updateRecordCompra);
router.put('/detalles/actualizar/:IdRec', updateRecordDetalle);
router.delete('/eliminar/:IdRec',  deleteRecordCompra);
router.delete('/detalles/eliminar/:IdRec',  deleteRecordDetalle);

export default router;