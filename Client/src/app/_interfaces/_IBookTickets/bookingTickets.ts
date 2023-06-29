import { FoodItemDto } from "./FoodItem";

export class BookingTickets{
    cusId?: number;
    empId?: number;
    listticket?: number[];
    totalAmount?: number;
    listfood?:FoodItemDto[];
}