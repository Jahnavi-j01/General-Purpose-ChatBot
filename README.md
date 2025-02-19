# General-Purpose-ChatBot

## Overview
This is a simple General Purpose Chatbot built using React for the frontend and Node.js with Express for the backend. The chatbot utilizes Groq's AI model to analyze user queries and provide structured responses based on the given topic.

## Features
- User-friendly React-based UI
- Handles user queries with topic-based filtering
- Uses Groq's AI model for intelligent responses
- Displays structured responses using React Markdown
- Express server for API communication

## Technologies Used
### Frontend:
- React
- ReactMarkdown
- Fetch API for communication with backend

### Backend:
- Node.js
- Express
- Cors
- Groq SDK

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or later)
- npm or yarn


## API Endpoints

### `POST /chat`
- **Description:** Processes user queries and returns chatbot responses.
- **Request Body:**
  ```json
  {
    "query": "Your question",
    "topic": "Related topic",
    "additional": "Additional context (optional)"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Chatbot response message"
  }
  ```

## Usage
- Open the frontend in a browser.
- Enter a query and topic.
- Click submit and receive the chatbot's response.





