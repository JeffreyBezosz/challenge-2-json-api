# Challenge 2 - JSON API

Basic JSON API for chat messages built with Node.js and Express.

## Install and run

```bash
npm install
npm start
```

Local URL:

```
http://localhost:3000
```

## Routes

### Get all messages

```
GET /api/v1/messages
```

### Get one message

```
GET /api/v1/messages/:id
```

Example:

```
GET /api/v1/messages/1
```

### Filter messages by user

```
GET /api/v1/messages?user=pikachu
```

### Create a message

```
POST /api/v1/messages
```

JSON body:

```json
{
  "user": "Pikachu",
  "text": "nodejs isn't hard, or is it?"
}
```

### Update a message

```
PUT /api/v1/messages/:id
```

JSON body example:

```json
{
  "text": "Updated message"
}
```

### Delete a message

```
DELETE /api/v1/messages/:id
```

## Postman

For POST and PUT requests, use:

```
Content-Type: application/json
```

and choose **Body > raw > JSON** in Postman.

## Render

Create a **Web Service** from this GitHub repository.

- Build command: `npm install`
- Start command: `npm start`

The server uses `process.env.PORT || 3000`, so it works both locally and on Render.
