import * as express from 'express';
import * as moment from 'moment';

import {  updateDB, readFromDB } from './manageFile';

export const getAllUsersInfo = (req: express.Request, res: express.Response) => {
    readFromDB()
        .then(table => {
            res.send(convertTableToUsers(table))
    })
        .catch(err => console.log(err));
}

export const addNewUser = (req: express.Request, res: express.Response, newUser: string) => {
    if (newUser) {
        const addUserQuery = "insert into " + process.env.TABLENAME + '(name) values("' + JSON.parse(newUser).name + '");' ; 

        updateDB(addUserQuery)
            .then(() => res.send("user added"))
            .catch(() => res.send("user not added"))
    } else {
        res.send("user not added");
    }
};

export const updateUser = (req: express.Request, res: express.Response, userToUpdate: User) => {
    if (userToUpdate) {
        const updateUserQuery = "UPDATE " + process.env.TABLENAME + " SET name='" + userToUpdate.name + "', points=" + userToUpdate.points +
        ", lastShiftDate='" + moment(userToUpdate.lastShiftDate).format("YYYY-MM-DD") + "' WHERE ID=" + userToUpdate.ID ;

        updateDB(updateUserQuery)
            .then(() => res.send("user updated"))
            .catch((err) => res.send(err))
    } else {
        res.send("user not updated");
    }
};


// export const updateRateByUserName = (req: express.Request, res: express.Response, )

/*const arrangeStringToArray = (usersTextFormat: String): User[] => {
    const usersArray: User[] = [];
    const splitUsersByNewLine = usersTextFormat.split("\n");
    splitUsersByNewLine.forEach((userInfo: string) => {
        const userInfoSplit = userInfo.split(":");
        usersArray.push({
            name: userInfoSplit[0],
            rate: parseInt(userInfoSplit[1]),
            ok: "ok"
        });
    });

    return usersArray;
}
*/
const convertTableToUsers = (tableRows : any) : User[] => {
    const usersArray: User[] = [];
    tableRows.forEach((row) => {
        usersArray.push({
            ID: row.ID,
            name: row.name,
            points: row.points,
            lastShiftDate: row.lastShiftDate
        });
    });
    
    return usersArray;
}

interface User {
    ID: number,
    name: string,
    points: number,
    lastShiftDate: moment.Moment
}