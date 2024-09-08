import { Request, Response } from "express";
import { countVideosService } from '../services/videos';

const countVideosController = async (req: Request, res: Response) => {

    try {
        const responseCountVideos = await countVideosService();

        res.status(201).json(responseCountVideos)

    } catch (error) {
        res.sendStatus(501)
        throw new Error("Problemas con el registro, comunicate con el admin");
    }
};

export { countVideosController };