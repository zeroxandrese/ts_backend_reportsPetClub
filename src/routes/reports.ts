import { Router } from "express";
import { validarJWT } from "../middelware/validar-jwt";
import { countReportsController } from '../controllers/reports';

const router = Router();

router.get('/', validarJWT, countReportsController);

export { router }; 