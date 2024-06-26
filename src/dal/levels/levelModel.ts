import { DataTypes, Model, Sequelize } from "sequelize";

class LevelModel extends Model {
    declare threshold: number;
    declare name: string;
    declare levelNumber: number;
}

export function initLevelModel(dbConnection: Sequelize) {
    LevelModel.init({
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        threshold: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        levelNumber: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        }
    }, {
        sequelize: dbConnection,
        modelName: "Level"
    });

    LevelModel.sync();
}


export { LevelModel };
