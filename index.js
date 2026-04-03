const express = require('express');
const cors = require('cors');
const { AccessToken } = require('livekit-server-sdk');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.LIVEKIT_API_KEY || 'API7jiDr3tKBDX5';
const API_SECRET = process.env.LIVEKIT_API_SECRET || 'IUNHLKt1nIhCfgP32QLsetspPLCaAlHMguKCnQ4CeN2B';

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/token', async (req, res) => {
  const { roomName, participantName } = req.body;
  const token = new AccessToken(API_KEY, API_SECRET, {
    identity: participantName,
  });
  token.addGrant({ roomJoin: true, room: roomName });
  const jwt = await token.toJwt();
  res.json({ token: jwt });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
