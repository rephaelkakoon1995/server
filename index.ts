import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as mysql from "mysql";

import { getAllUsersInfo, addNewUser, updateUser } from './services/manageUsers';
import { getAllShifts, addNewShift } from './services/manageShifts';
import { getShiftsHistory, addShiftToHistory } from './services/manageShiftsHistory'

dotenv.config();
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the club')
});

app.get('/getAllUsersInfo', (req:express.Request, res:express.Response) => {
    getAllUsersInfo(req,res);
});

app.post('/addNewUser', (req:express.Request,res:express.Response) => {
    const newUser = req.query.newUser ? req.query.newUser : "";
    addNewUser(req,res,newUser);
});

app.post('/updateUser', (req:express.Request,res:express.Response) => {
    const userToUpdate = req.query.userToUpdate ? req.query.userToUpdate : "";
    updateUser(req,res,JSON.parse(userToUpdate));
});

app.get('/getAllShifts', (req:express.Request, res:express.Response) => {
    getAllShifts(req,res);
});

app.post('/addNewShift', (req:express.Request,res:express.Response) => {
    const newShift = req.query.newShift ? req.query.newShift : "";
    addNewShift(req,res,newShift);
});

app.get('/getShiftsHistory', (req:express.Request, res:express.Response) => {
    getShiftsHistory(req,res);
});

app.post('/addShiftToHistory', (req:express.Request,res:express.Response) => {
    const scheduledShift = req.query.scheduledShift ? req.query.scheduledShift : "";
    addShiftToHistory(req,res,scheduledShift);
});

app.listen(process.env.PORT, () => console.log(`app listening on port ${process.env.PORT}!`));