import { Router } from "express";
import { SelectREcordAll, SelectRecordFilter, ultimaTasa,  createRecord, updateRecord, deleteRecord } from '../controllers/tasas_cambios.controller';
//import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar', SelectREcordAll);
router.get('/ultimatasa/:idMoneda', ultimaTasa);
router.get('/filtrar/:Id/:idMoneda/:nombre/:fechaIni/:fechaFin', SelectRecordFilter);
router.post('/insertar',  createRecord);
router.put('/actualizar/:IdRec', updateRecord);
router.delete('/eliminar/:IdRec',  deleteRecord);

export default router;