import { prop, Typegoose } from "typegoose";
import ITask from "../../../shared/models/ITAsk";

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

    @prop()
    public project?: import("../../../shared/models/IProject").default;

    public markComplete(): void {
        this.complete = true;
    }
}

export default Task;
