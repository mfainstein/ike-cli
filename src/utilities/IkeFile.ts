declare var require:any;
import * as path from 'path';
export class IkeFile {
    private path:string;

    public constructor(path:string) {
        this.path = path;
    }

    public getAbsolutePath():string {
        return this.path;
    }

    public getName():string {
        let nameWithExtension:string = path.basename(this.path);
        let extension:string = path.extname(this.path);
        return nameWithExtension.replace(extension, "");
    }

    public getNameWithExtension(){
        return path.basename(this.path);
    }

    public getParentFile():IkeFile {
        let parentPath = path.dirname(this.path);
        return new IkeFile(parentPath);
    }

    public getExtension():string {
        return path.extname(this.path).slice(1);
    }

    public listFiles(filter?:(f:IkeFile)=>boolean):IkeFile[] {
        let fs:any = require('file-system');
        let paths:string[] = fs.readdirSync(this.path);
        let files:IkeFile[] = [];
        if (this.isDirectory()) {
            for (let fileName of paths) {
                let file = new IkeFile(this.path + "/" + fileName);
                if (filter && filter(file)){
                    files.push(file);
                }
                else {
                    if (!filter){
                        files.push(file);
                    }
                }
            }
        }
        return files;
    }

    public exists():boolean {
        let fs:any = require('file-system');
        return fs.existsSync(this.path);
    }

    public isDirectory() {
        let fs:any = require('file-system');
        return fs.lstatSync(this.path).isDirectory();
    }

}