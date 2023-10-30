// import { RequestDtos, ResponseDtos } from '@dtos';
import { Request } from '@models';
import { RegisterUserDto, LoginDto } from '@dtos';
import { userService } from '@services';
import { Credentials } from '@dtos';

class UserController {

  public async register(
    req: Request<RegisterUserDto>,
  ): Promise<Credentials> {
    return await userService.register(req.body);
  }

  public async login(
    req: Request<LoginDto>,
  ): Promise<Credentials> {
    return await userService.login(req.body);
  }
}

const userController = new UserController();

export { userController };
