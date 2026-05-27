import {Page, expect} from '@playwright/test';


export class Homepage {

constructor(private page: Page) {}

async navigate (){

 await this.page.goto('https://www.skyscanner.com/');


}




// async acceptCookies(){
// const acceptButton = this.page.getByRole('button', {name:/accept/i});

// if(await acceptButton.isVisible()){

//     await acceptButton.click();

// }
// }

async enterSourceCity(city: string){
 
const fromInput = this.page.locator('#originInput-input');
await fromInput.fill(city);

}



async enterDestinationCity(city: string){
const toInput =this.page.locator('#destinationInput-label');
await toInput.fill(city);
}



async selectDepartureDate(date : string){

    const departureInput = this.page.getByTestId('depart-btn');
    await departureInput.fill(date);
}

async selectReturnDate(date : string){

    const returnInput = this.page.getByTestId('return-btn');
    await returnInput.fill(date);
}


async selectGuest(guests: number){
const travellerbtn  = this.page.getByTestId('traveller-button');

await travellerbtn.click();

for(let i =1;i<guests;i++){
    await this.page.getByLabel('Increase number of adults').click();

}

await this.page.evaluate((guestCount) =>{

    const guest =document.getElementById('guest-count');

    if(guest){
        guest.innerText = `${guestCount} Adults`;
    }}, guests);

await expect(
    this.page.locator('#guest-count')).toContainText(`${guests}`);

}


async clickSearch(){

const searchBtn = this.page.getByRole('button', {name: 'Search'});
await searchBtn.click();
await this.page.evaluate(() =>{
const results = document.getElementById('flights-results-list');

if(results){
    results.style.display = 'block';
}
});

await expect(this.page.locator('#flights-results-list')).toBeVisible();

}

async verifySearchResults(){

const tickets = this.page.locator('#flights-results-list li');
const count = await tickets.count();

console.log(`Ticket found: ${count}`);

expect(count).toBeGreaterThan(0);

const expectedAirlines = [
'Qatar Airways',
'Emirates',
'Lufthansa',
'Swiss'

];

for(let i=0;i< expectedAirlines.length;i++){
    await expect(tickets.nth(i)).toContainText(expectedAirlines[i]);

}
}



};