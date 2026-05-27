import {test, expect} from '@playwright/test';
import { Homepage } from '../pages/HomePage';
import { flightData } from '../test-data/flightData';
import { getFutureDate } from '../utils/dateUtils';
import { apiHelper } from '../utils/apiHelper';






flightData.forEach((data) => {
  test(`search flight from ${data.from} to ${data.to}`, async ({page}) => {
    test.slow();
    

    //API
    const ApiHelper = new apiHelper();
    await ApiHelper.createContext();

    const mockFlightData = await ApiHelper.getMockFlightData();

    console.log('Mock flight data:', mockFlightData);

    expect(mockFlightData.flights.length).toBe(4);
    expect(mockFlightData.flights[0].airline).toBe('Qatar Airways');
    expect(mockFlightData.flights[0].price).toBe(450);
    expect(mockFlightData.flights[1].airline).toBe('Emirates');
    expect(mockFlightData.flights[1].price).toBe(560);
    expect(mockFlightData.flights[2].airline).toBe('Lufthansa');
    expect(mockFlightData.flights[2].price).toBe(230);




    //Dynamic Dates

    const departureDate = getFutureDate(data.fromOffset);
    const returnDate = getFutureDate(data.toOffset);

    console.log(`Departure Date: ${departureDate}`);
    console.log(`arrival date: ${returnDate}`);


    //Page obejct

    const homePage = new Homepage(page);


    
    // Mock api to bypass bot restriction
    await page.route('https://www.skyscanner.com/', route => {
      route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: `
          <html>
            <body>
              <input id="originInput-input" />
              <input id="destinationInput-label" />

             <input data-testid="depart-btn" />
             <input data-testid="return-btn" />

             <div id="guest-count">1 Adult</div>

              <button data-testid="traveller-button">
              Travellers
              </button>

              <button aria-label="Increase number of adults">
              +
              </button>

    
               <button>
               Search
               </button>
    

              <ul id="flights-results-list" 
              role="list"
              style="display:none;">

              <li class="ticket">Qatar Airways</li>
              <li class="ticket">Emirates</li>
              <li class="ticket">Lufthansa</li>
              <li class="ticket">Swiss</li>

              </ul>
            </body>
          </html>
        `
      });
    });

    await homePage.navigate();
    await homePage.enterSourceCity(data.from);
    await homePage.enterDestinationCity(data.to);
    await homePage.selectDepartureDate(departureDate);
    await homePage.selectReturnDate(returnDate);
    await homePage.selectGuest(data.guests);
    await homePage.clickSearch();



    //Search result 
    await homePage.verifySearchResults();




    //cheap flight sorting

    const fiveDayFlightPrice = await ApiHelper.getFiveDayFlightPrices();
    
    expect(fiveDayFlightPrice.length).toBe(5);


    fiveDayFlightPrice.forEach((flight)=>{

      console.log(`${flight.day}) Price: $${flight.price}`);



    })

    const cheapestFlight = fiveDayFlightPrice.reduce((prev, current) =>{

      return prev.price < current.price ? prev : current;

    });

      console.log('Cheapest flight across 5 days:', cheapestFlight);
      expect(cheapestFlight.price).toBeLessThan(400);


    });

    
  });








