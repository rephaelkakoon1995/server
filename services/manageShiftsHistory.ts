import * as express from 'express';
import * as moment from 'moment';

import {  updateDB, readFromDB } from './manageFile';

export const getShiftsHistory = (req: express.Request, res: express.Response) => {
    readFromDB(process.env.SHIFTSHISTORYTABLENAME)
    .then(table => {
        res.send(convertTableToShiftsHistory(table))
})
    .catch(err => console.log(err));
}

export const addShiftToHistory = (req: express.Request, res: express.Response, scheduledShift: string) => {
    if (scheduledShift) {
        const addUserQuery = "insert into " + process.env.SHIFTSHISTORYTABLENAME + '(shiftDate, toranName, shiftName) values("' + JSON.parse(scheduledShift).shiftDate + 
        '", "' + JSON.parse(scheduledShift).toranName + '", "' + JSON.parse(scheduledShift).shiftName + '");'; 

        updateDB(addUserQuery)
            .then(() => res.send("scheduledShift added"))
            .catch(() => res.send("hi not added"))
    } else {
        res.send("scheduledShift not added");
    }
};

const convertTableToShiftsHistory = (tableRows : any) : shiftHistory[] => {
    const usersArray: shiftHistory[] = [];
    tableRows.forEach((row) => {
        usersArray.push({
            shiftDate : row.shiftDate,
            toranName : row.toranName,
            shiftName : row.shiftName
        });
    });
    
    return usersArray;
}

interface shiftHistory {
    shiftDate : moment.Moment,
    toranName : string,
    shiftName : string
}