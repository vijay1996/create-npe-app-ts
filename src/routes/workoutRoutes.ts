import { Application, Request, response, Response } from 'express';
import { Connection, db_messages, EasyPgError } from '@vbr96/easypg/lib';
import { Workout } from '../entities/Workout';

const workout = new Workout();

export function workoutEndpoints (app:Application, conn:Connection) {
    app.get("/workout/:id", async function(req:Request, res:Response) {
        const userId:number = parseInt(req.params['id']);
        let result:any;
        try {
            result = await conn.query({text: workout.get(userId), params: null});
        } catch (error) {
            if (error instanceof EasyPgError) {
                res.json(error.getJSON());
            } else {
                res.json({error: "unidentified error occured"});
            }
        }
        res.json(result);
    });

    app.post("/workout", async function(req:Request, res:Response) {
        const keys:string[] = Object.keys(req.body);
        workout.setColumns(keys);
        workout.setValues(keys.map(key => `'${req.body[key]}'`));
        let result:any;
        try {
            result = await conn.query({text: workout.insert(true), params: null});
        } catch (error) {
            if (error instanceof EasyPgError) {
                res.json(error.getJSON());
            } else {
                res.json({error: "unidentified error occured"});
            }
        }
        res.json(db_messages.INSERT_SUCCESS);
    });

    app.put("/workout", async function(req:Request, res:Response) {
        const keys:string[] = Object.keys(req.body.update);
        workout.setColumns(keys);
        workout.setValues(keys.map(key => `'${req.body.update[key]}'`));
        let result:any;
        try {
            result = await conn.query({text: workout.update(req.body.recordKey), params: null});
        } catch (error) {
            if (error instanceof EasyPgError) {
                res.json(error.getJSON());
            } else {
                res.json({error: "unidentified error occured"});
            }
        }
        res.json(db_messages.UPDATE_SUCCESS);
    });

    app.delete("/workout/:id", async function(req:Request, res:Response) {
        let result: any;
        try {
            result = conn.query({text: workout.delete(req.params['id']), params: null})
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