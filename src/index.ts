import express, {} from "express";
import { Connection } from "@vbr96/easypg/lib";
import { config } from "dotenv";

config({path: `${__dirname}/../.env`});
import activateEndpoints from "./routes/route";

const app = express();
app.use(express.json());
const port = process.env.PORT || "3000";

let connection:Connection = new Connection(process.env.DATABASE_URL as string, process.env.DB_LOGGING == "true");

activateEndpoints(app, connection);

app.listen(port, (): void => {
    console.log(`Server is running at port ${port}`);
});