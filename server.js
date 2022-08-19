import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
