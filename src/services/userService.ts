import { userRepository } from "@dal";
import AppDependencies from "appDependencies";
import { User } from "@entities";

export class userService {
    public constructor(dependencies: AppDependencies) {
    }

    public async findUserByEmail(email: string): Promise<User> {
        return await userRepository.findOneByEmail(email);
    }

}
