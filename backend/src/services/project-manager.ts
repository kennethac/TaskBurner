import { Project, ProjectTable } from "../models/Project";

export default class ProjectManager {
    public async addProject(fullName: string, shortName: string) {
        const existingProject = await ProjectTable.findOne({ shortName });
        if (existingProject) {
// tslint:disable-next-line: no-console
            console.log(existingProject);
            throw new Error("A project with that short name already exists.");
        }
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

    /**
     * Like getProject, but only returns something if that project has been updatd since the
     * lastUpdated parameter.
     * @param shortName Project short name.
     * @param lastUpdated Only return a project if it has been updated since this time.
     */
    public async checkForUpdate(shortName: string, lastUpdated: Date) {
        return await ProjectTable.findOne({
            shortName,
            lastUpdated: {
                $gt: lastUpdated
            }
        });
    }

    public async getProjectList() {
        return await ProjectTable.find({}, "shortName fullName");
    }
}
