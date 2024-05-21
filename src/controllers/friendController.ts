import { Request, Response } from '@models';
import { GetProfileDto } from '@dtos';
import AppDependencies from 'appDependencies';
import { FriendRequest, Page } from '@entities';
import { DomainException } from '@exceptions';
import { friendService } from '@services';

export class FriendController {
    public constructor(dependencies: AppDependencies) {
    }

    public async getFriendList(req: Request, res: Response<any>): Promise<Page> {
        const pageSize = Number(req.query.pageSize) || 20;
        const pageNumber = Number(req.query.page) || 1;
        const userId = Number(res.locals.userId);
        return await friendService.getFriendList(userId, pageNumber, pageSize);
    }

    public async sendFriendRequest(
        req: Request<GetProfileDto>, res: Response<any>,
    ): Promise<FriendRequest> {
        const senderId = Number(res.locals.userId);
        const receiverId = Number(req.params.userId);
        if (senderId === receiverId) {
            throw new DomainException('No puedes enviarte una solicitud de amistad a ti mismo');
        }
        return await friendService.sendFriendRequest(senderId, receiverId);
    }

    public async getFriendRequest(req: Request, res: Response<any>): Promise<Page> {
        const pageSize = Number(req.query.pageSize) || 20;
        const pageNumber = Number(req.query.page) || 1;
        const userId = Number(res.locals.userId);
        return await friendService.getFriendRequest(userId, pageNumber, pageSize);
    }

    public async deleteFriendRequest(
        req: Request, res: Response<any>,
    ): Promise<void> {
        const userId = Number(res.locals.userId);
        const friendRequestId = Number(req.params.requestId);
        const action = req.body.action;
        await friendService.deleteFriendRequest(userId, friendRequestId, action);
    }

    public async deleteFriend(req: Request, res: Response<any>): Promise<void> {
        const userId = Number(res.locals.userId);
        const friendId = Number(req.params.userId);
        await friendService.deleteFriend(userId, friendId);
    }
}
