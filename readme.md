# Connector Service for Expense Management Telegram Bot

This repository contains the Connector Service component for an expense management Telegram bot. The Connector Service interfaces between the Telegram API and the Bot Service, handling incoming messages, validating users, and forwarding messages to the Bot Service for expense processing.

## Features

- Receives incoming messages from Telegram users.
- Validates user authenticity based on a whitelist stored in a Supabase database.
- Forwards valid messages to the Bot Service for expense processing.
- Communicates back the response from the Bot Service to the respective Telegram users.
- Ensures transactional integrity using Supabase RPC transactions.
- Logs errors and events for debugging and monitoring purposes.

## Tech Stack

- **Node.js** - Runtime environment for running JavaScript on the server.
- **Express** - Web framework for Node.js.
- **TypeScript** - Optional static typing for JavaScript.
- **Supabase** - PostgreSQL database with a real-time API.
- **Axios** - HTTP client for making requests to the Bot Service.
- **Jest** - Testing framework for unit tests.

## Setup Instructions

Follow these steps to set up and run the Connector Service:

### Clone the Repository

```bash
git clone https://github.com/msantdev/connector-service.git
cd connector-service
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables
Create a .env file in the root directory with the following environment variables:

```bash
SUPABASE_URL=
SUPABASE_KEY=
BOT_SERVICE_URL=
BOT_SERVICE_API_KEY=
```

### Install Dependencies

```bash
npm install
```

### Run the Connector Service

```bash
npm run dev
```

### Example of valid request body (you can find in the docs)

```json
{
    "message": {
        "text": "Book 20 bucks",
        "chat": {
            "id": ""
        },
        "from": {
            "id": ""
        }
    }
}
```


### Additional Notes
Ensure you have the required Supabase URL and API key in your .env file.
The Connector Service communicates with the Bot Service using the sendToBotService function defined in src/client/bot.client.ts.
Messages from users are validated using the authMiddleware defined in src/middlewares/authMiddleware.ts.
Errors and events are logged using utility functions defined in src/utils/logger.ts.


### Testing


```bash
npm run test:unit
```