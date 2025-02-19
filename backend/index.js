// index.js
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
// Initialize Groq with your API key
const groq = new Groq({
  apiKey: "YOUR_API_KEY"
});

app.get("/", (req, res) => {
  res.status(200).send({ message: "HELLO" });
});

// POST /chat endpoint for handling chat messages without previous history
app.post('/chat', async (req, res) => {
  try {
    const { query, topic, additional } = req.body;
    if (!query || !topic) {
      return res
        .status(400)
        .json({ error: "Both 'query' and 'topic' are required." });
    }

    // Construct a new conversation for the current request
    const messages = [
      {
        role: "system",
        content: "You are a helpful general purpose chatbot that analyzes user queries and provides answers in a structured format. Don't answer the query if it's not related to the topic given, instead, just say, 'The given query is not related to the provided topic <topicname>.' and nothing else."
      },
      {
        role: "user",
        content: `Query: ${query}\nTopic: ${topic}\nAdditional Info: ${additional || ''}`
      }
    ];

    // Create the chat completion request using the current conversation
    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "llama-3.3-70b-versatile",
      stop: "```"
    });

    // Accumulate the streamed answer chunks into a string.
    let answer = chatCompletion;

    // Send the answer back to the client in JSON format.
    res.json({ message: answer.choices[0].message.content });
  } catch (err) {
    console.error("Error during chat completion:", err);
    res.status(500).json({ 
      error: "An error occurred while processing your request.",
      details: err.message 
    });
  }
});

// Start the server.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
