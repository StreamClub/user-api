import { Request } from '@models';
import { GetProfileDto, RegisterUserDto } from '@dtos';
import { UserService } from '@services';
import AppDependencies from 'appDependencies';
import { Profile, User } from '@entities';
import { NotFoundException } from '@exceptions';

export class UserController {
    private userService: UserService;
    public constructor(dependencies: AppDependencies) {
        this.userService = new UserService(dependencies);
    }

    public async get(
        req: Request<GetProfileDto>,
    ): Promise<Profile> {
        const userId = Number(req.params.userId);
        const userProfile = await this.userService.findById(userId);
        if (!userProfile) {
            throw new NotFoundException('El usuario no existe');
        }
        return userProfile;
    }
}
