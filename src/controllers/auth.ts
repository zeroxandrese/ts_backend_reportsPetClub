import { Request, Response } from "express";
import { loginService } from "../services/login";

const authController = async (req: Request, res: Response) => {
    try {
        const { name, password } = req.body

        if (!name || !password || name === "" || password === "") {
            res.status(401).json({
                msg: "Información faltante"
            });

        };

        const responseLogin = await loginService({ name, password });

        if (responseLogin.message !== "LOGIN_SUCCESSFUL") {
            res.status(401).json({
                msg: "Problemas con el login, comunicate con el admin"
            })
        };

        res.status(201).json({
            responseLogin
        })

    } catch (error) {
        res.sendStatus(501)
        throw new Error("Problemas al conectar contacta al admin");

    }

};

export { authController };