import { Request, Response } from "express";
import { userAppService } from '../services/usersData';

const usersDataAppController = async (req: Request, res: Response) => {

    try {
        const responseUsersData = await userAppService();

        res.status(201).json(responseUsersData)

    } catch (error) {
        throw new Error("Problemas con el proceso, comunicate con el admin");
    }
};

export { usersDataAppController };