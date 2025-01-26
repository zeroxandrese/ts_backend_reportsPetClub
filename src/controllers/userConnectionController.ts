import { Request, Response } from "express";
import { usersConnectionService } from '../services/usersConnection';

const usersConnectionController = async (req: Request, res: Response) => {

    try {
        const responseUsersConnectionData = await usersConnectionService();

        res.status(201).json(responseUsersConnectionData)

    } catch (error) {
        throw new Error("Problemas con el proceso, comunicate con el admin");
    }
};

export { usersConnectionController };