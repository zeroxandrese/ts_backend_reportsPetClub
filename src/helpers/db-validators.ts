import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Esquemas Zod para validar parámetros
const idSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");
const stringSchema = z.string();
const emailSchema = z.string().email();

const findIdBusinessRegister = async (id = "") => {

    const validated = idSchema.parse(id);
    const missingId = await prisma.registerBusiness.findUnique({ where: { uid: validated } });
    if (!missingId) {
        throw new Error('El id no se encuentra registrado');
    }
};

export { findIdBusinessRegister };