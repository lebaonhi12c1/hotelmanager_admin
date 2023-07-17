
import fetch from "../helpers/fetch"
import {
    API_GET_ALL_PAYMENT,
    API_CREATE_PAYMENT
} from "../configs/api"



class PAYMENT {
    static async getAllPayment(){
        const result = await fetch.make().get(API_GET_ALL_PAYMENT, {authHeader:true})
        return result
    }

    static async postPayment(payload){
        const result = await fetch.make().post(API_CREATE_PAYMENT, payload, {authHeader:true})
        return result
    }

    
}
export default PAYMENT