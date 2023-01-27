import { Application } from 'express';
import { Connection } from '@vbr96/easypg/lib';
import { userEndpoints } from './userRoutes';
import { userPreferenceEndpoints } from './userPreferenceRoutes';
import { recipeEndpoints } from './recipeRoutes';
import { workoutEndpoints } from './workoutRoutes';

export default function activateEndpoints (app:Application, conn:Connection) {
    userEndpoints(app, conn);
    userPreferenceEndpoints(app, conn);
    recipeEndpoints(app, conn)
    workoutEndpoints(app, conn);
};