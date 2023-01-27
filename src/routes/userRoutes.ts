import { Application, Request, response, Response } from 'express';
import { Connection, db_messages, EasyPgError } from '@vbr96/easypg/lib';
import { User } from '../entities/User';
import { toInteger } from 'lodash';
import bcrypt from "bcryptjs";

const user = new User();

export function userEndpoints (app:Application, conn:Connection) {
    app.get("/user/:id", async function(req:Request, res:Response) {
        const userId:number = parseInt(req.params['id']);
        let result:any;
        try {
            result = await conn.query({text: user.get(userId), params: null});
        } catch (error) {
            if (error instanceof EasyPgError) {
                res.json(error.getJSON());
            } else {
                res.json({error: "unidentified error occured"});
            }
        }
        res.json(result);
    });

    app.post("/user", async function(req:Request, res:Response) {
        const keys:string[] = Object.keys(req.body);
        user.setColumns(keys);
        user.setValues(keys.map(key => `'${req.body[key]}'`));
        let result:any;
        try {
            result = await conn.query({text: user.insert(true), params: null});
        } catch (error) {
            if (error instanceof EasyPgError) {
                res.json(error.getJSON());
            } else {
                res.json({error: "unidentified error occured"});
            }
        }
        res.json(db_messages.INSERT_SUCCESS);
    });

    app.put("/user", async function(req:Request, res:Response) {
        const keys:string[] = Object.keys(req.body.update);
        user.setColumns(keys);
        user.setValues(keys.map(key => `'${req.body.update[key]}'`));
        let result:any;
        try {
            result = await conn.query({text: user.update(req.body.recordKey), params: null});
        } catch (error) {
            if (error instanceof EasyPgError) {
                res.json(error.getJSON());
            } else {
                res.json({error: "unidentified error occured"});
            }
        }
        res.json(db_messages.UPDATE_SUCCESS);
    });

    app.delete("/user/:id", async function(req:Request, res:Response) {
        let result: any;
        try {
            result = conn.query({text: user.delete(req.params['id']), params: null})
        } catch (error) {
            if (error instanceof EasyPgError) {
                res.json(error.getJSON());
            } else {
                res.json({error: "unidentified error occured"});
            }
        }
        res.json(db_messages.DELETE_SUCCESS);
    });

    app.post("/user/login", async function (req:Request, res:Response) {
        conn.query({text: user.getPasswordUsingEmail(req.body.email), params: null})
        .then(data => {
            const recoveredPassword = decryptPassword(req.body.password);
            bcrypt.compare(recoveredPassword, data[0].password)
            .then(result => {
                if (result) {
                    // @ts-ignore
                    req.session.user = { email: req.body.email }
                }
                res.json({state: result})
            })
            .catch(err => res.json({data: err, exception: true}));
        })
        .catch(err => res.json({data: err, exception: true}));
    });
}

function decryptPassword(password:string):string {
    const [hash, length] = password.split("<+++>");
    const reversedHash:string = hash.split("").reverse().join("");
    const numlength = toInteger(length);

    let recoveredPassword = "";
    let index = 0;
    if (numlength < hash.length / 2) {
        while (recoveredPassword.length < numlength) {
            if (index % 2 === 0) {
                recoveredPassword += reversedHash[index];
            }
            index++;
        }
    } else {
        while (recoveredPassword.length < numlength / 2) {
            if (index % 2 === 1) {
                recoveredPassword += reversedHash[index];
            }
            index++;
        }
        recoveredPassword += (reversedHash.substring(index, reversedHash.length));
    }
    return recoveredPassword;
}