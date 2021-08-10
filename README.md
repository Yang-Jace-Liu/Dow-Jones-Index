# Installation

Create a `.env` file under the home directory of the project, then put `DATABASE_URL` parameter inside.

Here's an example of the `.env` file I'm using during development.

```dotenv
# POSTGRESQL
DATABASE_URL="postgres://postgres:postgres@localhost:5432/DowJonesIndex"
```

# Run

## To insert data into database

```bash
npm run init <data file path>
```

## To start the application

By default, the application open `http://127.0.0.1:5000` for listening.
 
```bash
npm start
```

## To run tests

```bash
npm test
```

# API Routes

|Route|Method|Function|
|-----|------|--------|
|`/api/record`|POST|Add a new record|
|`/api/records`|POST|Add a bulk data set|
|`/api/records`|GET|Query for data by stock ticker|

# Example of API usages

## POST: `api/record`

Content-Type: application/json

```json
{
    "quarter": 2,
    "stock": "AA",
    "date": "2011-07-01",
    "open": 15.82,
    "high": 20,
    "low": 18.1,
    "close": 17.3,
    "volume": 10000000,
    "percent_change_price": 1.234,
    "next_weeks_open": 12.34,
    "next_weeks_close": 14.56,
    "percent_change_next_weeks_price": 1.123,
    "days_to_next_dividend": 123,
    "percent_return_next_dividend": 1.321
}
```

## POST: `api/records`
Content-Type: application/json

```json
{
    "data": [
        {
            "quarter": 3,
            "stock": "AA",
            "date": "2011-07-01",
            "open": 15.82,
            "high": 20,
            "low": 18.1,
            "close": 17.3,
            "volume": 10000000,
            "percent_change_price": 1.234,
            "next_weeks_open": 12.34,
            "next_weeks_close": 14.56,
            "percent_change_next_weeks_price": 1.123,
            "days_to_next_dividend": 123,
            "percent_return_next_dividend": 1.321
        },
        {
            "quarter": 1,
            "stock": "AABD",
            "date": "2011-07-01",
            "open": 15.82,
            "high": 20,
            "low": 18.1,
            "close": 17.3,
            "volume": 10000000,
            "percent_change_price": 1.234,
            "next_weeks_open": 12.34,
            "next_weeks_close": 14.56,
            "percent_change_next_weeks_price": 1.123,
            "days_to_next_dividend": 123,
            "percent_return_next_dividend": 1.321
        }
    ]
}
```

## GET `/api/records`

Access http://127.0.0.1:5000/api/records?stock=AA

# Todos

- [ ] Unit tests and integration tests
- [ ] Authentication
- [ ] Replicates Checking
- [ ] OpenAPI documents
- [ ] Better Input Validation
- [ ] Universal Error Handling
- [ ] Universal Data Format
- [ ] Input Sanitizing
- [ ] Different levels of logging
- [ ] Architecture optimization
