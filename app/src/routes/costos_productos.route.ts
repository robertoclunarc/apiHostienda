import { Router } from "express";
import { SelectREcordAll, SelectRecordFilter, SelectRecordCostosProductos, createRecord, updateRecord, deleteRecord } from '../controllers/costos.controller';
//import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar', SelectREcordAll);
router.get('/filtrar/:Id/:idProducto', SelectRecordFilter);
router.get('/filtrar/producto/:Id/:descripcion/:idCosto/:idSucursal',SelectRecordCostosProductos);
router.post('/insertar',  createRecord);
router.put('/actualizar/:IdRec', updateRecord);
router.delete('/eliminar/:IdRec',  deleteRecord);

export default router;