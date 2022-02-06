import { Router } from "express";
import { SelectREcordAllPedidos , SelectRecordFilter, SelectPedidosAsociados, createRecordPedido, createRecordDetallesPedido, updateRecordPedido, updateRecordDetallesPedido, deleteRecordPedido, deleteRecordDetallesPedido } from '../controllers/pedidos.controller';
//import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar', SelectREcordAllPedidos);
router.get('/consultar/asociados/:idPedido', SelectPedidosAsociados);
router.get('/filtrar/:Id/:fechaIni:/fechaFin/:idVentaAsociada/:idCompraAsociada/:idProveedor/:idComprador/:tipoPedido:/:tipoPedido/:loginCrea', SelectRecordFilter);
router.post('/insertar',  createRecordPedido);
router.post('/insertar/detalles',  createRecordDetallesPedido);
router.put('/actualizar/:IdRec', updateRecordPedido);
router.put('/actualizar/detalles/:IdRec', updateRecordDetallesPedido);
router.delete('/eliminar/:IdRec',  deleteRecordPedido);
router.delete('/eliminar/detalles/:IdRec',  deleteRecordDetallesPedido);

export default router;