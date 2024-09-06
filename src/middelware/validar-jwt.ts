import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { JwtPayload } from "../interface/interface";

const prisma = new PrismaClient();

const validarJWT = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('z-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición- token'
        })
    }

    try {

        if (!process.env.SECRETORPRIVATEKEY) {
            throw new Error('No se encontró SECRETORPRIVATEKEY en el archivo .env');
        }
        const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY) as JwtPayload;

        // validacion usuario autenticado
        const userAuth = await prisma.user.findUnique({ where: { id: decoded.id } });

        //Validacion del usuario exite
        if (!userAuth) {
            throw new Error("Error en la validacion del token");
        }

        next();
    } catch (error) {
        throw new Error("Error en la validacion del token");

    }

}

export { validarJWT };