import { Router } from "express";
import { SelectREcordAll, SelectRecordFilter, SelectRecordDetProductos, createRecordProducto, createRecordDetallesProducto, updateRecordProducto, updateRecordDetallesProducto, deleteRecordProducto, deleteRecordDetallesProducto, deleteTodoDetallesProducto } from '../controllers/productos/productos.controller';
//import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar', SelectREcordAll);
router.get('/filtrar/:Id/:descripcion', SelectRecordFilter);
router.get('/filtrar/detalles/:Id/:descripcion/:idMaterial/:idSucursal', SelectRecordDetProductos);
router.post('/insertar',  createRecordProducto);
router.post('/insertar/detalles',  createRecordDetallesProducto);
router.put('/actualizar/:IdRec', updateRecordProducto);
router.put('/actualizar/detalles/:IdRec', updateRecordDetallesProducto);
router.delete('/eliminar/:IdRec',  deleteRecordProducto);
router.delete('/eliminar/detalles/:IdRec',  deleteRecordDetallesProducto);
router.delete('/detalles/eliminar/todo/:IdRec',  deleteTodoDetallesProducto);

export default router;