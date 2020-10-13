export interface Project {
    //project name is also the folder name
    name: string;
    parentFolderPath: string;
    srcFolderPath?: string;
}