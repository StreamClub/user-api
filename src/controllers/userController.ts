// import { RequestDtos, ResponseDtos } from '@dtos';
import axios from 'axios';
import { Request } from '@models';
import { config } from '@config';
import { CreateUserDto, LoginDto } from '@dtos';

class UserController {


  public async register(
    req: Request<CreateUserDto>,
  ): Promise<any> {
    return;
  }

  public async login(
    req: Request<LoginDto>,
  ): Promise<any> {
    return;
  }
}

const userController = new UserController();

export { userController };
