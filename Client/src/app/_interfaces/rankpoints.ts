import * as moment from "moment"
import { Moment } from "moment"

export class RankPoints {
    id?: number;
    grade?: string
    isActive?: boolean  //Trạng thái hoạt động
    operationDate?: Moment  //Ngày hoạt động
    expirationDate?: Moment  //Ngày hết hạn
    numberOfVisit?: number  //Điểm cần đạt
    description?: string
}
