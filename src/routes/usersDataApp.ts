import { Router } from "express";
import { validarJWT } from "../middelware/validar-jwt";
import { usersDataAppController } from '../controllers/userDataApp';

const router = Router();

router.get('/', validarJWT, usersDataAppController);

export { router }; 