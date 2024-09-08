//Comentado por seguridad, no hay creacion por peticion habilitada a este endpoint
/* import { Request, Response } from "express";
import { userPostService } from "../services/users"

const postUser = async (req: Request, res: Response) => {
    const { name, password } = req.body

    try {
        if (!name || !password || name === "" || password === "") {
            res.status(401).json({
                msg: "Información faltante"
            });

        };

        const responseUser = await userPostService({ name, password });

        res.status(201).json(responseUser)

    } catch (error) {
        res.sendStatus(501)
        throw new Error("Problemas con el registro, comunicate con el admin");

    }

};

export { postUser }; */