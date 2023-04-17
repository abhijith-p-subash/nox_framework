import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import helmet from "helmet";

const swaggerFile = require("../swagger_output.json");

import routes from "./api/routes";

import sequelizeConnection from "./config/database";
import mongoConnection from "./config/mongo";
import redisClient from "./config/redis";
import passport from "passport";
import { jwtAuth } from "./api/modules/auth/jwt/jwt.strategy";
import { localAuth } from "./api/modules/auth/local/local.strategy";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("public"));
passport.use(jwtAuth);
passport.use(localAuth);
app.use(passport.initialize());
//app.use(passport.session());

app.use(routes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.get("/", (req: Request, res: Response) => {
  res.render("home", {
    message: "Welcome to NOX_Framework v0.1.1",
    version: process.env.VERSION,
  });
});

const start = async (): Promise<void> => {
  try {
    await sequelizeConnection
      .sync()
      .then(() => console.log("\x1b[32m", "mySql Connected"));
    await mongoConnection().then(() =>
      console.log("\x1b[32m", "MogoDB Connected")
    );
    await redisClient.connect().then(() => {
      console.log("\x1b[32m", "Redis Client Connected");
    });
    app.listen(port, () => {
      console.log(
        "\x1b[32m",
        `⚡️[server]: Server is running at https://localhost:${port}`
      );
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
