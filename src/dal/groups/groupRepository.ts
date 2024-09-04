import { Group, Page } from "@entities";
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
        return { groups: groups.map(group => new Group(group)) };
    }

    public async createGroup(members: number[], name: string): Promise<Group> {
        const created = await GroupModel.create({
            name,
            members
        });
        return new Group(created);
    }

    public async getGroup(userId: number, groupId: number): Promise<Group> {
        const group = await GroupModel.findOne({
            where: {
                id: groupId,
                members: {
                    [Op.contains]: [userId]
                }
            }
        });
        if (!group) {
            throw new Error("Group not found");
        }
        return new Group(group);
    }

    public async getAllGroups(pageNumber: number, pageSize: number): Promise<Page> {
        const { rows, count } = await GroupModel.findAndCountAll();
        const groups = rows.map(group => new Group(group));
        return new Page(pageNumber, pageSize, count, groups);
    }

    public async deleteGroup(userId: number, groupId: number): Promise<void> {
        await GroupModel.destroy({
            where: {
                id: groupId,
                members: {
                    [Op.contains]: [userId]
                }
            }
        });
    }

}

export const groupRepository = new GroupRepository();
