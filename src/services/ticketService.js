import {TicketManagerMongo} from "../Dao/TicketManagerMongo.js"

const ticketManager = new TicketManagerMongo

class TicketService{
    async createTicket(purchase_datetime, amount, purchaser){
        try {
            return await ticketManager.createTicket(purchase_datetime, amount, purchaser)
        } catch (error) {
            console.log(error)
        }
    }
}

export default TicketService