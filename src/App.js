import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Container, Typography, Button, TextField } from '@mui/material';

function App() {
  const [api, setApi] = useState(null);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const connectToPolkadot = async () => {
      const provider = new WsProvider('wss://rpc.polkadot.io');
      const api = await ApiPromise.create({ provider });
      setApi(api);
    };

    connectToPolkadot();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/balance', { address });
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h2" component="h1" gutterBottom>
        Polkadot Integration with Flask
      </Typography>
      <TextField
        label="Address"
        variant="outlined"
        fullWidth
        margin="normal"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={fetchBalance}>
        Fetch Balance
      </Button>
      {balance && (
        <Typography variant="h6" component="h2" gutterBottom>
          Balance: {balance}
        </Typography>
      )}
    </Container>
  );
}

export default App;
