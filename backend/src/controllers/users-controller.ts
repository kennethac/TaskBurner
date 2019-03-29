import express from "express";
import { NextFunction, Request, Response } from "express";
import { InstanceType } from "typegoose";
import auth from "../auth/auth";
import { User, UserTable } from "../models/User";

class UsersController {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public async getCurrentUser(req: Request, res: Response, next: NextFunction) {
        const user = await UserTable.findOne({
            _id: req.params.user_id
        });

        if (!user) {
            return res.status(403).send({
                error: "Unauthenticated"
            });
        }

        return res.send(user);
    }

    public async register(req: Request, res: Response, next: NextFunction) {
        if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName) {
            return res.status(400).send({
                message: "Missing required information."
            });
        }

        try {
            const existingUser = await UserTable.findOne({
                email: req.body.email
            });

            if (existingUser) {
                return res.status(403).send({
                    message: "User already exists."
                });
            }

            const user = new UserTable({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
            });

            await user.save();
            this.logonUser(user, res);
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    public async logon(req: Request, res: Response, next: NextFunction) {
        if (!req.body.email || !req.body.password) {
            return res.sendStatus(400);
        }

        try {
            //  lookup user record
            const existingUser = await UserTable.findOne({
                email: req.body.email
            });

            if (!existingUser) {
                return res.status(403).send({
                    message: "username or password is wrong"
                });
            }

            // check password
            const matchingPassword = await existingUser.comparePassword(req.body.password);
            if (!matchingPassword) {
                return res.status(403).send({
                    error: "username or password is wrong"
                });
            }
            this.logonUser(existingUser, res);
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    public async logonUser(user: InstanceType<User>, res: Response) {
        const token = auth.generateToken({
            id: user._id
        }, "24h");

        user.removeOldTokens();
        user.addToken(token);
        await user.save();

        return res
            .cookie("token", token, {
                expires: new Date(Date.now() + 86400 * 1000)
            })
            .status(200).send({ user, token });
    }

    private initializeRoutes() {
        this.router.get("/", auth.verifyToken, this.getCurrentUser.bind(this));
        this.router.post("/register", this.register.bind(this));
        this.router.post("/login", this.logon.bind(this));
    }
}

export default UsersController;
