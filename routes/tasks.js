var express = require('express');
var TasksController = require('../controllers/tasksController');
var router = express.Router();

/* Get tasks listings */

var controller = new TasksController();

router.get('/:project', function(req, res, next) {
    // res.send("nothing...");
    controller.project(req, res);
});

module.exports = router;