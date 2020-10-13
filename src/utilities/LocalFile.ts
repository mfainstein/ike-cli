import {Files} from "./Files";

declare var require: any;
import * as path from 'path';

export class LocalFile {
    private path: string;

    public constructor(path: string) {
        this.path = path;
    }

    public getPath(): string {
        return this.path;
    }

    public getAbsolutePath(): string {
        return Files.combinePaths(Files.getRootPath(), this.path);
    }

    public getName(): string {
        let nameWithExtension: string = path.basename(this.path);
        let extension: string = path.extname(this.path);
        return nameWithExtension.replace(extension, "");
    }

    public getNameWithExtension() {
        return path.basename(this.path);
    }

    public getParentFile(): LocalFile {
        let parentPath = path.dirname(this.path);
        return new LocalFile(parentPath);
    }

    public getExtension(): string {
        return path.extname(this.path).slice(1);
    }

    public listFiles(filter?: (f: LocalFile) => boolean): LocalFile[] {
        let fs: any = require('fs');
        let paths: string[] = fs.readdirSync(this.path);
        let files: LocalFile[] = [];
        if (this.isDirectory()) {
            for (let fileName of paths) {
                let file = new LocalFile(this.path + "/" + fileName);
                if (filter && filter(file)) {
                    files.push(file);
                } else {
                    if (!filter) {
                        files.push(file);
                    }
                }
            }
        }
        return files;
    }

    public exists(): boolean {
        let fs: any = require('fs');
        return fs.existsSync(this.path);
    }

    public isDirectory() {
        let fs: any = require('fs');
        return fs.lstatSync(this.path).isDirectory();
    }

}