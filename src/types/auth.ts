
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

export type OtpForm = {
    email: string;
    password: string;
    otp: string;
}

export interface OtpData {
    email: string;
    password: string;
}

export type SignInForm = {
    email: string;
    password: string;
}
