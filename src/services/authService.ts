import { Credentials, LoginDto, RegisterUserDto, sendVerificationCodeDto } from "@dtos";
import { DomainException, UnauthorizedException } from "@exceptions";
import { tokenService } from "./tokenService";
import { User, VerificationCode } from "@entities";
import { userRepository, verificationCodeRepository } from "@dal";
import { generate6digitNumber } from "@utils";
import { MailHandlerI } from "@handlers";
import AppDependencies from "appDependencies";

export class authService {
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
            throw new DomainException('El correo ingresado ya se encuentra registrado.');
        }
        const hashedPassword = tokenService.hashPassword(userDto.password);
        await userRepository.save(
            new User({
                ...userDto,
                password: hashedPassword,
            }),
        );
        return tokenService.generateTokens(userDto.email);
    }

    public async login(
        userDto: LoginDto,
    ): Promise<Credentials> {
        const user = await userRepository.findOneByEmail(userDto.email);
        const isValidLogin =
            user && tokenService.isValidPassword(userDto.password, user.password);
        if (!isValidLogin) {
            throw new UnauthorizedException('Las credenciales ingresadas son incorrectas.');
        }
        return tokenService.generateTokens(userDto.email);
    }

    public async sendVerificationCode(dto: sendVerificationCodeDto): Promise<void> {
        const verificationCode = generate6digitNumber();
        const verificationCodeEntity = new VerificationCode({ email: dto.email, verificationCode });
        this.mailHandler.sendMail(dto.email, verificationCode);
        await verificationCodeRepository.save(verificationCodeEntity);
        return;
    }
}
