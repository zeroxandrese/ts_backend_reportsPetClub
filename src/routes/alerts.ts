import { Router } from "express";
import { validarJWT } from "../middelware/validar-jwt";
import { countAlertsController } from '../controllers/alerts';

const router = Router();

router.get('/', validarJWT, countAlertsController);

export { router }; 