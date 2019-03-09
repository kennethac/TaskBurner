"use strict";

class Task {
    constructor(name, dueDate, scheduledDate, complete) {
        this.name = name;
        this.dueDate = dueDate;
        this.scheduledDate = scheduledDate;
        this.complete = complete;
    }
}

class Project {
    constructor(name, tasks, lastUpdated) {
        this.name = name;
        this.tasks = tasks;
        this.lastUpdated = lastUpdated;
    }
}

Date.prototype.addDays = function (days) {
    return new Date(this.valueOf() + days * 864e5);
}

Date.prototype.isThisWeek = function() {
    return this < new Date().setHours(0).addDays(7);
}

function newDummyProject(name, numTasks) {

    let newTasks = [];
    for (var i = 0; i < numTasks; ++i) {
        let taskName = ` ${name.split(' ')[0]} ${i}`;
        let dueDate = new Date().addDays(1 + i);
        let scheduledDate = new Date().addDays(i);
        let complete = Math.random() > 0.5;
        newTasks.push(new Task(taskName, dueDate, scheduledDate, complete));
    }
    let lastUpdate = new Date(2019, 2, 1);
    return new Project(name, newTasks, lastUpdate);
}

let allProjects = {
    "english": newDummyProject("English 316", 12),
    "math": newDummyProject("Math 313", 15),
    "web": new newDummyProject("CS 260", 5)
}

module.exports = { allProjects, Task, Project };