import { Request, Response } from "express";
import { infoService } from '../services/info';

const infoController = async (req: Request, res: Response)=> {
    try {
        
        const responseService = await infoService();

        res.status(201).json(responseService)

    } catch (error) {
        res.sendStatus(501)
        throw new Error("Problemas con el registro, comunicate con el admin");
    }
}

export { infoController };