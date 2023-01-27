import { Entity } from "@vbr96/easypg/lib";

const tableName: string = 'workouts';
const primaryKey: string = 'id'

export class Workout extends Entity {
    constructor () {
        super(tableName, primaryKey);
    }
}