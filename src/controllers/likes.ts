import { Request, Response } from "express";
import { countLikesService } from '../services/likes';

const countLikesController = async (req: Request, res: Response) => {

    try {
        const responseCountLikes = await countLikesService();

        res.status(201).json(responseCountLikes)

    } catch (error) {
        throw new Error("Problemas con el registro, comunicate con el admin");
    }
};

export { countLikesController };