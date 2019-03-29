import { InstanceType } from "typegoose";
import auth from "../auth/auth";
import { User, UserTable } from "../models/User";

export default class UserManager {
    public getUser(email: string) {
        return UserTable.findOne({ email });
    }

    public async addUser(email: string, password: string, firstName: string, lastName: string) {
        const newUser = new UserTable({
            email, password, firstName, lastName
        });

        await newUser.save();
    }

    public async loginUser(user: InstanceType<User>): Promise<string> {
        const newToken = auth.generateToken({
            id: user
        }, "24h");

        user.removeOldTokens();
        user.addToken(newToken);
        await user.save();
        return newToken;
    }
}