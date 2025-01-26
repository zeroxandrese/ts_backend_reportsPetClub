import { Router } from "express";
import { validarJWT } from "../middelware/validar-jwt";
import { mediaDataController } from '../controllers/mediaDataController';

const router = Router();

router.get('/', validarJWT, mediaDataController);

export { router }; 