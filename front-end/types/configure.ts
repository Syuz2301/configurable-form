export interface Field {
    id:string,
    type:string,
    visible:boolean,
    required:boolean,
    label:string,
    rows?:number
}

export interface FieldState {
    fields:Field[]
}


