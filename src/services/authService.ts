import { config } from '@config';
import { Credentials } from '@dtos';
import { InvalidCodeException, UnauthorizedException } from '@exceptions';
import { tokenRepository, verificationCodeRepository } from 'dal';
import { Token } from 'entities';
import jwt from 'jsonwebtoken';
import passwordHash from 'password-hash';
import { v1 } from 'uuid';


class AuthService {

    public async generateJWT(receivedRefreshToken: string): Promise<Credentials> {
        const refreshTokenData = jwt.verify(
            receivedRefreshToken,
            config.refreshTokenKey,
        ) as { email: string; uuid: string };
        if (!refreshTokenData) {
            throw new UnauthorizedException('Invalid refresh token');
        }
        const storedRefreshToken = await tokenRepository.findOneByEmail(
            refreshTokenData.email,
        );
        if (!storedRefreshToken) {
            throw new UnauthorizedException('Refresh token does not exist');
        }
        if (storedRefreshToken.refreshToken !== receivedRefreshToken) {
            throw new UnauthorizedException('Refresh token not related to user');
        }
        return this.generateTokens(refreshTokenData.email);
    }

    public async generateTokens(email: string): Promise<Credentials> {
        const token = jwt.sign({ email, uuid: v1() }, config.tokenKey, {
            expiresIn: `${config.tokenLifeMinutes * 60}s`,
        });
        const refreshTokenValue = jwt.sign(
            { email, uuid: v1() },
            config.refreshTokenKey,
            {
                expiresIn: `${config.refreshTokenLifeMinutes * 60}s`,
            },
        );
        const refreshToken = new Token({
            email,
            refreshToken: refreshTokenValue,
        });
        await tokenRepository.save(refreshToken);
        return { token, refreshToken: refreshTokenValue };
    }

    public async deleteRefreshToken(email: string) {
        return tokenRepository.deleteRefreshToken(email);
    }

    public hashPassword(password: string): string {
        return passwordHash.generate(password, {
            algorithm: 'sha256',
            iterations: 5,
            saltLength: 10,
        });
    }

    public isValidPassword(password: string, hashedPassword: string): boolean {
        return passwordHash.verify(password, hashedPassword);
    }

    public async validateCode(email: string, code: number): Promise<void> {
        const verificationCode = await verificationCodeRepository.findOneByEmail(email);
        if (!verificationCode || verificationCode.verificationCode !== code) {
            throw new InvalidCodeException();
        }
        return;
    }
}

export const authService = new AuthService();
