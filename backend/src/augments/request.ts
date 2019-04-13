import { Request } from "express";
import { InstanceType } from "typegoose";
import { Project } from "../models/Project";
import { User } from "../models/User";

declare module "express" {
// tslint:disable-next-line: interface-name
    interface Request {
        user?: InstanceType<User>;
        user_id?: string;
        token?: string;
        project?: InstanceType<Project>;
    }
}
