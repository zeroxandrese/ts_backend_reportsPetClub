import { Router } from "express";
import { validarJWT } from "../middelware/validar-jwt";
import { countLikesController } from '../controllers/likes';

const router = Router();

router.get('/', validarJWT, countLikesController);

export { router }; 