import * as express from 'express';

import { readFromFile, appendToFile } from './manageFile';

export const getAllUsersInfo = (req: express.Request, res: express.Response) => {
    readFromFile(process.env.FILE_NAME)
        .then(fileContent => res.send(arrangeStringToArray(String(fileContent))))
        .catch(err => console.log(err));
}

export const addNewUser = (req: express.Request, res: express.Response, userName: string) => {
    if (userName)
        appendToFile(process.env.FILE_NAME, `\n${userName}:0`)
            .then(() => res.send("user added"))
            .catch(() => res.send("user not added"))
    else
        res.send("user not added");
};


// export const updateRateByUserName = (req: express.Request, res: express.Response, )

const arrangeStringToArray = (usersTextFormat: String): User[] => {
    const usersArray: User[] = [];
    const splitUsersByNewLine = usersTextFormat.split("\n");
    splitUsersByNewLine.forEach((userInfo: string) => {
        const userInfoSplit = userInfo.split(":");
        usersArray.push({
            name: userInfoSplit[0],
            rate: parseInt(userInfoSplit[1])
        });
    });

    return usersArray;
}

interface User {
    name: string,
    rate: number
}