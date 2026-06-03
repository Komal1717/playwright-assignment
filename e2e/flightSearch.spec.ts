import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ResultsPage } from '../pages/ResultPage';
import { flightData } from '../test-data/flightData';
import { getFutureDate } from '../utils/dateUtils';

flightData.forEach((data) => {

   test(`Search flight from ${data.from} to ${data.to}`,async ({page}) => {
    //   const browser = await chromium.connectOverCDP('http://localhost:9222');
    //   const context = browser.contexts()[0];
    //   const page = context.pages()[0];

      const homePage = new HomePage(page);
      const resultsPage = new ResultsPage(page);

      const departureDate = getFutureDate(data.startOffset);

      const returnDate = getFutureDate(data.endOffset);

      console.log(`From: ${data.from}`);
      console.log(`To: ${data.to}`);
      console.log(`Departure Date: ${departureDate}`);
      console.log(`Return Date: ${returnDate}`);
      console.log(`Guests: ${data.guests}`);

      await test.step('Search flights',async () => {
      await homePage.navigate();
      await homePage.searchFlight(
        data.from,
        data.to,
        departureDate,
        returnDate,
        data.guests);
      });

      await test.step('Verify search results',async () => {
      await resultsPage.verifySearchResults();
      });

      await test.step('Sort results by cheapest',async () => {
      await resultsPage.sortByCheapest();
      });

      await test.step('Find cheapest flight across next 5 days',async () => {
      const cheapestFlight = await resultsPage.findCheapestFlightOverNext5Days();

      console.log(`Cheapest flight found on Day ${cheapestFlight.day}`);
      console.log(`Cheapest Price: ${cheapestFlight.price}`);

      expect(cheapestFlight.price).toBeGreaterThan(0);
                }
            );
        }
    );
});