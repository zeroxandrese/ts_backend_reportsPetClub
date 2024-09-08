import { Request, Response } from "express";
import { countImagesService } from '../services/images';

const countImagesController = async (req: Request, res: Response) => {

    try {
        const responseCountImages = await countImagesService();

        res.status(201).json(responseCountImages)

    } catch (error) {
        res.sendStatus(501)
        throw new Error("Problemas con el registro, comunicate con el admin");
    }
};

export { countImagesController };