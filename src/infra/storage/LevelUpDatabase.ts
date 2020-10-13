import levelup from 'levelup'
import leveldown, {LevelDown} from 'leveldown'
import encode from 'encoding-down'
import {KeyValueDatabase} from "./KeyValueDatabase";
import {injectable} from "inversify";
import LevelUp from "levelup";
import {KeyValueDatabaseDimension} from "./KeyValueDatabaseDimension";
import {Files} from "../../utilities/Files";

@injectable()
export class LevelUpDatabase implements KeyValueDatabase {

    private static DATABASE_FILE_NAME = "database";
    //private readonly adapter: low.AdapterSync<JsonDatabaseSchema>;
    private db: any;

    constructor() {
        //this.adapter = new FileSync<JsonDatabaseSchema>(JsonDatabaseImpl.DATABASE_FILE_NAME);
        let databasePath:string = Files.file(LevelUpDatabase.DATABASE_FILE_NAME).getAbsolutePath();
        this.db = levelup(encode(leveldown(databasePath), {valueEncoding: 'json'}));
    }

    get(dimension: KeyValueDatabaseDimension, uniqueId?: string): Promise<any> {
        if (uniqueId) {
            return this.db.get(dimension + ":" + uniqueId);
        } else {
            return this.db.get(dimension);
        }

    }

    getAll(dimension: KeyValueDatabaseDimension): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            let allValues: any[] = [];
            this.db.createReadStream({
                gte: dimension,
                lte: String.fromCharCode(dimension.charCodeAt(0) + 1)
            }).on('data', function (data: any) {
                allValues.push(data.value);
            }).on('error', function (error: any) {
                reject(error)
            }).on('close', function () {
                resolve(allValues);
            }).on('end', function () {
                resolve(allValues);
            })
        });

    }

    put(dimension: KeyValueDatabaseDimension, value: any, uniqueId?: string): Promise<any> {
        if (uniqueId) {
            return this.db.put(dimension + ":" + uniqueId, value);
        } else {
            return this.db.put(dimension, value);
        }
    }


}