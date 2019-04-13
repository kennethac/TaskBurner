import { NextFunction, Request, Response, Router } from "express";
import uuid = require("uuid");
import Task from "../models/Task";
import ProjectManager from "../services/project-manager";

class ProjectsController {
    public router = Router();
    private manager = new ProjectManager();

    constructor() {
        this.initializeRoutes();
    }

    public async addProject(req: Request, res: Response, next: NextFunction) {
        // Get the project
        if (!req.body.fullName || !req.body.shortName) {
            return res.status(400).send({
                message: "Missing required information."
            });
        }

        let newProject;
        try {
            newProject = await this.manager.addProject(req.user, req.body.fullName, req.body.shortName);
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }

        res.send(newProject);
    }

    public async getProject(req: Request, res: Response, next: NextFunction) {
        res.send(req.project);
    }

    public async getProjectList(req: Request, res: Response, next: NextFunction) {
        return res.send(await this.manager.getProjectList(req.user));
    }

    public async addTask(req: Request, res: Response, next: NextFunction) {
        const project = req.project;

        if (!req.body.name) {
            return res.status(400).send({
                message: "Missing required information."
            });
        }

        const newTask = new Task();
        newTask.name = req.body.name;
        newTask.dueDate = req.body.dueDate;
        newTask.scheduledDate = req.body.scheduledDate;
        newTask.complete = false;
        newTask.uuid = uuid.v4();

        // tslint:disable-next-line: no-console
        console.log("Before");
        await project.addTask(newTask);
        // tslint:disable-next-line: no-console
        console.log("AFter");
        return res.send(newTask);
    }

    public async deleteTask(req: Request, res: Response, next: NextFunction) {
        const project = req.project;

        if (!req.body.uuid) {
            return res.status(400).send({
                message: "Missing required information."
            });
        }

        project.deleteTask({ uuid: req.body.uuid } as Task);

        res.send("OK");
    }

    public async complete(req: Request, res: Response, next: NextFunction) {
        const project = req.project;

        // tslint:disable-next-line: no-console
        console.log(req.body);
        if (!req.body.uuid || req.body.complete === undefined) {
            return res.status(400).send({
                message: "Missing required information."
            });
        }

        await project.markTaskComplete(req.body.uuid, req.body.complete);

        res.send("OK");
    }

    private initializeRoutes() {
        const grabProjectBound = this.grabProject.bind(this);
        this.router.get("/", this.getProjectList.bind(this));
        this.router.post("/create", this.addProject.bind(this));
        this.router.post("/:shortName/add", grabProjectBound, this.addTask.bind(this));
        this.router.get("/:shortName/", grabProjectBound, this.getProject.bind(this));
        this.router.delete("/:shortName/delete", grabProjectBound, this.deleteTask.bind(this));
        this.router.post("/:shortName/complete", grabProjectBound, this.complete.bind(this));
    }

    private async grabProject(req: Request, res: Response, next: NextFunction) {
        if (!req.params.shortName) {
            return res.status(400).send({
                message: "Missing project short name"
            });
        }

        const requestedProject = await this.manager.getProject(req.user, req.params.shortName);

        if (requestedProject == null) {
            return res.status(400).send({
                message: "Project not found."
            });
        }

        req.project = requestedProject;

        next();
    }
}

export default ProjectsController;
