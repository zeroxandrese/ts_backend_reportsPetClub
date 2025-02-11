import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { v2 as cloudinary } from 'cloudinary';

import { genericIdProps, BusinessRegisterProps } from "../interface/interface";

const prisma = new PrismaClient();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_name,
    api_key: process.env.CLOUDINARY_apikey,
    api_secret: process.env.CLOUDINARY_apisecret,
    secure: true
});

const businessRegisterGetService = async () => {
    try {

        const result = await prisma.registerBusiness.findMany({
            where: {
                approved: false
            }
        })

        return result

    } catch (error) {
        throw new Error("Error con el tokenget consulta al admin");
    }
};

const businessRegisterPostService = async ({
    typeUser,
    name,
    latitude,
    longitude,
    file,
    weekOpening,
    weekClosing,
    dateAttentionWeek,
    weekendOpening,
    weekendClosing,
    dateAttentionWeekend,
    phone,
    email,
}: BusinessRegisterProps) => {
    try {

        if (
            typeUser !== "Refugio" &&
            typeUser !== "CenterVet" &&
            typeUser !== "Petshop" &&
            typeUser !== "Event"
        ) {
            throw new Error("El valor de typeUser es inválido.");
        }

        const tempDir = path.join(__dirname, "../../temp");
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        // UIID temporal
        const tempFilename = `${uuidv4()}-${file.originalname}`;
        const tempFilePath = path.join(__dirname, "../../temp", tempFilename);

        fs.writeFileSync(tempFilePath, file.buffer);

        // Carga de imagen a cloudinary
        const imageUploadResult = await cloudinary.uploader.upload(tempFilePath, {
            transformation: {
                aspect_ratio: "1.0",
                height: 506,
                crop: "fill",
                gravity: "auto",
                quality: "auto",
                fetch_format: "auto",
            },
            folder: "BusinessRegister",
        });

        // Delete al archivo temp
        fs.unlinkSync(tempFilePath);

        const newBusiness = {
            latitude,
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
            phone,
            image: imageUploadResult.secure_url,
            created: new Date(),
            lastUpdated: new Date(),
            status: true,
        };

        const result = await prisma.registerBusiness.create({
            data: newBusiness,
        });

        return {
            message: "Negocio registrado exitosamente",
            data: result,
        };
    } catch (error) {
        console.error("Error en el servicio:", error);

        throw new Error("Error con el registro, consulta al admin.");
    }
};

const businessRegisterPutService = async ({ id }: genericIdProps) => {
    try {

        const result = await prisma.registerBusiness.update({
            where: {
                uid: id,
                approved: false
            },
            data: {
                approved: true
            }
        })

        return result

    } catch (error) {
        throw new Error("Error con el tokenget consulta al admin");
    }
};

export { businessRegisterPostService, businessRegisterGetService, businessRegisterPutService };