import { DataTypes, Model, Sequelize } from "sequelize";

class PhotoModel extends Model {
    declare photoId: string;
}

export function initPhotoModel(dbConnection: Sequelize) {
    PhotoModel.init({
        photoId: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
    }, {
        sequelize: dbConnection,
        modelName: "Photo"
    });

    PhotoModel.sync();
}


export { PhotoModel };
