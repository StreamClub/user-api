import { PointModel } from "./pointModel";
import { MAX_POINTS } from "@config";

class PointRepository {

    public async addPoints(userId: number, amount: number): Promise<void> {
        const point = await PointModel.findOne({ where: { userId } });
        if (!point) {
            const pointsToAdd = Math.min(amount, MAX_POINTS);
            await PointModel.create({ userId, amount: pointsToAdd });
        } else {
            const pointsToAdd = Math.min(amount + point.amount, MAX_POINTS);
            await PointModel.update({ amount: pointsToAdd }, { where: { userId } });
        }
    }

    public async getUserPoints(userId: number): Promise<number> {
        const point = await PointModel.findOne({ where: { userId } });
        return point ? point.amount : 0;
    }

}

export const pointRepository = new PointRepository();
