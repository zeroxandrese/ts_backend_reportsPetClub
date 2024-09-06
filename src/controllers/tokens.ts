import { Request, Response } from "express";
import { tokensService } from "../services/tokens"

const tokensGet = async (req: Request, res: Response) => {

    try {
        const responseTokens = await tokensService();

        res.status(201).json(responseTokens)

    } catch (error) {
        res.sendStatus(501)
        throw new Error("Problemas con el registro, comunicate con el admin");
    }
};

export { tokensGet };