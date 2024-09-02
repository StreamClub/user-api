
import { groupRepository } from "@dal";
import { Group } from "@entities";


class GroupService {
    public async getUserGroups(userId: number): Promise<any> {
        return await groupRepository.getUserGroups(userId);
    }

    public async createGroup(members: number[], name: string): Promise<Group> {
        return await groupRepository.createGroup(members, name);
    }

    public async deleteGroup(userId: number, groupId: number): Promise<void> {
        return await groupRepository.deleteGroup(userId, groupId);
    }

}

export const groupService = new GroupService();