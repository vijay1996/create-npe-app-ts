import express, {} from "express";
import { Connection } from "@vbr96/easypg/lib";
import { config } from "dotenv";
import bodyParser from  "body-parser"
import cors from "cors";
import activateEndpoints from "./routes/route";
import session from "express-session";

config({path: `${__dirname}/../.env`});

const app = express();
app.use(express.json());
app.use(cors({origin: [process.env.UI_ENDPOINT as string]}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

const port = process.env.PORT || "3000";

let connection:Connection = new Connection(process.env.DATABASE_URL as string, process.env.DB_LOGGING == "true");

activateEndpoints(app, connection);

app.listen(port, (): void => {
    console.log(`Server is running at port ${port}`);
});