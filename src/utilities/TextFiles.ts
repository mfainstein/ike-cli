import {LocalFile} from "./LocalFile"

declare var require: any;

export class TextFiles {

    private static stringifyIfNeeded(content: any) {
        let stringContent: string;
        if (typeof content == "string") {
            stringContent = content;
        } else {
            stringContent = JSON.stringify(content, null, 4);
        }


        return stringContent;
    }

    private static writeFileContent(file: LocalFile, content: string) {
        let fs: any = require('fs');
        let mkdirp: any = require('mkdirp');
        //TODO: better with fs
        mkdirp.sync(file.getParentFile().getAbsolutePath());
        fs.writeFileSync(file.getAbsolutePath(), content);
    }

    public static writeLines(file: LocalFile, lines: string[]): boolean {
        var fs = require('fs');
        var logger = fs.createWriteStream(file.getAbsolutePath());

        for (let line of lines) {
            logger.write(line + "\n");
        }
        return true;
    }

    public static write(file: LocalFile, content: any, overwrite = true): boolean {
        let fs: any = require('fs');
        if (file.exists()) {
            if (!overwrite) {
                return false;
            }
        }
        let stringContent: string = this.stringifyIfNeeded(content);
        this.writeFileContent(file, stringContent);
        return true;

    }

    public static writeWrapped(file: LocalFile, content: any, wrapper: (name: string, content: string) => string, name: string, overwrite = true): boolean {
        let fs: any = require('fs');
        if (file.exists()) {
            if (!overwrite) {
                return false;
            }
        }
        let stringContent: string = this.stringifyIfNeeded(content);
        let wrappedContent = wrapper(name, stringContent);
        this.writeFileContent(file, wrappedContent);
        return true;

    }

    public static read(file: LocalFile): string {
        let fs: any = require('fs');
        let text: string = fs.readFileSync(file.getAbsolutePath(), 'utf8');
        return text;
    }

    public static readJson(file: LocalFile): any {
        return JSON.parse(TextFiles.read(file));
    }

    public static readJsonTyped<T>(file: LocalFile): T {
        let json: any = JSON.parse(TextFiles.read(file));
        let typedJson: T = json as T;
        return typedJson;
    }

    public static readLines(file: LocalFile): string[] {
        var lines = require('fs').readFileSync(file.getAbsolutePath(), 'utf-8')
            .split('\n')
            .filter(Boolean);

        return lines;
    }
}