import * as express from "express";
import { join, normalize } from "path";
import * as exphbs from "express-handlebars";

interface ILocation {
    lng: number;
    lat: number;
    time: Date;
}

function fileFromRoot(...path: string[]): string {
    return normalize(join(__dirname, "..", "..", ...path));
}

class Server {
    private app: express.Application;
    private latestLocation: ILocation = {
        lng: -1.578,
        lat: 52.353,
        time: new Date()
    };

    constructor() {
        this.app = express();
        this.app.engine("hbs", exphbs({defaultLayout: "main.hbs", layoutsDir: fileFromRoot("views")}));
        this.app.set("view engine", "hbs");
        this.addRoutes();
    }

    public addRoutes(): void {
        this.app.get("/location/add", (req, res) => {
            const location: ILocation = {
                lng: req.params.lng,
                lat: req.params.lat,
                time: new Date()
            };
            this.addLocation(location);
        });
        this.app.get("/location", (req, res) => {
            res.json(this.latestLocation);
        });
        this.app.use(express.static(fileFromRoot("node_modules")));
        this.app.use("/", express.static(fileFromRoot("public")));
        this.app.use("/dist/app", express.static(fileFromRoot("dist", "app")));
        this.app.get("/node_modules/material-components-web/dist/material-components-web.css",
            (req, res) => res.sendFile(fileFromRoot("node_modules/material-components-web/dist/material-components-web.css")));
        this.app.get("/node_modules/material-components-web/dist/material-components-web.js",
            (req, res) => res.sendFile(fileFromRoot("node_modules/material-components-web/dist/material-components-web.js")));
        this.app.get("/", (req, res) => res.render("home"));
        this.app.get("/captured", (req, res) => res.render("captured"));
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
