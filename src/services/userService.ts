import { LoginDto, RegisterUserDto } from "@dtos";
import { DomainException, NotFoundException } from "@exceptions";
import { authService } from "./authService";
import { User } from "@entities";
import { userRepository } from "@dal";


class UserService {
    public async register(
        userDto: RegisterUserDto,
    ): Promise<{ token: string; refreshToken: string }> {
        const userAlreadyExists =
            (await userRepository.findOneByEmail(userDto.email)) !== null;
        if (userAlreadyExists) {
            throw new DomainException('The email is already in use');
        }
        const hashedPassword = authService.hashPassword(userDto.password);
        await userRepository.save(
            new User({
                ...userDto,
                password: hashedPassword,
            }),
        );
        return authService.generateTokens(userDto.email);
    }
}

export const userService = new UserService();
