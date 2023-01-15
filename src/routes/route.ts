import { Application } from 'express';
import { Connection } from '@vbr96/easypg/lib';
import { exampleEndpoint } from './exampleRoute';

export default function activateEndpoints (app:Application, conn:Connection) {
    exampleEndpoint(app, conn);
};