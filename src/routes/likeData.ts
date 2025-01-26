import { Router } from "express";
import { validarJWT } from "../middelware/validar-jwt";
import { likeDataController } from '../controllers/likeDataController';

const router = Router();

router.get('/', validarJWT, likeDataController);

export { router }; 