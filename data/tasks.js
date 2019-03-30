"use strict";
import Task from './task'
import Project from './project'

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