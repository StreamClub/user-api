import { Request } from '@models';
import { RegisterUserDto, LoginDto, RefreshCredentialsDto, sendVerificationCodeDto } from '@dtos';
import { authService, userService } from '@services';
import { Credentials } from '@dtos';
import { tokenService } from '@services';
import AppDependencies from 'appDependencies';
import { MailInUseException } from '@exceptions';

export class AuthController {
  private authService: authService;
  private userService: userService;
  public constructor(dependencies: AppDependencies) {
    this.authService = new authService(dependencies);
    this.userService = new userService(dependencies);
  }


  public async register(
    req: Request<RegisterUserDto>,
  ): Promise<Credentials> {
    await tokenService.validateCode(req.body.email, req.body.verificationCode);
    await this.failIfMailIsInUse(req.body.email);
    return await this.authService.register(req.body);
  }

  public async login(
    req: Request<LoginDto>,
  ): Promise<Credentials> {
    return await this.authService.login(req.body);
  }

  public async refreshCredentials(req: Request<RefreshCredentialsDto>): Promise<Credentials> {
    return await tokenService.generateJWT(req.body.refreshToken);
  }

  public async sendVerificationCode(req: Request<sendVerificationCodeDto>): Promise<void> {
    await this.failIfMailIsInUse(req.body.email);
    return await this.authService.sendVerificationCode(req.body);
  }

  private async failIfMailIsInUse(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      throw new MailInUseException();
    }
  }

}
