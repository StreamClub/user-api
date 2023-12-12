import { Request } from '@models';
import { RegisterUserDto, LoginDto, RefreshCredentialsDto, sendVerificationCodeDto } from '@dtos';
import { authService } from '@services';
import { Credentials } from '@dtos';
import { tokenService } from '@services';
import AppDependencies from 'appDependencies';

export class AuthController {
  private userService: authService;
  public constructor(dependencies: AppDependencies) {
    this.userService = new authService(dependencies);
  }


  public async register(
    req: Request<RegisterUserDto>,
  ): Promise<Credentials> {
    await tokenService.validateCode(req.body.email, req.body.verificationCode);
    return await this.userService.register(req.body);
  }

  public async login(
    req: Request<LoginDto>,
  ): Promise<Credentials> {
    return await this.userService.login(req.body);
  }

  public async refreshCredentials(req: Request<RefreshCredentialsDto>): Promise<Credentials> {
    return await tokenService.generateJWT(req.body.refreshToken);
  }

  public async sendVerificationCode(req: Request<sendVerificationCodeDto>): Promise<void> {
    return await this.userService.sendVerificationCode(req.body);
  }

}
