import { Router } from "express";
import { SelectREcordAll, SelectRecordFilterTipo, SelectUltimoPrecioTipo, createRecord, updateRecord, deleteRecord } from '../controllers/precios.controller';
//import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar', SelectREcordAll);
router.get('/consultar/tipos/:tipo', SelectRecordFilterTipo);
router.get('/consultar/ultimoprecio/:tipo', SelectUltimoPrecioTipo);
router.post('/insertar',  createRecord);
router.put('/actualizar/:IdRec', updateRecord);
router.delete('/eliminar/:IdRec',  deleteRecord);

export default router;