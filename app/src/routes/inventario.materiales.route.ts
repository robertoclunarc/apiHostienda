import { Router } from "express";
import { SelectREcordAll, SelectREcordOne, SelectRecordFilter, createRecord, updateRecord, deleteRecord, sumarInventario, restarInventario } from '../controllers/inventarios/invetario.materiales.controller';
//import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar', SelectREcordAll);
router.get('/consultar/idRec', SelectREcordOne);
router.get('/filtrar/:fkMateriaPrima/:fksucursal/:ubicacionA/:fechaCrea/:unidad', SelectRecordFilter);
router.post('/insertar',  createRecord);
router.put('/actualizar/:IdRec', updateRecord);
router.post('/sumar', sumarInventario);
router.put('/restar/:IdRec/:cant/:unidad/:sucursal', restarInventario);
router.delete('/eliminar/:IdRec',  deleteRecord);

export default router;