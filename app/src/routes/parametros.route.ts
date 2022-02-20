import { Router } from "express";
import { SelectREcordAll, ConsultarIva, createRecord, updateRecord, deleteRecord } from '../controllers/parametros.controller';
//import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar', SelectREcordAll);
router.get('/iva', ConsultarIva);
router.post('/insertar',  createRecord);
router.put('/actualizar/:IdRec', updateRecord);
router.delete('/eliminar/:IdRec',  deleteRecord);

export default router;