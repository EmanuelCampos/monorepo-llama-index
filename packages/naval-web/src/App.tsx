import React, { useState } from 'react';

const NavalWebsite = () => {
  const [apiKey, setApiKey] = useState('');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform a fetch request to get the response
    try {
      const response = await fetch('http://127.0.0.1:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, apiKey }),
      });

      const data = await response.json();

      setResponse(data.answer);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
    }}>
      <h1>Ask Naval</h1>
      <form onSubmit={handleSubmit} style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
      }}>
        <label htmlFor="question">What would you like to know about Naval Essays?</label>
        <input
          type="text"
          id="question"
          required
          placeholder='e.g. "How do I get rich?"'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{
            width: '300px',
            height: '2rem',
          }}
        />
        <input
          type="password"
          id="api-key"
          placeholder='Your OpenAI API key'
          value={apiKey}
          required
          onChange={(e) => setApiKey(e.target.value)}
          style={{
            width: '300px',
            height: '2rem',
          }}
        />
        <button type="submit">Submit</button>
      </form>
      <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          maxWidth: '600px',
          textAlign: 'center',
      }}>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default NavalWebsite;