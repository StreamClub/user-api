import { pointRepository } from "@dal";


class PointService {

    public async addPoints(userId: number, amount: number): Promise<void> {
        return await pointRepository.addPoints(userId, amount);
    }

}

export const pointService = new PointService();