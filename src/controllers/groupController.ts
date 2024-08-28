import AppDependencies from 'appDependencies';
import { Request, Response } from '@models';

export class GroupController {
    public constructor(dependencies: AppDependencies) {
    }

    public async getUserGroups(req: Request, res: Response<any>): Promise<any> {
        return Promise.resolve();
    }

}
