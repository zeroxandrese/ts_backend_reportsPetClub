

export interface User {
    id: string;
    name: string;
    password?: string | null;
};

export interface loginAuth {
    name: string;
    password: string;
};

export interface JwtPayload {
    id: string;
};

export interface genericIdProps {
    id: string;
}

export interface BusinessRegisterProps {
    latitude: number,
    typeUser: string,
    name: string,
    longitude: number,
    weekOpening: string,
    weekClosing: string,
    dateAttentionWeek: string,
    weekendOpening: string,
    weekendClosing: string,
    email?: string,
    dateAttentionWeekend: string,
    phone: number,
    file: {
        buffer: Buffer,
        originalname: string,
    }
}
