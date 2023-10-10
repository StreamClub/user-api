// import { RequestDtos, ResponseDtos } from '@dtos';
import axios from 'axios';
import { Request } from '@models';
import { config } from '@config';
import { RegisterUserDto, LoginDto } from '@dtos';
import { userService } from '@services';

class UserController {


  public async register(
    req: Request<RegisterUserDto>,
  ): Promise<any> {
    return await userService.register(req.body);
  }

  public async login(
    req: Request<LoginDto>,
  ): Promise<any> {
    return;
  }
}

const userController = new UserController();

export { userController };
