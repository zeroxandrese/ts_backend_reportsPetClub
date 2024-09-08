import { Request, Response } from "express";
import { countPetsService } from '../services/pets';

const countPetsController = async (req: Request, res: Response) => {

    try {
        const responseCountPets = await countPetsService();

        res.status(201).json(responseCountPets)

    } catch (error) {
        res.sendStatus(501)
        throw new Error("Problemas con el registro, comunicate con el admin");
    }
};

export { countPetsController };