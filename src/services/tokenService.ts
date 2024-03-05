import { config } from '@config';
import { Credentials } from '@dtos';
import { InvalidCodeException, UnauthorizedException } from '@exceptions';
import { tokenRepository, verificationCodeRepository } from '@dal';
import { DecodedRefreshToken, Token } from '@entities';
import jwt from 'jsonwebtoken';
import passwordHash from 'password-hash';
import { isCodeValid } from '@utils';
import { v1 } from 'uuid';
import { userService } from '@services';


class TokenService {

    public async generateJWT(receivedRefreshToken: string): Promise<Credentials> {
        const refreshTokenData = this.decodeRefreshToken(receivedRefreshToken, config.refreshTokenKey);
        const user = await userService.findById(Number(refreshTokenData.userId));
        if (!refreshTokenData) {
            throw new UnauthorizedException('El token de refresco es inválido');
        }
        const storedRefreshToken = await tokenRepository.findOneByEmail(
            user.email,
        );
        if (!storedRefreshToken) {
            throw new UnauthorizedException('El token de refresco no existe');
        }
        if (storedRefreshToken.refreshToken !== receivedRefreshToken) {
            throw new UnauthorizedException('El token de refresco no pertenece con ninguno usuario');
        }
        return await this.generateTokens(user.email, refreshTokenData.userId);
    }

    private decodeRefreshToken(token: string, tokenKey: string): DecodedRefreshToken {
        try {
            return jwt.verify(token, tokenKey) as {
                userId: string;
                uuid: string;
            };
        } catch (error) {
            throw new UnauthorizedException('El token es inválido')
        }
    }

    public async generateTokens(email: string, userId: string): Promise<Credentials> {
        const token = jwt.sign({ email, userId, uuid: v1() }, config.tokenKey, {
            expiresIn: `${config.tokenLifeMinutes * 60}s`,
        });
        const refreshTokenValue = jwt.sign(
            { userId, uuid: v1() },
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
        if (!verificationCode || verificationCode.verificationCode !== code || !isCodeValid(verificationCode.updatedAt)) {
            throw new InvalidCodeException();
        }
        return;
    }

    public async deleteExpiredVerificationCodes(): Promise<void> {
        return verificationCodeRepository.deleteExpiredVerificationCodes();
    }
}

export const tokenService = new TokenService();
