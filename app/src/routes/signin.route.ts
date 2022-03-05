import { Router } from "express";
import { SelectREcordAll, signIn, signUp, SelectUsuarioSucursales } from '../controllers/usuarios.controlller';
//import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.post('/signin', signIn);
router.get('/consultar', SelectREcordAll);
router.get('/sucursales', SelectUsuarioSucursales);
router.post('/signup', signUp);

export default router;