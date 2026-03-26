# Shipping Carrier Service

A TypeScript service that integrates with shipping carriers to fetch and normalize shipping rates. Currently supports **UPS (mocked)** with an extensible architecture for adding more carriers.

---

## Features

* Rate fetching with normalized output
* OAuth token caching & reuse
* Extensible carrier architecture
* Zod validation (input + output)
* Structured error handling
* Integration tests with stubbed responses

---

## Architecture

    src/
    ├── core/        # types, interfaces, schemas
    ├── carriers/    # UPS implementation
    ├── utils/       # error handling
    └── tests/       # integration tests

* Each carrier implements a common interface.
* Internal models are independent of external APIs.

---

## Authentication

* OAuth 2.0 client credentials.
* Token cached and reused until expiry.

---

## Getting Started

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

    UPS_CLIENT_ID=
    UPS_CLIENT_SECRET=
    UPS_BASE_URL=
    UPS_AUTH_URL=

### Installation & Execution

Install the dependencies and start the development server:

    npm install
    npm run dev

---

## Testing

Run the integration tests using the following command:

    npm run test

**Test Coverage Includes:**
* Success case
* Invalid input
* Invalid API response
* Token reuse

---

## Notes

> * **Mocked API:** The UPS API is mocked, so no real credentials are required to run the current setup.
> * **Extensibility:** The service is designed for easy extension to support additional carriers (e.g., FedEx, DHL).