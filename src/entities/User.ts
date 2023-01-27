import { Entity } from "@vbr96/easypg/lib";

const tableName: string = 'users';
const primaryKey: string = 'id'

export class User extends Entity {
    constructor () {
        super(tableName, primaryKey);
    }

    getPasswordUsingEmail(email:string):string {
        return `SELECT password FROM ${tableName} where email='${email}';`
    }
}