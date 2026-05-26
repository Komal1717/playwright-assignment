import { request, APIRequestContext } from "playwright";

export class apiHelper{

apiContext! : APIRequestContext;

async createContext(){
    
    this.apiContext = await request.newContext();

}

async getMockFlightData(){

    return{

        flights:[

            {
                airline: 'Qatar Airways',
                price: 450
            },

            {
                airline: 'Emirates',
                price: 560
            },
            {
                airline: 'Lufthansa',
                price: 230
            }
        ]
    };
}




async getFiveDayFlightPrices(){

    return[
        {day: 'Day 1', price: 500},
        {day: 'Day 2', price: 200},
        {day: 'Day 3', price: 450},
        {day: 'Day 4', price: 600},
        {day: 'Day 5', price: 100}

    ];


}

}



