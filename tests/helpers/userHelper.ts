import { userRepository } from "@dal";
import { Credentials } from "@dtos";
import { AuthService, tokenService } from "@services";
import { appDependencies } from "../setup/testsSetup";


export async function saveTestUser(email: string, password: string): Promise<Credentials> {
    const authService = new AuthService(appDependencies);
    const registerUser = { email, password, verificationCode: 123456 };
    return await authService.register(registerUser);
}

export async function generateCredentials(email: string): Promise<Credentials> {
    const user = await userRepository.findOneByEmail(email);
    if (user) {
        return tokenService.generateTokens(email, user.id);
    }
}
