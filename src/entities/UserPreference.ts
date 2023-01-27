import { Entity } from "@vbr96/easypg/lib";

const tableName:string = "user_preferences";
const primaryKey:string = "id";

export class UserPreference extends Entity {
    constructor() {
        super(tableName, primaryKey);
    }
}