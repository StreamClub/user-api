import { Request } from '@models';
import { RegisterUserDto } from '@dtos';
import { userService } from '@services';
import AppDependencies from 'appDependencies';
import { User } from '@entities';
import { NotFoundException } from '@exceptions';

export class UserController {
    private userService: userService;
    public constructor(dependencies: AppDependencies) {
        this.userService = new userService(dependencies);
    }

    public async get(
        req: Request<RegisterUserDto>,
    ): Promise<User> {
        const userId = Number(req.params.userId);
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new NotFoundException('El usuario no existe');
        }
        return user;
    }
}
