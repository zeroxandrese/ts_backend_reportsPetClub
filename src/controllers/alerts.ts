import { Request, Response } from "express";
import { countAlertsService } from '../services/alerts';

const countAlertsController = async (req: Request, res: Response) => {

    try {
        const responseCountAlerts = await countAlertsService();

        res.status(201).json(responseCountAlerts)

    } catch (error) {
        res.sendStatus(501)
        throw new Error("Problemas con el registro, comunicate con el admin");
    }
};

export { countAlertsController };