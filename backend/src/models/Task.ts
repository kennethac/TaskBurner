import { HookNextFunction, MongooseDocument } from "mongoose";
import { pre, prop, Ref, Typegoose } from "typegoose";
import ITask from "../../../shared/models/ITAsk";
import { Project } from "./Project";

@pre<Task>("save", presave)
class Task extends Typegoose implements ITask {
    @prop()
    public uuid?: string;

    @prop()
    public name?: string;

    @prop()
    public dueDate?: Date;

    @prop()
    public scheduledDate?: Date;

    @prop()
    public complete?: boolean;

    @prop({ ref: Project })
    public projectRef?: Ref<Project>;

    get project(): Project {
        if (this.projectRef instanceof Project) {
            return this.projectRef;
        } else {
            return undefined;
        }
    }

    @prop()
    public lastUpdated: Date;

    public markComplete(): void {
        this.complete = true;
    }
}

async function presave(this: Task & MongooseDocument, next: HookNextFunction) {
    this.lastUpdated = new Date();
    await this.execPopulate();
    (this.projectRef as Project).lastUpdated = this.lastUpdated;
    // Do I have to save the project?
}

export default Task;
