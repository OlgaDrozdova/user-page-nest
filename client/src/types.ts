export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
}

export interface UserUpdate {
    name?: string;
    surname?: string;
}

export enum AuthMode {
    LogIn,
    Registration,
}

export interface UserRegistration {
    name: string;
    surname: string;
    email: string;
    password: string;
}

export interface UserLogIn {
    email: string;
    password: string;
}