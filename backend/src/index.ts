import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import createError from "http-errors";
import mongoose from "mongoose";
import logger from "morgan";
import ProjectsController from "./controllers/projects-controller";
import UsersController from "./controllers/users-controller";
import { Project } from "./models/Project";

// connect to the database
mongoose.connect("mongodb://localhost:27017/taskburner", {
  useNewUrlParser: true
});

const app = express();

const UserController = new UsersController();
const ProjectController = new ProjectsController();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (app.get("env") === "development") {
  app.use(cors());
}

app.use("/users", UserController.router);
app.use("/projects", ProjectController.router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// app.use(function(err, req: Request, res: Response) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

app.listen(8089);
