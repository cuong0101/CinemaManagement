import { Benefits } from "./benefits";

export class RankPoints {
    id?: number;
    grade?: string
    isActive?: boolean  //Trạng thái hoạt động
    operationDate?: Date  //Ngày hoạt động
    expirationDate?: Date  //Ngày hết hạn
    numberOfVisit?: number  //Điểm cần đạt
    description?: string
    money?: number
    point?: number
    benefits?: Benefits[];
}
