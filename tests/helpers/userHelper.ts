import { userRepository } from "@dal";
import { Credentials } from "@dtos";
import { User } from "@entities";
import { tokenService } from "@services";


export async function saveTestUser(email: string, password: string): Promise<Credentials> {
    const hashedPassword = tokenService.hashPassword(password);
    const user = await userRepository.save(new User({ email, password: hashedPassword }));
    return tokenService.generateTokens(email, user.id)
}

export async function generateCredentials(email: string): Promise<Credentials> {
    const user = await userRepository.findOneByEmail(email);
    if (user) {
        return tokenService.generateTokens(email, user.id);
    }
}
