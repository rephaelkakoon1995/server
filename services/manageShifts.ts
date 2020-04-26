import * as express from 'express';

import {  updateDB, readFromDB } from './manageFile';

export const getAllShifts = (req: express.Request, res: express.Response) => {
    readFromDB(process.env.SHIFTSTABLENAME)
    .then(table => {
        res.send(convertTableToShifts(table))
})
    .catch(err => console.log(err));
}

export const addNewShift = (req: express.Request, res: express.Response, newShift: string) => {
    if (newShift) {
        const addShiftQuery = "insert into " + process.env.SHIFTSTABLENAME + '(pointValue, shiftName) values("' + JSON.parse(newShift).pointValue + 
        '", "' + JSON.parse(newShift).shiftName + '");' ; 

        updateDB(addShiftQuery)
            .then(() => res.send("shift added"))
            .catch(() => res.send("shift not added"))
    } else {
        res.send("user not added" + newShift);
    }
};

const convertTableToShifts = (tableRows : any) : Shift[] => {
    const shiftsArray: Shift[] = [];
    tableRows.forEach((row) => {
        shiftsArray.push({
            pointValue : row.pointValue,
            shiftName : row.shiftName
        });
    });

    return shiftsArray;
}

interface Shift {
    pointValue : number,
    shiftName : string
}