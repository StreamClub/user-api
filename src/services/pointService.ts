import { levelRepository, pointRepository } from "@dal";


class PointService {

    public async addPoints(userId: number, amount: number): Promise<void> {
        return await pointRepository.addPoints(userId, amount);
    }

    public async getUserLevel(userId: number): Promise<any> {
        const points = await pointRepository.getUserPoints(userId);
        return await levelRepository.getUserLevel(points);
    }

}

export const pointService = new PointService();