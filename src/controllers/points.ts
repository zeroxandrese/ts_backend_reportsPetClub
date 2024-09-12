import { Request, Response } from "express";
import { countPointsService } from '../services/points';

const countPointsController = async (req: Request, res: Response) => {

    try {
        const responseCountPoints = await countPointsService();

        res.status(201).json(responseCountPoints)

    } catch (error) {
        throw new Error("Problemas con el registro, comunicate con el admin");
    }
};

export { countPointsController };