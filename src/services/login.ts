import { PrismaClient } from "@prisma/client";
import * as bcryptjs from 'bcryptjs';

import { generateJwt } from '../helpers/generate-jwt';
import { loginAuth } from '../interface/interface'

const prisma = new PrismaClient

const loginService = async ({ name, password }: loginAuth) => {
    try {
        const user = await prisma.user.findUnique({
            where: { Name: name }
        });

        if (!user) {
            return { message: "USER_DOESN'T_EXIST" };
        }

        // Validación password
        if (!user.Password) {
            return { message: "PASS_DOESN'T_EXIST" };
        }

        const findPassword = bcryptjs.compareSync(password, user.Password);
        if (!findPassword) {
            return { message: "PASS_INCORRECT" };
        }

        // Generar JWT
        const token = await generateJwt(user.id);

        // Copia del usuario sin la propiedad password
        const { Password: userPassword, ...userWithoutPassword } = user;

        return {
            user: userWithoutPassword,
            token,
            message: "LOGIN_SUCCESSFUL"
        };

    } catch (err) {
        throw new Error("Error en el servicio del login");
    }
};

export { loginService };