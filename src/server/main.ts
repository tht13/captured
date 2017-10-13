import * as express from "express";
import { join, normalize } from "path";

interface ILocation {
    x: number;
    y: number;
    time: Date;
}

function fileFromRoot(...path: string[]): string {
    return normalize(join(__dirname, "..", "..", ...path));
}

class Server {
    private app: express.Application;
    private latestLocation: ILocation;

    constructor() {
        this.app = express();
        this.addRoutes();
    }

    public addRoutes(): void {
        this.app.get("/addLocation", (req, res) => {
            const location: ILocation = {
                x: req.params.x,
                y: req.params.y,
                time: new Date()
            };
            this.addLocation(location);
        });
        this.app.use(express.static(fileFromRoot("node_modules")));
        this.app.use(express.static(fileFromRoot("public")));
        this.app.use("/dist/app", express.static(fileFromRoot("dist", "app")));
        this.app.get("/node_modules/material-components-web/dist/material-components-web.css",
            (req, res) => res.sendFile(fileFromRoot("node_modules/material-components-web/dist/material-components-web.css")));
            this.app.get("/node_modules/material-components-web/dist/material-components-web.js",
                (req, res) => res.sendFile(fileFromRoot("node_modules/material-components-web/dist/material-components-web.js")));
        this.app.get("/", (req, res) => res.sendFile(fileFromRoot("public", "index.html")));
    }

    private addLocation(location: ILocation): void {
        const newDate: Date = new Date();
        if (newDate.valueOf() - location.time.valueOf() < 5 * 60 * 1000) {
            return;
        }
        this.latestLocation = location;
        this.broadcastLocation();
    }

    private broadcastLocation(): void {

    }

    public start(): void {
        this.app.listen(3000);
    }
}

const server: Server = new Server();
server.start();
