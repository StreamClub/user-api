import { photoRepository } from "@dal";
import { DomainException } from "@exceptions";

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

    public async failIfPhotoIsNotAvailable(photoId: number, levelNumber: number) {
        const photoLevel = this.getPhotoLevel(photoId);
        if (photoLevel > levelNumber) {
            throw new DomainException('La foto no está disponible para el nivel actual');
        }
    }

    private getPhotoLevel(photoId: number) {
        return Math.floor(photoId / 10);
    }
}

export const photoService = new PhotoService();