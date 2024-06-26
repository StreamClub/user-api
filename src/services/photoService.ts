import { userRepository, friendRepository, levelRepository } from "@dal";
import { Profile, User } from "@entities";
import { NotFoundException } from "@exceptions";

class PhotoService {
    public async getPhotos(levelNumber: number) {
    }
}

export const photoService = new PhotoService();