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
 await this.page.keyboard.press('Escape');
const fromInput = this.page.locator('#originInput-input');

await fromInput.click();
await fromInput.pressSequentially(city, {delay: 150});

await this.page.keyboard.press('ArrowDown');

await this.page.keyboard.press('Enter');

}



async enterDestinationCity(city: string){
 await this.page.keyboard.press('Escape');
const toInput =this.page.locator('#destinationInput-label');

await toInput.click();
await toInput.pressSequentially(city,{delay: 150});

await this.page.keyboard.press('ArrowDown');

await this.page.keyboard.press('Enter');

}



async selectGuest(guests: number){
const travellerbtn  = this.page.getByTestId('traveller-button');

await travellerbtn.click();

for(let i =1;i<guests;i++){
    await this.page.getByLabel('Increase number of adults').click();

}

}



async clickSearch(){

const searchBtn = this.page.getByRole('button', {name: 'Search'})

await searchBtn.click();

}


async verifySearchResults(){

const results = this.page.locator('#flights-results-list');
const count = await results.count();

console.log(`Ticket found: ${count})`);

expect(count).toBeGreaterThan(0);

}



}