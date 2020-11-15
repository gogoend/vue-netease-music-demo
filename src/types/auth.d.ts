export type AuthDialogType = 'login'|'reg'|'forget'

export interface LoginParams {
    password: string;
    md5_password?: string;
}

export interface PhoneLoginParams extends LoginParams{
    phone: string | number;
    countrycode?: string | number;
}

export interface EmailLoginParams extends LoginParams{
    email: string;
}