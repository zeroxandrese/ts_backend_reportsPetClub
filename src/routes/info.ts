import { Router } from "express";
import { validarJWT } from "../middelware/validar-jwt";
import { infoController } from '../controllers/info';

const router = Router();

router.get('/', validarJWT, infoController);

export { router }; 