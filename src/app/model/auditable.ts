/**
 * @model é utilizado para enviar ou receber dados do backend.
 *
 * @author NextAge
 * @classname Auditable
 */
export class Auditable {
    createdBy?: string;
    lastModifiedBy?: string;
    createdDate?: Date;
    lastModifiedDate?: Date;
    active?: boolean = false;
}

