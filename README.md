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

Skyscanner employs anti-automation and bot-detection mechanisms that can affect standard browser automation.
During validation against the live website, an authenticated browser session connected via Chrome DevTools Protocol (CDP) was used when necessary to verify the end-to-end workflow.
Successful execution evidence is available in the attached Playwright HTML report.

## Result

All implemented test scenarios executed successfully and passed.

---


## Test Scenarios

| From | To | Departure | Return | Guests |
|------|----|------------|--------|---------|
| New York | Sydney | Today | Today + 7 | 3 |
| Boston | Amsterdam | Today + 10 | Today + 30 | 5 |
