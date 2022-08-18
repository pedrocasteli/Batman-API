import express from "express";
import "dotenv/config";

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "You can GET to this endpoint...",
        app: "Batman-API",
    });
});

app.post("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "You can POST to this endpoint...",
        app: "Batman-API",
    });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
