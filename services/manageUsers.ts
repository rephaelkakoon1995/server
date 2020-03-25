import * as express from 'express';

import {  appendToDB, readFromDB } from './manageFile';

export const getAllUsersInfo = (req: express.Request, res: express.Response) => {
    readFromDB()
        .then(table => {
            res.send(convertTableToUsers(table))
    })
        .catch(err => console.log(err));
}

export const addNewUser = (req: express.Request, res: express.Response, newUser: string) => {
    if (newUser)
        appendToDB(newUser)
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

const convertTableToUsers = (tableRows : any) : User[] => {
    const usersArray: User[] = [];
    tableRows.forEach((row) => {
        usersArray.push({
            name: row.name,
            rate: row.place
        });
    });
    
    return usersArray;
}

interface User {
    name: string,
    rate: number
}