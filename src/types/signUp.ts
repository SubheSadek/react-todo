
export type SignUpForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    address?: string;
}

export type SignUpErrors = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    address?: string;
}