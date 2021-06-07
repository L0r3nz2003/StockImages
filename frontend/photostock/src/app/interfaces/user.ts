import {Optional} from "@angular/core";

export interface User {
    name: string;
    email: string;
    password: string;
    pics: number;
    token?: string;
}
