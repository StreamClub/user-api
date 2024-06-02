import { LEVELS } from "@config";
import { LevelModel } from "./levelModel";
import { Op } from "sequelize";
import { UserLevel } from "@entities/userLevel";

class LevelRepository {

    public async initLevels(): Promise<void> {
        await LevelModel.truncate();
        await LevelModel.bulkCreate(LEVELS);
    }

    public async getUserLevel(points: number): Promise<any> {
        const level = await LevelModel.findOne(
            { where: { threshold: { [Op.lte]: points } }, order: [['threshold', 'DESC']] });
        const nextLevel = await LevelModel.findOne(
            { where: { threshold: { [Op.gt]: points } }, order: [['threshold', 'ASC']] });
        //TODO: manage case when user has reached the max level
        const userLevel = new UserLevel({ name: level.name, points: points });
        userLevel.setNextLevelThreshold(nextLevel.threshold);
        return userLevel;
    }
}

export const levelRepository = new LevelRepository();
