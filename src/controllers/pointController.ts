import { AddPointsDto } from '@dtos';
import { Request, Response } from '@models';
import { pointService } from '@services';
import AppDependencies from 'appDependencies';

export class PointController {
    public constructor(dependencies: AppDependencies) {
    }

    public async addPoints(req: Request<AddPointsDto>, res: Response<any>): Promise<void> {
        const userId = Number(res.locals.userId);
        const amount = req.body.amount;
        return await pointService.addPoints(userId, amount);
    }
}