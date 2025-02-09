import { Router } from "express";
import { check } from "express-validator";
import { upload } from "../middelware/multerConfig";

import { businessRegisterGetController, businessRegisterPostController, businessRegisterPutController } from '../controllers/businessRegisterController';
import { validarCampos } from "../middelware/validar-campos";
import { findIdBusinessRegister } from "../helpers/db-validators";
import { validarJWT } from "../middelware/validar-jwt";


const router = Router();

router.get('/', validarJWT, businessRegisterGetController);

router.post('/', upload.single("file"), validarCampos, businessRegisterPostController);

router.put('/:id', [
    validarJWT,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(findIdBusinessRegister)
], businessRegisterPutController);

export { router }; 