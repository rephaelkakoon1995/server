import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

import { getAllUsersInfo, addNewUser } from './services/manageUsers';

dotenv.config();
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Welcome to the club'));

app.get('/getAllUsersInfo', (req:express.Request, res:express.Response) => {
    getAllUsersInfo(req,res);
});

app.post('/addNewUser', (req:express.Request,res:express.Response) => {
    const userName = req.body.name ? req.body.name : '';

    addNewUser(req,res,userName);
});

app.listen(process.env.PORT, () => console.log(`app listening on port ${process.env.PORT}!`));