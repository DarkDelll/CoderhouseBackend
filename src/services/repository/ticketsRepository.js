export default class ticketsRepository{
    constructor(dao){
        this.dao = dao
    }
    createTicket = (ticket)=>{
        return this.dao.createTicket(ticket)
    }
}
