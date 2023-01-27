import { Entity } from "@vbr96/easypg/lib";

const tableName: string = 'recipes';
const primaryKey: string = 'id'

export class Recipe extends Entity {
    constructor () {
        super(tableName, primaryKey);
    }
}