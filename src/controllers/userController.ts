import { Request, Response } from '@models';
import { EditUserDto, GetProfileDto, GetUserNamesDto, SearchUserDto } from '@dtos';
import AppDependencies from 'appDependencies';
import { FriendRequest, Page, Profile } from '@entities';
import { DomainException, NotFoundException } from '@exceptions';
import { userService } from '@services';

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

    public async sendFriendRequest(
        req: Request<GetProfileDto>, res: Response<any>,
    ): Promise<FriendRequest> {
        const senderId = Number(res.locals.userId);
        const receiverId = Number(req.params.userId);
        if (senderId === receiverId) {
            throw new DomainException('No puedes enviarte una solicitud de amistad a ti mismo');
        }
        return await userService.sendFriendRequest(senderId, receiverId);
    }

    public async getFriendRequest(req: Request, res: Response<any>): Promise<Page> {
        const pageSize = Number(req.query.pageSize) || 20;
        const pageNumber = Number(req.query.page) || 1;
        const userId = Number(res.locals.userId);
        return await userService.getFriendRequest(userId, pageNumber, pageSize);
    }

    public async deleteFriendRequest(
        req: Request, res: Response<any>,
    ): Promise<void> {
        const userId = Number(res.locals.userId);
        const friendRequestId = Number(req.params.friendRequestId);
        await userService.deleteFriendRequest(userId, friendRequestId);
    }
}
