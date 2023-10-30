import { MissingConfigValueException } from '@exceptions';
import dotenv from 'dotenv';

type Config = {
    port: number;
    tokenKey: string;
    refreshTokenKey: string;
    tokenLifeMinutes: number;
    refreshTokenLifeMinutes: number;
    dbUrl: string;
};

dotenv.config();


export const config: Config = {
    port: Number(process.env.PORT) || 8080,
    tokenKey: getConfigValue('TOKEN_KEY'),
    refreshTokenKey: getConfigValue('REFRESH_TOKEN_KEY'),
    tokenLifeMinutes: Number(getConfigValue('TOKEN_LIFE_MINUTES')),
    refreshTokenLifeMinutes: Number(getConfigValue('REFRESH_TOKEN_LIFE_MINUTES')),
    dbUrl: getConfigValue('DB_URL'),
};

function getConfigValue(key: string): string {
    const value = process.env[key];
    if (!value) {
        throw new MissingConfigValueException(
            `Missing config value for attribute ${key}`,
        );
    }
    return value;
}
