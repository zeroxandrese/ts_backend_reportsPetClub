import { Router } from "express";
import { validarJWT } from "../middelware/validar-jwt";
import { countUserController } from '../controllers/countusers';


const router = Router();

router.get('/', validarJWT, countUserController);

export { router }; 