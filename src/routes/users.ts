import { Router } from "express";

import { postUser } from "../controllers/users";
import { validarCampos } from "../middelware/validar-campos";

const router = Router();

router.post("/",validarCampos, postUser);

export { router };