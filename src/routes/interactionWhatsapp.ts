import { Router } from "express";
import { validarJWT } from "../middelware/validar-jwt";
import { whatsappInteractionDataController } from '../controllers/interactionWhatsappController';

const router = Router();

router.get('/', validarJWT, whatsappInteractionDataController);

export { router }; 