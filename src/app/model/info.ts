/**
 * @model é utilizado para enviar ou receber dados do backend.
 *
 * @author NextAge
 * @classname Info
 */
export class Info {
    success: boolean;
    message?: string;
    object?: any;

    constructor(success: boolean, message?: string, object: any = null) {
        this.success = success;
        this.message = message;
        this.object = object;
    }
}
