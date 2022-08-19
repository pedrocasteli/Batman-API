import express from "express";
import morgan from "morgan";
import "dotenv/config";

import heroRouter from "./routes/heroRoutes.js";
import villainRouter from "./routes/villainRoutes.js";

const app = express();

// 1) Middlewares ################################################################################################

app.use(morgan("dev"));

app.use(express.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// 3) Routes ##############################################################################################

app.use("/api/v1/heroes", heroRouter);
app.use("/api/v1/villains", villainRouter);

// 3) Start server ########################################################################################

export default app;
