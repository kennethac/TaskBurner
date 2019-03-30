import { Project, ProjectTable } from "../models/Project";

export default class ProjectManager {
    public async addProject(fullName: string, shortName: string) {
        const newProject = new ProjectTable({
            shortName, fullName
        });

        await newProject.save();
        return newProject;
    }

    public async getProject(shortName: string) {
        return await ProjectTable.findOne({
            shortName
        });
    }

    public async getProjectList() {
        return await ProjectTable.find({}, "shortName fullName");
    }
}
