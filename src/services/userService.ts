import { Credentials, LoginDto, RegisterUserDto, sendVerificationCodeDto } from "@dtos";
import { DomainException, NotFoundException } from "@exceptions";
import { authService } from "./authService";
import { User, VerificationCode } from "@entities";
import { userRepository, verificationCodeRepository } from "@dal";
import { generate6digitNumber } from "@utils";
import { MailHandlerI } from "@handlers";
import AppDependencies from "appDependencies";

export class UserService {
    private mailHandler: MailHandlerI
    public constructor(dependencies: AppDependencies) {
        this.mailHandler = dependencies.mailHandler;
    }

    public async register(
        userDto: RegisterUserDto,
    ): Promise<Credentials> {
        //TODO: Crear un user name en base al mail del usuario. Agarrar el correo y pasarlo
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

    public async sendVerificationCode(dto: sendVerificationCodeDto): Promise<void> {
        const verificationCode = generate6digitNumber();
        const verificationCodeEntity = new VerificationCode({ email: dto.email, verificationCode });
        this.mailHandler.sendMail(dto.email, verificationCode);
        await verificationCodeRepository.save(verificationCodeEntity);
        return;
    }
}
