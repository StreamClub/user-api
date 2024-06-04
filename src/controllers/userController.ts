import { Request, Response } from '@models';
import { EditUserDto, GetProfileDto, GetUserNamesDto, SearchUserDto } from '@dtos';
import AppDependencies from 'appDependencies';
import { Profile } from '@entities';
import { NotFoundException } from '@exceptions';
import { pointService, userService } from '@services';

export class UserController {
    public constructor(dependencies: AppDependencies) {
    }

    public async searchUser(
        req: Request<SearchUserDto>,
    ): Promise<Profile[]> {
        const query = req.query.query as string;
        return await userService.searchUser(query);
    }

    public async get(
        req: Request<GetProfileDto>,
    ): Promise<Profile> {
        const userId = Number(req.params.userId);
        const userProfile = await userService.findById(userId);
        if (!userProfile) {
            throw new NotFoundException('El usuario no existe');
        }
        const level = await pointService.getUserLevel(userId);
        userProfile.setLevel(level);
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

    public async getUserNames(
        req: Request<GetUserNamesDto>,
    ): Promise<any> {
        const query = (req.query.userIds as string).split(',');
        const userIds = query.map((userId) => Number(userId));
        return await userService.getUserNames(userIds);
    }
}
