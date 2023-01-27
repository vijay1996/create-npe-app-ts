import { Application, Request, response, Response } from 'express';
import { Connection, db_messages, EasyPgError } from '@vbr96/easypg/lib';
import { Recipe } from '../entities/Recipe';

const recipe = new Recipe();

export function recipeEndpoints (app:Application, conn:Connection) {
    app.get("/recipe/:id", async function(req:Request, res:Response) {
        const userId:number = parseInt(req.params['id']);
        let result:any;
        try {
            result = await conn.query({text: recipe.get(userId), params: null});
        } catch (error) {
            if (error instanceof EasyPgError) {
                res.json(error.getJSON());
            } else {
                res.json({error: "unidentified error occured"});
            }
        }
        res.json(result);
    });

    app.post("/recipe", async function(req:Request, res:Response) {
        const keys:string[] = Object.keys(req.body);
        recipe.setColumns(keys);
        recipe.setValues(keys.map(key => `'${req.body[key]}'`));
        let result:any;
        try {
            result = await conn.query({text: recipe.insert(true), params: null});
        } catch (error) {
            if (error instanceof EasyPgError) {
                res.json(error.getJSON());
            } else {
                res.json({error: "unidentified error occured"});
            }
        }
        res.json(db_messages.INSERT_SUCCESS);
    });

    app.put("/recipe", async function(req:Request, res:Response) {
        const keys:string[] = Object.keys(req.body.update);
        recipe.setColumns(keys);
        recipe.setValues(keys.map(key => `'${req.body.update[key]}'`));
        let result:any;
        try {
            result = await conn.query({text: recipe.update(req.body.recordKey), params: null});
        } catch (error) {
            if (error instanceof EasyPgError) {
                res.json(error.getJSON());
            } else {
                res.json({error: "unidentified error occured"});
            }
        }
        res.json(db_messages.UPDATE_SUCCESS);
    });

    app.delete("/recipe/:id", async function(req:Request, res:Response) {
        let result: any;
        try {
            result = conn.query({text: recipe.delete(req.params['id']), params: null})
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