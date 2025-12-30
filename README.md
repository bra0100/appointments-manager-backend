
# Appointmen Management System - Backend.

REST API developed with Node.js and Express, following a layered architecture approach.

This project is part of a technical challenge and is under active development. 

## Tech Stack.
- Node.js
- Express
- Javascript (ES Modules)

---

## Architecture.

This backend follows a clear separation of concerns:

Routes -> Controllers -> Services

Each layer has a single responsibility:
-- Routes: define HTTP endpoints.
-- Controllers: handle request and responses.
-- Services: contain business logic and validations

---

## Project Structure

src/
    constants/
    controllers/
    routes/
    services/

---

## How to run

npm install
npm test

The server will run at:

http://localhost:3000

---

## Notes

Database is not implemented yet (in-memory data for now)
