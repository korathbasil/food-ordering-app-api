import express from "express";

import { PORT } from "./config/constants";
import { connectToDatabase } from "./config/dbConnection";

import adminRoute from "./routes/admin";
import userRoute from "./routes/user";
import restaurantRoute from "./routes/restaurant";

const app = express();

app.use(express.json());

app.use("/api/user", userRoute);

app.use("/api/restaurant", restaurantRoute);

app.use("/admin", adminRoute);

app.get("/", (_, res) => {
  res.send("hello World");
});

connectToDatabase((err, _) => {
  if (err) console.log(err);
  else {
    console.log("Connected to database");
    app.listen(PORT, () => console.log("server started at PORT : ", PORT));
  }
});
