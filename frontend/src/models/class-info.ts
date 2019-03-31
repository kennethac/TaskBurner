import Task from './task';

export default interface ClassInfo {
    name: string,
    loading: boolean,
    tasks: Array<Task>,
    lastUpdated: Date
}