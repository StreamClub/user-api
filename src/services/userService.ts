import { userRepository } from "@dal";
import { Profile, User } from "@entities";
import { NotFoundException } from "@exceptions";

class UserService {

    public async searchUser(query: string): Promise<Profile[]> {
        const users = await userRepository.search(query);
        return users.map((user) => {
            delete user.password;
            return new Profile(user);
        });
    }

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

    public async update(userId: number, newUserData: Partial<User>): Promise<Profile> {
        const user = await userRepository.update(userId, newUserData);
        if (!user) {
            throw new NotFoundException('El usuario no existe');
        }
        delete user.password;
        return new Profile(user);
    }

    public async getUserNames(userIds: number[]): Promise<any> {
        const users = await userRepository.findManyByIds(userIds);
        return users.map((user) => {
            return {
                id: user.id,
                userName: user.userName,
            };
        });
    }
}

export const userService = new UserService();