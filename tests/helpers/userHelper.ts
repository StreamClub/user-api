import { userRepository } from "@dal";
import { Credentials } from "@dtos";
import { User } from "@entities";
import { tokenService } from "@services";


export async function saveTestUser(email: string, password: string): Promise<Credentials> {
    const hashedPassword = tokenService.hashPassword(password);
    await userRepository.save(new User({ email, password: hashedPassword }));
    return tokenService.generateTokens(email)
}

export async function generateCredentials(email: string): Promise<Credentials> {
    if (await userRepository.findOneByEmail(email)) {
        return tokenService.generateTokens(email);
    }
}
