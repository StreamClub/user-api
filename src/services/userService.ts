import { userRepository } from "@dal";
import AppDependencies from "appDependencies";
import { User } from "@entities";

export class userService {
    public constructor(dependencies: AppDependencies) {
    }

    public async findByEmail(email: string): Promise<User> {
        return await userRepository.findOneByEmail(email);
    }

    public async findById(id: number): Promise<User> {
        return await userRepository.findOneById(id);
    }
}
