import { userRepository } from "@dal";
import { Profile, User } from "@entities";

class UserService {
    public async findByEmail(email: string): Promise<User> {
        return await userRepository.findOneByEmail(email);
    }

    public async findById(id: number): Promise<Profile> {
        const user = await userRepository.findOneById(id);
        if (!user) {
            return null;
        }
        delete user.password;
        return new Profile(user);
    }
}

export const userService = new UserService();