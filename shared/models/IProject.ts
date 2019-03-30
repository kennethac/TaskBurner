import ITask from "./ITask";

export default interface IProject {
    shortName: string;
    fullName: string;
    tasks: ITask[];
    lastUpdated: Date;
    addTask(task: ITask): void;
    deleteTask(task: ITask): void;
}
