import { MissingConfigValueException } from '@exceptions';
import dotenv from 'dotenv';

type Config = {
    port: number;
    tokenKey: string;
    refreshTokenKey: string;
    tokenLifeMinutes: number;
    refreshTokenLifeMinutes: number;
    dbUrl: string;
    senderEmail: string;
    senderPassword: string;
    verificationCodeLifeMinutes?: number;
    validationCodeCronExpression?: string;
};

dotenv.config();


export const config: Config = {
    port: Number(process.env.PORT) || 8080,
    tokenKey: process.env.TOKEN_KEY || 'secret',
    refreshTokenKey: process.env.REFRESH_TOKEN_KEY || 'secret',
    tokenLifeMinutes: Number(process.env.TOKEN_LIFE_MINUTES) || 5,
    refreshTokenLifeMinutes: Number(process.env.REFRESH_TOKEN_LIFE_MINUTES) || 10,
    dbUrl: process.env.DB_URL || 'YOUR_DB_URL',
    senderEmail: process.env.SENDER_EMAIL || 'YOUR_EMAIL',
    senderPassword: process.env.SENDER_PASSWORD || 'YOUR_PASSWORD',
    verificationCodeLifeMinutes: Number(process.env.VERIFICATION_CODE_LIFE_MINUTES) || 5,
    validationCodeCronExpression: process.env.VALIDATION_CODE_CRON_EXPRESSION || '*/5 * * * *',
};
