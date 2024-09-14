# in.orbit server

This project is an API server built with Fastify, Drizzle ORM, and PostgreSQL.

## Prerequisites

- Node.js 20
- Docker and Docker Compose

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in the required values
3. Install dependencies: `npm install`

## Environment Variables

Create a `.env` file based on `.env.example`

## Database

Start the PostgreSQL container:

```bash
docker-compose up -d
```

## Running the Server

Start the server in development mode:

```bash
npm run dev
```

The API will be available at `http://localhost:3333` (or the port specified in your `.env` file).

## API Documentation
