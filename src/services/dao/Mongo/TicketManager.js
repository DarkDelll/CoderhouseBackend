import ticketModel from "./models/tickets.js";

class TicketManager{

    async createTicket(ticket){
        const result = await ticketModel.create(ticket)
        return result
    }

}
export default TicketManager