
import { DatePipe, Time } from "@angular/common";
import { Moment } from "moment";

export class MstMovieManagement{
    [x: string]: any;
    id?: number;
    name?: string;
    image?: string;
    trailer?: string;
    director?: string;
    actor?: string;
    publishDate!: Date;
    time?: Time;
    languages?: string;
    rated?: string;
    description?: string;
}