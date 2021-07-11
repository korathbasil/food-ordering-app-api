import express from "express";

import { PORT } from "./config/constants";

const app = express();

app.listen(PORT, () => console.log("server started at PORT : ", PORT));
