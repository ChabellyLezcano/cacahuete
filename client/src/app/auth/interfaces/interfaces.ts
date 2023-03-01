export interface AuthResponse {
    ok: boolean;
    nombre?: string;
    email?: string;
    token?: string;
    msg?: string;
}

export interface Usuario {
    nombre: string;
    email: string;
}