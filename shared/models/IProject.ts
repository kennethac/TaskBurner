import ITask from "./ITask";
import IUser from "./IUser";

export default interface IProject {
    shortName: string;
    owner: IUser;
    fullName: string;
    tasks: ITask[];
    lastUpdated: Date;
    addTask(task: ITask): void;
    deleteTask(task: ITask): void;
}
