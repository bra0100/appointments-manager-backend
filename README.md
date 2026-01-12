
# Appointments Management System - Backend.

REST API developed with Node.js and Express, following a layered architecture approach.

This project is part of a technical challenge and is under active development. 

## Overview

The system allows:

- Managing **clients**
- Managing **services**
- Creating and managing **appointments**
- Preventing **double booking**
- Enforcing appointment state transitions

The backend exposes a REST API consumed by a future SPA frontend.

## Tech Stack.

- Node.js
- Express
- Javascript (ES Modules)

---

## Architecture.

This project follows a **layered architecture**:

Routes -> Controllers -> Services -> Repositories -> Database

### Layers responsibilities

-- **Routes**: define HTTP endpoints.
-- **Controllers**: handle request and responses.
-- **Services**: contain business logic and validations.
-- **Repositories**: handle database access (SQL).
-- **Database**: SQLite relational database.

## Database Design

Normalized and structured as: 

### Clients
- `id` (PK)
- `name`
- `active` (soft delete)

### Services
- `id` (PK)
- `name`
- `price`
- `description`
- `active`

### Appointments
- `id` (PK)
- `clientId` (FK)
- `serviceId` (FK)
- `date`
- `time`
- `status` (`pending`, `attended`. `cancelled`)

## Project Structure

src/
  -  constants/
  -  controllers/
  -  db/
  -  repositories/
  -  routes/
  - services/
test/

## API Endpoints

### Clients
- `GET /clients`
- `POST /clients`

### Services
- `GET /services`
- `POST /services`

### Appointments
- `GET /appointments`
- `GET /appointments?status=pending`
- `POST /appointments`
- `PATCH /appointments/:id/cancel` 
- `PATCH /appointments/:id/attend` 
- `PATCH /appointments/:id/reschedule` 

Query parameters are used for filtering.

## DTOs

The API uses **implicit DTOs**.
Controllers expose only the necessary fields to the client, decoupling internal database structures form API responses.

## Testing

The project includes integration test using **Jest** and **Supertest**.

## How to run

### Test and Server

Server -> npm start (http://localhost:3000)
test -> npm test

### Requirements
- Node.js
- npm

### Installation

```bash
git clone https://github.com/bra0100/appointments-manager-backend.git
cd appointments-manager-backend
npm install


## Notes

This project uses Node.js instead of .NET, but strictly follows the same architectural principles requires required in the original specification.

Developed as a backend architecture and domain-driven practice project/