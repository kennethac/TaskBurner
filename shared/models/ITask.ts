import IProject from "./IProject";

export default interface ITask {
    uuid?: string;
    name?: string;
    dueDate?: Date;
    scheduledDate?: Date;
    complete?: boolean;
    lastUpdated: Date;
    project?: IProject;

    markComplete(): void;
}
