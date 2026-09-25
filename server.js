const express = require("express");
const { randomUUID } = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let messages = [
  {
    _id: "1",
    user: "John",
    text: "Hello"
  },
  {
    _id: "2",
    user: "Jane",
    text: "Hi"
  },
  {
    _id: "3",
    user: "pikachu",
    text: "Hi! I'm a message"
  },
  {
    _id: "4",
    user: "pikachu",
    text: "Hi! I'm another message"
  }
];

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Challenge 2 JSON API is running"
  });
});

// GET all messages, or filter by user with ?user=username
app.get("/api/v1/messages", (req, res) => {
  const { user } = req.query;

  if (user) {
    const filteredMessages = messages.filter(
      (message) => message.user.toLowerCase() === user.toLowerCase()
    );

    return res.status(200).json({
      status: "success",
      message: `Messages from user ${user}`,
      data: {
        messages: filteredMessages
      }
    });
  }

  res.status(200).json({
    status: "success",
    message: "GETTING messages",
    data: {
      messages
    }
  });
});

// GET one message by id
app.get("/api/v1/messages/:id", (req, res) => {
  const message = messages.find((item) => item._id === req.params.id);

  if (!message) {
    return res.status(404).json({
      status: "fail",
      message: "Message not found"
    });
  }

  res.status(200).json({
    status: "success",
    message: `GETTING message ${req.params.id}`,
    data: {
      message
    }
  });
});

// POST a new message
app.post("/api/v1/messages", (req, res) => {
  const { user, text } = req.body;

  if (!user || !text) {
    return res.status(400).json({
      status: "fail",
      message: "Both user and text are required"
    });
  }

  const newMessage = {
    _id: randomUUID(),
    user,
    text
  };

  messages.push(newMessage);

  res.status(201).json({
    status: "success",
    message: "Message saved",
    data: {
      message: newMessage
    }
  });
});

// PUT/update one message by id
app.put("/api/v1/messages/:id", (req, res) => {
  const message = messages.find((item) => item._id === req.params.id);

  if (!message) {
    return res.status(404).json({
      status: "fail",
      message: "Message not found"
    });
  }

  const { user, text } = req.body;

  if (!user && !text) {
    return res.status(400).json({
      status: "fail",
      message: "Provide a user or text to update"
    });
  }

  if (user) {
    message.user = user;
  }

  if (text) {
    message.text = text;
  }

  res.status(200).json({
    status: "success",
    message: "Message updated",
    data: {
      message
    }
  });
});

// DELETE one message by id
app.delete("/api/v1/messages/:id", (req, res) => {
  const messageIndex = messages.findIndex(
    (item) => item._id === req.params.id
  );

  if (messageIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Message not found"
    });
  }

  const deletedMessage = messages.splice(messageIndex, 1)[0];

  res.status(200).json({
    status: "success",
    message: "Message deleted",
    data: {
      message: deletedMessage
    }
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
