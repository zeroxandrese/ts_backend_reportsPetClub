import { Router } from "express";
import { validarJWT } from "../middelware/validar-jwt";
import { countPointsController } from '../controllers/points';

const router = Router();

router.get('/', validarJWT, countPointsController);

export { router }; 