
import { DatePipe, Time } from "@angular/common";
export class MstMovieManagement{
    id?: number;
    name?: string;
    image?: File;
    trailer?: string;
    director?: string;
    actor?: string;
    publishDate!: Date;
    time?: Time;
    languages?: string;
    rated?: string;
    description?: string;
}