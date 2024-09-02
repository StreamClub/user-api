import { Group } from "@entities";
import { GroupModel } from "./groupModel";
import { Op } from "sequelize";


class GroupRepository {
    public async getUserGroups(userId: number): Promise<any> {
        const groups = await GroupModel.findAll({
            where: {
                members: {
                    [Op.contains]: [userId]
                }
            }
        });
        return groups.map(group => new Group(group));
    }

    public async createGroup(members: number[], name: string): Promise<Group> {
        const created = await GroupModel.create({
            name,
            members
        });
        return new Group(created);
    }

}

export const groupRepository = new GroupRepository();
