import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { HookNextFunction, MongooseDocument } from "mongoose";
import { instanceMethod, pre, prop, Typegoose } from "typegoose";
import IUser from "../../../shared/models/IUser";
import auth from "../auth/auth";

const SALT_WORK_FACTOR = 10;

@pre<User>("save", presave)
class User extends Typegoose implements IUser {

    @prop()
    public email?: string;

    @prop()
    public firstName?: string;

    @prop()
    public lastName?: string;

    @prop()
    public password?: string;

    @prop()
    public tokens: string[] = [];

    // Instance Methods
    @instanceMethod
    public async comparePassword(this: User, password: string) {
        try {
            const isMatch = await bcrypt.compare(password, this.password);
            return isMatch;
        } catch (error) {
            return false;
        }
    }

    /**
     * Returns the model as JSON, but pulls out the sensitive data (password, tokens, etc)
     * @param this The context.
     */
    @instanceMethod
    public toJSON(this: User & MongooseDocument) {
        const obj = this.toObject();
        delete obj.password;
        delete obj.tokens;
        return obj;
    }

    @instanceMethod
    public addToken(token: string) {
        this.tokens.push(token);
    }

    @instanceMethod
    public removeToken(token: string) {
        this.tokens = this.tokens.filter((t) => t != token);
    }

    @instanceMethod
    public removeOldTokens() {
        this.tokens = auth.removeOldTokens(this.tokens);
    }
}

async function presave(this: User & MongooseDocument, next: HookNextFunction) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        // generate a salt
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

        // hash the password along with our new salt
        const hash = await bcrypt.hash(this.password, salt);

        // override the plaintext password with the hashed one
        this.password = hash;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const UserTable = new User().getModelForClass(User);
export  { User, UserTable }