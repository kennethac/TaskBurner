import Task from './task';
import IProject from '../../../shared/models/IProject';
import IUser from '../../../shared/dist/models/IUser';

export default class Project implements IProject {
    _id?: any;
    shortName: string = "";
    public fullName: string = "";
    loading?: boolean;
    tasks: Array<Task> = [];
    lastUpdated: Date = new Date();
    owner!: IUser;

    addTask(task: import("../../../shared/models/ITask").default): void {
        throw new Error("Method not implemented.");
    }
    
    deleteTask(task: import("../../../shared/models/ITask").default): void {
        throw new Error("Method not implemented.");
    }
}