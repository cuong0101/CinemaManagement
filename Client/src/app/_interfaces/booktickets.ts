import { TicketByShowTime } from "./listTickets";

export class BookTickets{
  id?: number;
  startDate?: Date;
  startTime?: Date;
  time?: string;
  movieName?: string;
  roomName?: string;
  listTicket?: TicketByShowTime[];
}
