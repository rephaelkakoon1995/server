import {readFile ,appendFile } from "promise-fs";
import * as dotenv from 'dotenv';
import * as mysql from "mysql";

dotenv.config();
const connection = mysql.createConnection({
    host: process.env.SQLHOST,
    user: process.env.DBUSERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
connection.connect(function(error) {
    if(!!error) {
        console.log(error);
    } else {
        console.log("connected to the db");
    }
});

export const readFromFile = (fileName: string) : Promise<any> => {
   return readFile(fileName);
};

export const appendToFile = (fileName: string, data: any) : Promise<any> => {
    return appendFile(fileName, data);
};

export const readFromDB = () : Promise<any> => {
    return new Promise(function(resolve, reject) {
        connection.query("select * from " + process.env.TABLENAME, function(error, rows) {
            if (error) {
                return reject(error);
            }
            resolve(rows);
        });
    });
}

export const updateDB = (queryString : string) : Promise<any> => {
    return new Promise(function(resolve, reject) {
        connection.query(queryString, function(error){
            if (error) {
                return reject(error);
            } 
            resolve(true);
        });
    });
}