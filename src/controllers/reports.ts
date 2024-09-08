import { Request, Response } from "express";
import { countReportsService } from '../services/reports';

const countReportsController = async (req: Request, res: Response) => {

    try {
        const responseCountReports = await countReportsService();

        res.status(201).json(responseCountReports)

    } catch (error) {
        res.sendStatus(501)
        throw new Error("Problemas con el registro, comunicate con el admin");
    }
};

export { countReportsController };