import {Optional} from "@angular/core";

export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    pics: number;
    token?: string;
}
