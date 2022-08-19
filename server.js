import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
    })
    .then((con) => console.log("DB connection successful!"));

const heroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [
            true,
            "How can a hero exist without a name that strikes fear into the hearts of enemies?",
        ],
        unique: true,
    },
    real_name: {
        type: String,
        required: [
            true,
            "Human or otherwise, it's gotta have an actual name, right?",
        ],
    },
    gender: { type: String, default: "Unknown/Irrelevant" },
    base_of_operation: { type: String, default: "Unknown/Irrelevant" },
});

const Hero = mongoose.model("Heroes", heroSchema);

const heroDocument = new Hero({
    name: "Nightwing",
    real_name: "Dick Grayson",
    gender: "male",
    base_of_operation: "Bludhaven",
});

heroDocument
    .save()
    .then()
    .catch((e) => console.log(e));

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
