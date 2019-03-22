var express = require('express');
var TasksController = require('../controllers/tasksController');
var router = express.Router();

/* Get tasks listings */

var controller = new TasksController();

router.get('/list', function(req, res, next) {
    controller.listProjects(req, res);
});

/**
 * Creates a new project
 */
router.post('/new', function (req, res, next) {
    controller.addProject(req, res);
});

router.get('/:project', function(req, res, next) {
    // res.send("nothing...");
    controller.project(req, res);
});

// Adds a new task to a project.
router.post('/:project', function(req, res, next) {
    controller.addTask(req, res);
});

router.put('/:project/:task', function (req, res, next) {
    controller.updateTask(req, res);
});

module.exports = router;