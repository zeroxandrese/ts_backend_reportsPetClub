import { Request, Response } from "express";
import { whatsappInteractionDataService } from '../services/interactionWhatsapp';

const whatsappInteractionDataController = async (req: Request, res: Response) => {

    try {
        const responsewhatsappInteractionData = await whatsappInteractionDataService();

        res.status(201).json(responsewhatsappInteractionData)

    } catch (error) {
        throw new Error("Problemas con el proceso, comunicate con el admin");
    }
};

export { whatsappInteractionDataController };