import React from 'react';
import { useEffect, useState } from 'react';
import { verify } from "@meta-network/auth-sdk";
import './App.css';

function App() {
  const [token, setToken] = useState('');
  const [aud, setAud] = useState('');
  const [verifiedResult, setVRes] = useState('')
  const [error, setError] = useState(null);
  const [publicKey, setPublicKey] = useState(undefined);
  useEffect(() => {
    if (!token || !aud) return;
    console.info('token changed to: ', token);
    try {
      // publicKey is undefined should use its default key
      const res = verify(token, aud, publicKey);
      setVRes(res);
      setError(null)
    } catch (error) {
      setError(error)
    }
  }, [token, aud, publicKey]);
  return (
    <main>
      <h1><code>@meta-network/auth-sdk</code> Demo</h1>
      { error && <div>Error happened: { JSON.stringify(error) }</div> }
      <input placeholder="Enter aud field for JWT..." onChange={e => setAud(e.target.value)}></input>
      <textarea onChange={e => setToken(e.target.value)}></textarea>
      <textarea onChange={e => setPublicKey(e.target.value === '' ? undefined : e.target.value)} placeholder="Custom Public key..."></textarea>
      { verifiedResult && <div>
        <h2>Parsed successfully</h2>
        <pre>{JSON.stringify(verifiedResult, null, 2)}</pre>
      </div> }
    </main>
  );
}

export default App;
