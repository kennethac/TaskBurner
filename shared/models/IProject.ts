import ITask from "./ITask";

export default interface IProject {
    shortName: string;
    fullName: string;
    tasks: ITask[];

    addTask(task: ITask): void;
    deleteTask(task: ITask): void;
}
