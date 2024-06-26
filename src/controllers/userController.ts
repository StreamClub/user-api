import { Request, Response } from '@models';
import { EditUserDto, GetProfileDto, GetUserNamesDto, SearchUserDto } from '@dtos';
import AppDependencies from 'appDependencies';
import { Profile } from '@entities';
import { NotFoundException } from '@exceptions';
import { friendService, photoService, pointService, userService } from '@services';

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
        req: Request<GetProfileDto>, res: Response<any>,
    ): Promise<Profile> {
        const callerId = Number(res.locals.userId);
        const userId = Number(req.params.userId);
        const userProfile = await userService.findById(userId);
        if (!userProfile) {
            throw new NotFoundException('El usuario no existe');
        }
        const level = await pointService.getUserLevel(userId);
        userProfile.setLevel(level);
        const friendRequest = await friendService.getFriendRequest(callerId, userId);
        const friendship = await friendService.getFriendship(callerId, userId);
        userProfile.setFriendStatus(friendRequest, friendship);
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

    public async getPhotos(req: Request<any>, res: Response<any>): Promise<any> {
        const userId = Number(res.locals.userId);
        const level = await pointService.getUserLevel(userId)
        console.log(level.levelNumber)
        return await photoService.getPhotos(level.levelNumber)
    }
}
