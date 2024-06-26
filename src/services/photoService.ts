import { photoRepository } from "@dal";

class PhotoService {
    public async getPhotos(levelNumber: number) {
        const photos = await photoRepository.getPhotos();
        return photos.map((photo) => {
            const photoLevel = this.getPhotoLevel(photo.photoId);
            return {
                id: photo.photoId,
                available: photoLevel <= levelNumber,
            }
        });
    }

    private getPhotoLevel(photoId: number) {
        return Math.floor(photoId / 10);
    }
}

export const photoService = new PhotoService();