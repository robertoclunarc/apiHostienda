import express from "express";
import path from 'path';
import materiaRoutes from "./routes/materiaprima.route";
import signinRoutes from "./routes/signin.route";
import compradoresRoutes from "./routes/compradores.route";
import productosRoutes from "./routes/productos.route";
import pedidosRoutes from "./routes/pedido.route";
import proveedoresRoutes from "./routes/proveedor.routes";
import empresaRoutes from './routes/empresa.route';
import sucursalesRoutes from './routes/sucursales.route';
import monedasRoutes from './routes/moneda.route';
import comprasRoutes from './routes/compras.route';
import tasaCambioRoutes from './routes/tasas_cambios.route';
import unidadesRoutes from './routes/unidades.route';
import ventasRoutes from './routes/venta.route';
import inventarioMaterialRoutes from './routes/inventario.materiales.route';
import inventarioProductosRoutes from './routes/inventario.productos.route';
import parametrosGralesRoutes from './routes/parametros.route';
//import {createToken} from './controllers/signin';

import morgan from "morgan";
import dotenv from 'dotenv';
import cors from 'cors'

//setting
const app = express();
dotenv.config();
app.set("port", process.env.PORT || 3000);
app.set('trust proxy', true);

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.listen(app.get("port"));
console.log("Server express on port:", app.get("port"));

//app.get('/token/:login', createToken);
app.use('/unidades', unidadesRoutes);
app.use('/tasas', tasaCambioRoutes);
app.use('/compras', comprasRoutes);
app.use('/monedas', monedasRoutes);
app.use('/sucursales', sucursalesRoutes);
app.use('/empresas', empresaRoutes);
app.use('/proveedores', proveedoresRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/compradores', compradoresRoutes);
app.use('/productos', productosRoutes);
app.use('/materiasprima',materiaRoutes);
app.use('/usuarios',signinRoutes);
app.use('/ventas', ventasRoutes);
app.use('/inventarios/materiales', inventarioMaterialRoutes);
app.use('/inventarios/productos', inventarioProductosRoutes);
app.use('/parametros', parametrosGralesRoutes);

app.get('/', (req, res) => {
	const message = `Las APIs se ejecutan en el puerto: ${process.env.PORT}`;
	res.json({
		message
	});
});

app.use((req, res, next) => {
	res.status(404).json({
		err: 'Error, Ruta no encontrada'
	});
	next();
});