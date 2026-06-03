import { Page, Locator } from '@playwright/test';

export class HomePage {

    private readonly page: Page;

    private readonly fromInput: Locator;
    private readonly toInput: Locator;
    private readonly departureDateButton: Locator;
    private readonly returnDateButton: Locator;
    private readonly nextMonthButton: Locator;
    private readonly applyDateButton: Locator;
    private readonly travellerButton: Locator;
    private readonly increaseAdultButton: Locator;
    private readonly searchButton: Locator;
    private readonly addPlaceToStayCheckbox: Locator;

    constructor(page: Page) {

        this.page = page;

        this.fromInput = page.locator('#originInput-input');

        this.toInput = page.locator('#destinationInput-input');

        this.departureDateButton = page.getByTestId('depart-btn');

        this.returnDateButton = page.getByTestId('return-btn');

        this.nextMonthButton = page.getByLabel(/Next month/i);

        this.applyDateButton = page.getByRole('button', { name: 'Apply'});

        this.travellerButton = page.getByTestId('traveller-button');

        this.increaseAdultButton = page.getByLabel('Increase number of adults');

        this.addPlaceToStayCheckbox = page.getByLabel('Add a place to stay');

        this.searchButton = page.getByTestId('desktop-cta');

    }

    async navigate(): Promise<void> {
        
        await this.page.goto('https://www.skyscanner.com/');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async enterSourceCity(city: string): Promise<void> {

        await this.fromInput.click();
        await this.fromInput.fill(city);
        
        const firstOption = this.page.getByRole('option').first();
        await firstOption.waitFor({ state: 'visible' });
         await firstOption.click();

    }

    async enterDestinationCity(city: string): Promise<void> {

        await this.toInput.click();
        await this.toInput.fill(city);
        
        const firstOption = this.page.getByRole('option').first();
        await firstOption.waitFor({ state: 'visible' });
        await firstOption.click();
    }

    async selectDepartureDate(departureDate: string): Promise<void> {
        await this.departureDateButton.click();
        await this.selectDate(departureDate);
    }

    async selectReturnDate(returnDate: string): Promise<void> {
        await this.selectDate(returnDate);
        await this.applyDateButton.click();
    }

    async selectGuests(guests: number): Promise<void> {
        await this.travellerButton.click();
        for(let i = 1; i < guests; i++) {
       await this.increaseAdultButton.click();
        }
    }

    async disablePlaceToStay(): Promise<void> {

    const checkBoxCount = await this.addPlaceToStayCheckbox.count();

    if(checkBoxCount > 0){
        if (await this.addPlaceToStayCheckbox.isChecked()){
            await this.addPlaceToStayCheckbox.click();
        }

        console.log('Add a place to check checbox handle');
    }

    else{
        console.log('Add place to stay checkbox not present');
    }
}

    async clickSearch(): Promise<void> {
        await this.searchButton.click();
    }

    async searchFlight(from: string,to: string,departureDate: string,returnDate: string,guests: number): Promise<void> {

        await this.enterSourceCity(from);
        await this.enterDestinationCity(to);
        await this.selectDepartureDate(departureDate);
        await this.selectReturnDate(returnDate);
        await this.selectGuests(guests);
        await this.disablePlaceToStay();
        await this.clickSearch();
    }
    private async selectDate(date: string): Promise<void> {

        const targetDate =new Date(date);

        const day =targetDate.getDate();
        const month = targetDate.toLocaleString('default',{month: 'long'});
        const year = targetDate.getFullYear();
    
        await this.navigateToMonth(targetDate);

        const dateButton = this.page.locator(`button[aria-label*="${day} ${month} ${year}"]`).first();
        await dateButton.click();
     }

    private async navigateToMonth( targetDate: Date): Promise<void> {

        const targetMonth = targetDate.toLocaleString('default',{month: 'long'});
         for (let i = 0;i < 12;i++)       {
              const monthVisible = await this.page.locator(`h2:has-text("${targetMonth}")`).isVisible().catch(() => false);
            if (monthVisible ) {
                return;
            }
            await this.nextMonthButton.click();
        }
        throw new Error(`Unable to find month: ${targetMonth}`);
    }
}
