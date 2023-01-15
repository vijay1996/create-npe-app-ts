import { Application, Request, response, Response } from 'express';
import { Connection } from '@vbr96/easypg/lib';

export function exampleEndpoint (app:Application, conn:Connection) {
    app.get("/", function(req: Request, res: Response) {
        res.send("This is your (N)ode (P)ostgreSQL (E)xpress app.");
    });
}