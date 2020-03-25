import {readFile ,appendFile } from "promise-fs";

export const readFromFile = (fileName: string) : Promise<any> => {
   return readFile(fileName);
};

export const appendToFile = (fileName: string, data: any) : Promise<any> => {
    return appendFile(fileName, data);
};