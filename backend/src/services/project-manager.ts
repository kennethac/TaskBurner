import { Project, ProjectTable } from "../models/Project";
import { User } from "../models/User";

export default class ProjectManager {
    public async addProject(owner: User, fullName: string, shortName: string) {
        const existingProject = await ProjectTable.findOne({ owner, shortName });
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

    public async getProject(owner: User, shortName: string) {
        return await ProjectTable.findOne({
            owner,
            shortName
        });
    }

    /**
     * Like getProject, but only returns something if that project has been updatd since the
     * lastUpdated parameter.
     * @param owner The username of the individual
     * @param shortName Project short name.
     * @param lastUpdated Only return a project if it has been updated since this time.
     */
    public async checkForUpdate(owner: User, shortName: string, lastUpdated: Date) {
        return await ProjectTable.findOne({
            owner,
            shortName,
            lastUpdated: {
                $gt: lastUpdated
            }
        });
    }

    public async getProjectList(owner: User) {
        return await ProjectTable.find({
            owner
        }, "shortName fullName");
    }
}
