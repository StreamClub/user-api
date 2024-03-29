import { Request, Response } from '@models';
import { EditUserDto, GetProfileDto } from '@dtos';
import AppDependencies from 'appDependencies';
import { Profile } from '@entities';
import { NotFoundException } from '@exceptions';
import { userService } from '@services';

export class UserController {
    public constructor(dependencies: AppDependencies) {
    }

    public async get(
        req: Request<GetProfileDto>,
    ): Promise<Profile> {
        const userId = Number(req.params.userId);
        const userProfile = await userService.findById(userId);
        if (!userProfile) {
            throw new NotFoundException('El usuario no existe');
        }
        return userProfile;
    }

    public async update(
        req: Request<EditUserDto>,
        res: Response<any>,
    ): Promise<Profile> {
        const userId = Number(res.locals.userId);
        const newUserData = req.body;
        const userProfile = await userService.update(userId, newUserData);
        return userProfile;
    }
}
