import { userRepository } from "@dal";
import AppDependencies from "appDependencies";
import { Profile, User } from "@entities";

export class UserService {
    public constructor(dependencies: AppDependencies) {
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
}
