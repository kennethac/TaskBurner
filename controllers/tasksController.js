"use strict";

var TaskExports = require('../data/tasks');
var Project = TaskExports.Project;
var allProjects = TaskExports.allProjects;

class TasksController {
    _getProject(proj) {
        var classKey = proj;
        var classData = undefined;
        if (classKey == "all") {
            classData = new Project("All Tasks", []);
            Object.keys(allProjects).map((k) => allProjects[k]).reduce((acc, next) => classData.tasks  = classData.tasks.concat(next.tasks));
        } else {
            classData = allProjects[classKey];
        }

        return classData;
    }

    project(req, res) {
        console.log("Hello?");
        res.send(this._getProject(req.params["project"]));
    }
}

module.exports = TasksController;