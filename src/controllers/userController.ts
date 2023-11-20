import { Request } from '@models';
import { RegisterUserDto, LoginDto, RefreshCredentialsDto, sendVerificationCodeDto } from '@dtos';
import { userService } from '@services';
import { Credentials } from '@dtos';
import { authService } from '@services';

class UserController {

  public async register(
    req: Request<RegisterUserDto>,
  ): Promise<Credentials> {
    await authService.validateCode(req.body.email, req.body.validationCode);
    return await userService.register(req.body);
  }

  public async login(
    req: Request<LoginDto>,
  ): Promise<Credentials> {
    return await userService.login(req.body);
  }

  public async refreshCredentials(req: Request<RefreshCredentialsDto>): Promise<Credentials> {
    return await authService.generateJWT(req.body.refreshToken);
  }

  public async sendVerificationCode(req: Request<sendVerificationCodeDto>): Promise<void> {
    return await userService.sendVerificationCode(req.body);
  }

}

const userController = new UserController();

export { userController };
