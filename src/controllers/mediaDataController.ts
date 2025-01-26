import { Request, Response } from "express";
import { mediaDataService } from '../services/mediaData';

const mediaDataController = async (req: Request, res: Response) => {

    try {
        const responseMediaData = await mediaDataService();

        res.status(201).json(responseMediaData)

    } catch (error) {
        throw new Error("Problemas con el proceso, comunicate con el admin");
    }
};

export { mediaDataController };