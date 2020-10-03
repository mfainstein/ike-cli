export interface CommandOption {
    //TODO: this is dangerous, actually the command name should be derived from the "flag"
    name:string;
    flag:string;
    description:string;
}