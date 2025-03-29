# Mini Data Query Simulation Engine

## Overview
This is a backend API that simulates a Gen AI-powered data query system, allowing natural language queries to be converted into pseudo-SQL.

## Features
- Convert natural language queries into SQL
- Mock database (in-memory SQLite)
- Basic authentication
- Endpoints:
  - `/query`: Execute a simulated query
  - `/explain`: Explain query conversion
  - `/validate`: Validate query feasibility

## Tech Stack
- Node.js, Express.js
- SQLite (in-memory)
- dotenv, body-parser, CORS

## Setup Instructions
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/mini-query-engine.git
   cd mini-query-engine
