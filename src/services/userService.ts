import { Credentials, LoginDto, RegisterUserDto } from "@dtos";
import { DomainException, NotFoundException } from "@exceptions";
import { authService } from "./authService";
import { User } from "@entities";
import { userRepository } from "@dal";


class UserService {
    public async register(
        userDto: RegisterUserDto,
    ): Promise<Credentials> {
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

    public async login(
        userDto: LoginDto,
    ): Promise<Credentials> {
        const user = await userRepository.findOneByEmail(userDto.email);
        const isValidLogin =
            user && authService.isValidPassword(userDto.password, user.password);
        if (!isValidLogin) {
            throw new NotFoundException('Invalid credentials');
        }
        return authService.generateTokens(userDto.email);
    }
}

export const userService = new UserService();
