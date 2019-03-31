import mongoose from "mongoose";
import { HookNextFunction, MongooseDocument } from "mongoose";
import { arrayProp, instanceMethod, InstanceType, pre, prop, Typegoose } from "typegoose";
import IProject from "../../../shared/models/IProject";
import ITask from "../../../shared/models/ITask";
import Task from "./Task";

@pre<Project>("save", presave)
class Project extends Typegoose implements IProject {
    @prop()
    public shortName: string;

    @prop()
    public fullName: string;

    @arrayProp({ items: Task })
    public tasks: Task[];

    @prop()
    public lastUpdated: Date;

    /**
     * Adds a task to a project AND saves it.
     *
     * @param task {ITask} The task to add.
     */
    @instanceMethod
    public async addTask(this: InstanceType<Project>, task: Task): Promise<void> {
        this.tasks.push(task);
        await this.save();
    }

    /**
     * Removes a task from a project AND saves it.
     * @param task The task to remove
     */
    @instanceMethod
    public deleteTask(this: InstanceType<Project>, task: Task): void {
        this.tasks = this.tasks.filter((t) => t.uuid !== task.uuid);
        this.save();
    }
}

function presave(this: Project & MongooseDocument, next: HookNextFunction) {
    this.lastUpdated = new Date();
    next();
}

const ProjectTable = new Project().getModelForClass(Project);
export { Project, ProjectTable };
