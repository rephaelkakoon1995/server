import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as mysql from "mysql";

import { getAllUsersInfo, addNewUser } from './services/manageUsers';

dotenv.config();
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the club')
});

// app.get('/getAllUsersInfo', (req:express.Request, res:express.Response) => {
//     getAllUsersInfo(req,res);
// });

// app.post('/addNewUser', (req:express.Request,res:express.Response) => {
//     const newUser = req.body.newUser ? req.body.newUser : "";

//     addNewUser(req,res,newUser);
// });

app.get('/nextVolunteer', (req:express.Request,res:express.Response) => {
    res.send('רפאל');
});

app.listen(process.env.PORT, () => console.log(`app listening on port ${process.env.PORT}!`));