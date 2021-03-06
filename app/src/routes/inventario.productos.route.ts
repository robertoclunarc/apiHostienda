import { Router } from "express";
import { SelectREcordAll, SelectREcordOne, SelectRecordFilter, createRecord, updateRecord, deleteRecord } from '../controllers/inventarios/inventario.productos.controller';
//import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar', SelectREcordAll);
router.get('/consultar/idRec', SelectREcordOne);
router.get('/filtrar/:fkProducto/:fksucursal/:ubicacionA/:fechaCrea', SelectRecordFilter);
router.post('/insertar',  createRecord);
router.put('/actualizar/:IdRec', updateRecord);
router.delete('/eliminar/:IdRec',  deleteRecord);

export default router;