import { PHOTOS } from "@config";
import { PhotoModel } from "./photoModel";

class PhotoRepository {

    public async initPhotos(): Promise<void> {
        await PhotoModel.truncate();
        await PhotoModel.bulkCreate(PHOTOS);
    }
}

export const photoRepository = new PhotoRepository();
