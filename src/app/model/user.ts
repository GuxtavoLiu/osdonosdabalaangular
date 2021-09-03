import {Auditable} from "./auditable";

/**
 * @model é utilizado para enviar ou receber dados do backend.
 *
 * @author NextAge
 * @classname User
 */
export class User extends Auditable {
    id?: number;
    name?: string;
    email?: string;
    username?: string;
    password?: string;
    accessToken?: string;
    link?: string;
    roles?: string[];

}




