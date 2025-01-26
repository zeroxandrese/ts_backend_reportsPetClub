import { Request, Response } from "express";
import { likeDataService } from '../services/likeData';

const likeDataController = async (req: Request, res: Response) => {

    try {
        const responseLikeData = await likeDataService();

        res.status(201).json(responseLikeData)

    } catch (error) {
        throw new Error("Problemas con el proceso, comunicate con el admin");
    }
};

export { likeDataController };