import {KeyValueDatabaseDimension} from "./KeyValueDatabaseDimension";

export interface KeyValueDatabase {

    put(dimension: KeyValueDatabaseDimension, value: any, uniqueId?: string): Promise<any>;

    get(dimension: KeyValueDatabaseDimension, uniqueId?: string): Promise<any>;

    getAll(dimension: KeyValueDatabaseDimension): Promise<any[]>;

}