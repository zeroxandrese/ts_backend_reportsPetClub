import { Router } from "express";
import { validarJWT } from "../middelware/validar-jwt";
import { countImagesController } from '../controllers/images';

const router = Router();

router.get('/', validarJWT, countImagesController);

export { router }; 