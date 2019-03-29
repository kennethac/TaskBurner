import mongoose from "mongoose";
import { HookNextFunction, MongooseDocument } from "mongoose";
import { arrayProp, instanceMethod, pre, prop, Typegoose, InstanceType } from "typegoose";
import IProject from "../../../shared/models/IProject";
import ITask from "../../../shared/models/ITask";
import Task from "./Task";

const SALT_WORK_FACTOR = 10;

class Project extends Typegoose implements IProject {
    @prop()
    public shortName: string;

    @prop()
    public fullName: string;

    @arrayProp({items: Task})
    public tasks: Task[];

    /**
     * Adds a task to a project AND saves it.
     *
     * @param task {ITask} The task to add.
     */
    public addTask(this: InstanceType<Project>, task: Task): void {
        this.tasks.push(task);
        this.save();
    }

    /**
     * Removes a task from a project AND saves it.
     * @param task The task to remove
     */
    public deleteTask(this: InstanceType<Project>, task: Task): void {
        this.tasks = this.tasks.filter((t) => t.uuid !== task.uuid);
        this.save();
    }
}

const ProjectTable = new Project().getModelForClass(Project);
export { Project, ProjectTable };
