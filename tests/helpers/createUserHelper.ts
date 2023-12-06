import { userRepository } from "@dal";
import { User } from "@entities";
import { authService } from "@services";


export async function saveTestUser(email: string, password: string): Promise<void> {
    const hashedPassword = authService.hashPassword(password);
    await userRepository.save(new User({ email, password: hashedPassword }));
}
