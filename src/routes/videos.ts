import { Router } from "express";
import { validarJWT } from "../middelware/validar-jwt";
import { countVideosController } from '../controllers/videos';

const router = Router();

router.get('/', validarJWT, countVideosController);

export { router }; 