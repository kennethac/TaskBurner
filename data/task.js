export default class Task {
    constructor(name, dueDate, scheduledDate, complete, uuid) {
        this.name = name;
        this.dueDate = dueDate;
        this.scheduledDate = scheduledDate;
        this.complete = complete;
        this.uuid = uuid;
    }
}