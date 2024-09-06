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
