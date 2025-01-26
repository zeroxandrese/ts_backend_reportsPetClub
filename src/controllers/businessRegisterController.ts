import { Request, Response } from "express";
import { businessRegisterGetService, businessRegisterPostService, businessRegisterPutService } from '../services/businessRegisterService';

const businessRegisterGetController = async (req: Request, res: Response) => {

    try {
        const responseBusinessRegister = await businessRegisterGetService();

        res.status(201).json(responseBusinessRegister)

    } catch (error) {
        throw new Error("Problemas con el registro, comunicate con el admin");
    }
};

const businessRegisterPostController = async (req: Request, res: Response) => {

    const { latitude,
        typeUser,
        name,
        longitude,
        weekOpening,
        weekClosing,
        dateAttentionWeek,
        weekendOpening,
        weekendClosing,
        email,
        dateAttentionWeekend,
        phone } = req.body

    try {

        if (!req.file) {
            return res.status(400).json({ msg: "Archivo de imagen faltante" });
        }

        if (!typeUser || !name || !latitude || !longitude || !weekOpening || !weekClosing || !dateAttentionWeek || !weekendOpening || !weekendClosing || !dateAttentionWeekend || !phone) {
            return res.status(401).json({ msg: "Información faltante" });
        }

        const { originalname, mimetype, buffer } = req.file;

        const longitudeParse = parseFloat(longitude);
        const latitudeParse = parseFloat(latitude);
        const phoneParse = parseFloat(phone);

        const responseBusinessRegister = await businessRegisterPostService({
            latitude: latitudeParse,
            typeUser,
            name,
            longitude: longitudeParse,
            weekOpening,
            weekClosing,
            dateAttentionWeek,
            weekendOpening,
            weekendClosing,
            email,
            dateAttentionWeekend,
            phone: phoneParse,
            file: {
                buffer,
                originalname,
              }
        });

        res.status(201).json(responseBusinessRegister)

    } catch (error) {
        throw new Error("Problemas con el registro, comunicate con el admin");
    }
};

const businessRegisterPutController = async (req: Request, res: Response) => {

    const id = req.params.id;

    try {

        if (!id || id === "") {
            res.status(401).json({
                msg: "Información faltante"
            });

        };

        const responseBusinessRegister = await businessRegisterPutService({ id });

        res.status(201).json(responseBusinessRegister)

    } catch (error) {
        throw new Error("Problemas con el registro, comunicate con el admin");
    }
};

export { businessRegisterGetController, businessRegisterPostController, businessRegisterPutController };