import { Request, Response } from "express";
import { mapInteractionDataService } from '../services/interactionMap';

const mapInteractionDataController = async (req: Request, res: Response) => {

    try {
        const responseMapInteractionData = await mapInteractionDataService();

        res.status(201).json(responseMapInteractionData)

    } catch (error) {
        throw new Error("Problemas con el proceso, comunicate con el admin");
    }
};

export { mapInteractionDataController };