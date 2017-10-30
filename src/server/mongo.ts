import { MongoClient, Db, Collection, ObjectID } from "mongodb";
import * as sharp from "sharp";

interface IMedia {
    photo: string;
    name: string;
    desc: string;
}

enum Collections {
    "media" = "media",
    "users" = "users"
}
export class Mongo {
    private static readonly LINK: string = "mongodb://mongo:27017";

    public static async initDb(): Promise<void> {
        await this.doDbOp(async db => {
            const cols: Collection[] = await db.collections();
            for (let collection in Collections) {
                // check namespace
                if (!cols.some(col => col.namespace === collection)) {
                    await db.createCollection(collection);
                }
            }
        });
    }

    private static async doDbOp<T>(op: (db: Db) => Promise<T>): Promise<T | any> {
        try {
            const db: Db = await MongoClient.connect(this.LINK);
            const res: T = await op(db);
            await db.close();
            return res;
        } catch(e) {
            console.log(e);
        }
    }

    public static async getMedia(): Promise<IMedia[]> {
        return this.doDbOp(async db => {
            const col: Collection = db.collection(Collections.media);
            return col.find({}).toArray();
        });
    }

    public static async addMedia(media: IMedia): Promise<void> {
        return this.doDbOp(async db => {
            const col: Collection = db.collection(Collections.media);
            media.photo = await this.convertImage(media.photo);
            return col.insertOne(media);
        });
    }

    private static async convertImage(data: string): Promise<string> {
        const imgMatch: RegExpMatchArray = data.match(/^(data:[A-Za-z-+\/]+;base64,)(.+)$/) as RegExpMatchArray;
        const prefix: string = imgMatch[1];
        const img: string = imgMatch[2];
        const buf: Buffer = await sharp(new Buffer(img, "base64")).webp().toBuffer();
        return "data:image/webp;base64," + buf.toString("base64");
    }

    public static async deleteMedia(_id: string): Promise<void> {
        return this.doDbOp(async db => {
            const col: Collection = db.collection(Collections.media);
            return col.remove({ _id: new ObjectID(_id) });
        });
    }
}
