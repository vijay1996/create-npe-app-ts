import { Application, Request, response, Response } from 'express';
import { Connection, db_messages, EasyPgError } from '@vbr96/easypg/lib';
import { json } from 'stream/consumers';
import { UserPreference } from '../entities/UserPreference';

const userPreference = new UserPreference()

export function userPreferenceEndpoints (app:Application, conn:Connection) {
    app.get("/user_preference/:id", async function(req:Request, res:Response) {
        const userId:number = parseInt(req.params['id']);
        let result:any;
        try {
            result = await conn.query({text: userPreference.get(userId), params: null});
        } catch (error) {
            if (error instanceof EasyPgError) {
                res.json(error.getJSON());
            } else {
                res.json({error: "unidentified error occured"});
            }
        }
        res.json(result);
    });

    app.post("/user_preference", async function(req:Request, res:Response) {
        const keys:string[] = Object.keys(req.body);
        userPreference.setColumns(keys);
        userPreference.setValues(keys.map(key => `'${req.body[key]}'`));
        let result:any;
        try {
            result = await conn.query({text: userPreference.insert(true), params: null});
        } catch (error) {
            if (error instanceof EasyPgError) {
                res.json(error.getJSON());
            } else {
                res.json({error: "unidentified error occured"});
            }
        }
        res.json(db_messages.INSERT_SUCCESS);
    });

    app.put("/user_preference", async function(req:Request, res:Response) {
        const keys:string[] = Object.keys(req.body.update);
        userPreference.setColumns(keys);
        userPreference.setValues(keys.map(key => `'${req.body.update[key]}'`));
        let result:any;
        try {
            result = await conn.query({text: userPreference.update(req.body.recordKey), params: null});
        } catch (error) {
            if (error instanceof EasyPgError) {
                res.json(error.getJSON());
            } else {
                res.json({error: "unidentified error occured"});
            }
        }
        res.json(db_messages.UPDATE_SUCCESS);
    });

    app.delete("/user_preference/:id", async function(req:Request, res:Response) {
        let result: any;
        try {
            result = conn.query({text: userPreference.delete(req.params['id']), params: null})
        } catch (error) {
            if (error instanceof EasyPgError) {
                res.json(error.getJSON());
            } else {
                res.json({error: "unidentified error occured"});
            }
        }
        res.json(db_messages.DELETE_SUCCESS);
    });
}