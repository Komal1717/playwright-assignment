import { Page, Locator, expect } from '@playwright/test';

export class ResultsPage {

    private readonly page: Page;

    private readonly cheapestTab: Locator;

    private readonly nextDayButton: Locator;

    private readonly sortDropdown: Locator;

    private readonly flightResultsContainer: Locator;

    private readonly flightPrice: Locator;

    

    constructor(page: Page) {

        this.page = page;
 
        this.cheapestTab = page.getByTestId('FqsTab_CHEAPEST');

        this.nextDayButton = page.locator('button[aria-label="1 day later"]').first();

        this.sortDropdown = page.locator('#fqsSecondarySort');

        this.flightResultsContainer =  page.locator('div[class*="FlightsDayView_results"]');

        this.flightPrice = page.locator('div[class*="Price_mainPriceContainer"] span').first();
        
    }

    async getTicketCount(): Promise<number> {

    await this.cheapestTab.waitFor({
        state: 'visible',
        timeout: 30000
    });

    const count = await this.page.locator('#flights-results-list > li').count();

    console.log(`Flights Found: ${count}`);

    return count;
}



   async verifySearchResults(): Promise<void> {

    await this.flightResultsContainer.waitFor({
        state: 'visible',
        timeout: 30000
    });

    const ticketCount = await this.getTicketCount();

    console.log(`Tickets Found: ${ticketCount}`);

    expect(ticketCount).toBeGreaterThan(0);
}


    async sortByCheapest(): Promise<void> {

        await this.sortDropdown.selectOption('CHEAPEST');

        await expect(this.cheapestTab).toBeVisible();
    }

    async getCheapestPrice(): Promise<number> {

    const priceText = await this.flightPrice.textContent();

    if (!priceText) {
        throw new Error('Unable to read flight price');
    }

    console.log(`Raw Price Text: ${priceText}`);

    const price = parseInt(
        priceText.replace(/[^\d]/g, ''),
        10
    );

    console.log(`Parsed Price: ${price}`);

    return price;
}

    

    async goToNextDay(): Promise<void> {

        await this.nextDayButton.click();

         await this.cheapestTab.waitFor({state: 'visible'
});
    }

    

   async findCheapestFlightOverNext5Days(): Promise<{day: number; price: number;}> 
   {

        let cheapestFlight = {day: 1,price: Number.MAX_SAFE_INTEGER};

        for (let day = 1;day <= 5;day++) 
            {
                const currentPrice = await this.getCheapestPrice();

            console.log(`Day ${day} Price: $${currentPrice}`);

            if ( currentPrice < cheapestFlight.price)
                 {
                    cheapestFlight = {day, price: currentPrice
                };
            }

            if (day < 5) {

                await this.goToNextDay();
            }
        }

        console.log(`Cheapest flight found on Day ${cheapestFlight.day}`);

        console.log(`Price: $${cheapestFlight.price}`);

        return cheapestFlight;
    }
}