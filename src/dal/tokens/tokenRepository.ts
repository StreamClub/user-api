import { TokenModel } from './tokenModel';
import { Token } from '@entities';


class TokenRepository {
    public async save(token: Token) {
        await TokenModel.upsert(
            { ...token }
        );
    }

    public async findOneByEmail(email: string): Promise<Token | null> {
        const token = await TokenModel.findOne({ where: { email } });
        if (!token) return null;
        return new Token({
            ...token.toJSON(),
        });
    }

    public async deleteRefreshToken(email: string) {
        await TokenModel.destroy({
            where: { email },
        });
    }
}

export const tokenRepository = new TokenRepository();
