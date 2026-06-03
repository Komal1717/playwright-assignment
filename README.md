# Playwright Flight Search Automation Assignment

## Overview
This project is built using Playwright with TypeScript following a Page Object Model (POM) design pattern to create a reusable and maintainable automation framework.

The framework validates flight search functionality including:
- Dynamic city search
- Dynamic departure and return dates
- Guest selection
- Flight result validation
- Cheapest flight identification across 5 days
- Multi-browser execution

---

## Framework Structure

- `pages/` → Page Object classes and reusable UI actions
- `e2e/` → Test specifications
- `utils/` → Date utility and API helpers
- `test-data/` → Reusable test datasets

 Features Covered

-Data-driven execution
- Dynamic date handling
- Mocked deterministic flow
- Flight result validation
- Cheapest flight identification
- Multi-browser execution
- HTML reporting and traces

---

##Notes

# Skyscanner Flight Search Automation

## Overview

This project automates flight search scenarios on Skyscanner using Playwright and TypeScript following the Page Object Model (POM) design pattern.

## Features

* Flight search automation
* Dynamic date selection
* Traveller selection
* Search result validation
* Sort by cheapest fare
* Find the cheapest fare across the next 5 days

## Tech Stack

* Playwright
* TypeScript
* Page Object Model (POM)

## Execution

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npx playwright test
```

View report:

```bash
npx playwright show-report
```

## Reporting

The framework generates:

* HTML Reports
* Screenshots
* Traces
* Failure Videos

## Note

Skyscanner employs anti-automation and bot-detection mechanisms that can affect standard browser automation.
During validation against the live website, an authenticated browser session connected via Chrome DevTools Protocol (CDP) was used when necessary to verify the end-to-end workflow.

Successful execution evidence is available in the attached Playwright HTML report.

## Result

All implemented test scenarios executed successfully and passed.

---## Mocking Strategy

Skyscanner applies anti-bot restrictions, so mocked responses were used to enable stable, deterministic, and CI-compatible test execution.



## Test Scenarios

| From | To | Departure | Return | Guests |
|------|----|------------|--------|---------|
| New York | Sydney | Today | Today + 7 | 3 |
| Boston | Amsterdam | Today + 10 | Today + 30 | 5 |
