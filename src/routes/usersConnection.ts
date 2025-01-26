import { Router } from "express";
import { validarJWT } from "../middelware/validar-jwt";
import { usersConnectionController } from '../controllers/userConnectionController';

const router = Router();

router.get('/', validarJWT, usersConnectionController);

export { router }; 