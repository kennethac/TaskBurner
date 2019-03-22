"use strict";

const uuid4 = require("uuid/v4");
var TaskExports = require('../data/tasks');
var Project = TaskExports.Project;
var Task = TaskExports.Task;
var allProjects = TaskExports.allProjects;

Date.prototype.isThisWeek = function () {
    return this < new Date().addDays(7);
}

class TasksController {
    _getProject(proj) {
        var classKey = proj;
        var classData = undefined;
        if (classKey == "all") {
            classData = new Project("All Tasks", []);
            Object.keys(allProjects).map((k) => allProjects[k]).reduce((acc, next) => classData.tasks = classData.tasks.concat(next.tasks));
        } else if (classKey === "week") {
            classData = new Project("This Week", []);
            Object.keys(allProjects)
                .map((k) => allProjects[k])
                .reduce((acc, next) => classData.tasks = classData.tasks.concat(next.tasks));

            classData.tasks = classData.tasks.filter(t => t.dueDate.isThisWeek() && t.scheduledDate.isThisWeek());
        }
        else {
            classData = allProjects[classKey];
        }

        return classData;
    }

    project(req, res) {
        res.send(this._getProject(req.params["project"]));
    }

    listProjects(req, res) {
        res.send(JSON.stringify({
            classList: Object.keys(allProjects)
        }));
    }
    addProject(req, res) {
        let shortName = req.body.shortName;
        let longName = req.body.longName;

        // check shortname collision.
        if (allProjects[shortName] !== undefined) {
            res.sendStatus(500);
            return;
        }

        allProjects[shortName] = new Project(longName, [], Date.now);
        res.send(JSON.stringify({
            success: true
        }));
    }

    addTask(req, res) {
        let projectShortName = req.params.project;

        if (allProjects[shortName] === undefined) {
            res.sendStatus(500);
            return;
        }

        let taskName = req.body.name;
        let dueDate = new Date(req.body.dueDate);
        let scheduledDate = new Date(req.body.scheduledDate);
        let uuid = uuid4();
        allProjects[shortName].tasks.push(new Task(taskName, dueDate, scheduledDate, false, uuid));

        res.send(JSON.stringify({
            success: true,
            taskUuid: uuid
        }));
    }

    updateTask(req, res) {
        let projectShortName = req.params.project;
        let taskUuid = req.params.task;

        if (allProjects[shortName] === undefined) {
            res.sendStatus(500);
            return;
        }

        let task = _findTask(projectShortName, taskUuid);

        if (task === undefined) {
            res.sendStatus(500);
            return;
        }

        let taskStatus = req.body.completed;

        task.completed = taskStatus;

        res.send(JSON.stringify({
            success: true
        }))
    }

    _findTask(projectName, taskUuid) {
        let tasks = allProjects[projectName].tasks;
        for (var task of tasks) {
            if (task.uuid === taskUuid) {
                return task;
            }
        }

        return undefined;
    }

}

module.exports = TasksController;