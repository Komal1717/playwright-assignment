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

## Mocking Strategy

Skyscanner applies anti-bot restrictions, so mocked responses were used to enable stable, deterministic, and CI-compatible test execution.


---

## Test Scenarios

| From | To | Departure | Return | Guests |
|------|----|------------|--------|---------|
| New York | Sydney | Today | Today + 7 | 3 |
| Boston | Amsterdam | Today + 10 | Today + 30 | 5 |
