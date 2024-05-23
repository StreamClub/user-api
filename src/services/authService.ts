import { Credentials, LoginDto, RegisterUserDto, sendVerificationCodeDto } from "@dtos";
import { UnauthorizedException } from "@exceptions";
import { User, VerificationCode } from "@entities";
import { userRepository, verificationCodeRepository } from "@dal";
import { generate6digitNumber, generateUsername } from "@utils";
import { MailHandlerI } from "@handlers";
import AppDependencies from "appDependencies";
import { tokenService } from "./tokenService";

export class AuthService {
    private mailHandler: MailHandlerI
    public constructor(dependencies: AppDependencies) {
        this.mailHandler = dependencies.mailHandler;
    }

    public async register(
        userDto: RegisterUserDto,
    ): Promise<Credentials> {
        const hashedPassword = tokenService.hashPassword(userDto.password);
        const user = await userRepository.save(
            new User({
                ...userDto,
                password: hashedPassword,
            }),
        );
        user.userName = generateUsername(userDto.email, user.id);
        user.displayName = user.userName;
        await userRepository.update(Number(user.id), user);
        return tokenService.generateTokens(userDto.email, user.id);
    }

    public async login(userDto: LoginDto): Promise<Credentials> {
        const user = await userRepository.findOneByEmail(userDto.email);
        const isValidLogin =
            user && tokenService.isValidPassword(userDto.password, user.password);
        if (!isValidLogin) {
            throw new UnauthorizedException('Las credenciales ingresadas son incorrectas.');
        }
        return tokenService.generateTokens(userDto.email, user.id);
    }

    public async googleLogin(userDto: LoginDto): Promise<Credentials> {
        const user = await userRepository.findOneByEmail(userDto.email);
        if (!user) {
            const registerUserDto = {
                email: userDto.email,
                password: userDto.password, verificationCode: generate6digitNumber()
            };
            return this.register(registerUserDto);
        }
        return this.login(userDto);
    }

    public async sendVerificationCode(dto: sendVerificationCodeDto): Promise<void> {
        const verificationCode = generate6digitNumber();
        const verificationCodeEntity = new VerificationCode({ email: dto.email, verificationCode });
        this.mailHandler.sendMail(dto.email, verificationCode);
        await verificationCodeRepository.save(verificationCodeEntity);
        return;
    }
}
