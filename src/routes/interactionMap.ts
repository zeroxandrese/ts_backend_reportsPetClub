import { Router } from "express";
import { validarJWT } from "../middelware/validar-jwt";
import { mapInteractionDataController } from '../controllers/interactionMapController';

const router = Router();

router.get('/', validarJWT, mapInteractionDataController);

export { router }; 