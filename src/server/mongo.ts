import { MongoClient, Db, Collection } from "mongodb";

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
    private static readonly LINK: string = "mongodb://localhost:27017";

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

    private static async doDbOp<T>(op: (db: Db) => Promise<T>): Promise<T> {
        const db: Db = await MongoClient.connect(this.LINK);;
        const res: T = await op(db);
        await db.close();
        return res;
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
            await col.insertOne(media);
        });
    }
}
