import { Response, Request, NextFunction  } from "express";
import { validationResult } from "express-validator";

const validarCampos = (req: Request, res: Response, next: NextFunction) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json(erros);
    }
    next();
};

export { validarCampos };