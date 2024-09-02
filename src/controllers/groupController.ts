import AppDependencies from 'appDependencies';
import { Request, Response } from '@models';
import { groupService } from '@services';
import { CreateGroupDto } from '@dtos';
import { Group } from '@entities';

export class GroupController {
    public constructor(dependencies: AppDependencies) {
    }

    public async getUserGroups(req: Request, res: Response<any>): Promise<any> {
        const userId = Number(res.locals.userId);
        return await groupService.getUserGroups(userId);
    }

    public async createGroup(req: Request<CreateGroupDto>, res: Response<any>): Promise<Group> {
        const userId = Number(res.locals.userId);
        const { name, members } = req.body;
        const allMembers = members.concat(userId);
        return await groupService.createGroup(allMembers, name);
    }

    public async deleteGroup(req: Request, res: Response<any>): Promise<void> {
        const userId = Number(res.locals.userId);
        const groupId = Number(req.params.id);
        return await groupService.deleteGroup(userId, groupId);
    }

}
