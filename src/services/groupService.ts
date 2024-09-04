
import { groupRepository } from "@dal";
import { Group, Page } from "@entities";


class GroupService {
    public async getUserGroups(userId: number): Promise<any> {
        return await groupRepository.getUserGroups(userId);
    }

    public async createGroup(members: number[], name: string): Promise<Group> {
        return await groupRepository.createGroup(members, name);
    }

    public async getGroup(userId: number, groupId: number): Promise<Group> {
        return await groupRepository.getGroup(userId, groupId);
    }

    public async getAllGroups(pageNumber: number, pageSize: number): Promise<Page> {
        return await groupRepository.getAllGroups(pageNumber, pageSize);
    }

    public async deleteGroup(userId: number, groupId: number): Promise<void> {
        return await groupRepository.deleteGroup(userId, groupId);
    }

}

export const groupService = new GroupService();