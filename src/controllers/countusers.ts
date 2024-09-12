import { Request, Response } from "express";
import { countUserService } from '../services/countusers';

const countUserController = async (req: Request, res: Response) => {

    try {
        const responseCountUser = await countUserService();

        res.status(201).json(responseCountUser)

    } catch (error) {
        throw new Error("Problemas con el registro, comunicate con el admin");
    }
};

export { countUserController };