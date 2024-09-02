import { DataTypes, Model, Sequelize } from "sequelize";

class GroupModel extends Model {
    declare name: string;
    declare members: number[];
}

export function initGroupModel(dbConnection: Sequelize) {
    GroupModel.init({
        name: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
        },
        members: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false,
        }
    }, {
        sequelize: dbConnection,
        modelName: "Group"
    });
    GroupModel.sync();
}


export { GroupModel };
