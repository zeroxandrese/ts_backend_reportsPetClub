import { Router } from "express";
import { validarJWT } from "../middelware/validar-jwt";
import { countPetsController } from '../controllers/pets';

const router = Router();

router.get('/', validarJWT, countPetsController);

export { router }; 