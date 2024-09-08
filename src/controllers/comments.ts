import { Request, Response } from "express";
import { countCommentsService } from '../services/comments';

const countCommentsController = async (req: Request, res: Response) => {

    try {
        const responseCountImages = await countCommentsService();

        res.status(201).json(responseCountImages)

    } catch (error) {
        res.sendStatus(501)
        throw new Error("Problemas con el registro, comunicate con el admin");
    }
};

export { countCommentsController };