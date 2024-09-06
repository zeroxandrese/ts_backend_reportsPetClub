import { Router } from "express";

import { tokensGet } from '../controllers/tokens';
import { validarJWT } from "../middelware/validar-jwt";

const router = Router();

router.get('/', validarJWT, tokensGet);

export { router };