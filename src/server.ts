import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";

import { PORT } from "./config/constants";
import { connectToDatabase } from "./config/dbConnection";

import userRoute from "./routes/user";

const app = express();

app.use(express.json());

const errorHandler = (err: ErrorRequestHandler, _: Request, res: Response) => {
  // if (res.headersSent) {
  //   return next(err)
  // }
  res.status(500);
  res.render("error", { error: err });
};

app.use("/api/user", userRoute);

app.get("/", (_, res) => {
  res.send("hello World");
});

app.use(errorHandler);

connectToDatabase((err, _) => {
  if (err) console.log(err);
  else {
    console.log("Connected to database");
    app.listen(PORT, () => console.log("server started at PORT : ", PORT));
  }
});
