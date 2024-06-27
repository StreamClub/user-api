import { PHOTOS } from "@config";
import { PhotoModel } from "./photoModel";

class PhotoRepository {

    public async initPhotos(): Promise<void> {
        await PhotoModel.truncate();
        await PhotoModel.bulkCreate(PHOTOS);
    }

    public async getPhotos(): Promise<PhotoModel[]> {
        return PhotoModel.findAll();
    }

}

export const photoRepository = new PhotoRepository();
