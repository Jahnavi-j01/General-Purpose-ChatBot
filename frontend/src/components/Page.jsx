import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
const App = () => {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('');
  const [additional, setAdditional] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, topic, additional }),
      });
      const data = await res.json();
      setResponse(data.message);
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while processing your request.');
    }
    setIsLoading(false);
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f0f4f8',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    }}>
      <h1 style={{
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: '30px',
      }}>General Purpose Chatbot</h1>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your query"
          required
          style={inputStyle}
        />
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter the topic"
          required
          style={inputStyle}
        />
        <textarea
          value={additional}
          onChange={(e) => setAdditional(e.target.value)}
          placeholder="Additional information (optional)"
          style={{...inputStyle, minHeight: '100px'}}
        />
        <button type="submit" disabled={isLoading} style={{
          backgroundColor: '#3498db',
          color: 'white',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}>
          {isLoading ? 'Processing...' : 'Submit'}
        </button>
      </form>
      {response && (
        <div style={{
          marginTop: '30px',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}>
          <h2 style={{color: '#2c3e50', marginBottom: '10px'}}>Response:</h2>
          <p style={{color: '#34495e', lineHeight: '1.6'}}><ReactMarkdown>{response}</ReactMarkdown></p>
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #bdc3c7',
  borderRadius: '5px',
  width: '100%',
  boxSizing: 'border-box',
};

export default App;