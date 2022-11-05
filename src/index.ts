import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import swaggerUi from 'swagger-ui-express';
const swaggerFile = require('../swagger_output.json')

import routes from "./api/routes";

import sequelizeConnection from "./config/database";
import mongoConnection from "./config/mongo";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
// app.use(bodyParser.json());

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
  res.send("Express + TypeScript Server😊😊😊");
});

const start = async (): Promise<void> => {
  try {
    await sequelizeConnection
      .sync()
      .then(() => console.log("\x1b[32m", "mySql Connected"));
    await mongoConnection().then(() =>
      console.log("\x1b[32m", "MogoDB Connected")
    );
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
