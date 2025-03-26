import {
  SPOTIFY_API_URL,
  SPOTIFY_AUTH_URL,
  SPOTIFY_TOKEN_URL,
  USER_GRANT_PERMISSIONS,
} from './consts/spotify';

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const querystring = require('querystring');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Spotify credentials
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
const PORT = process.env.PORT;

// Step 1: Redirect user to Spotify login
app.get('/login', (_req, res) => {
  const authQuery = querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    USER_GRANT_PERMISSIONS,
    redirect_uri: REDIRECT_URI,
  });
  res.redirect(`${SPOTIFY_AUTH_URL}?${authQuery}`);
});

// Step 2: Get access token
app.get('/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post(
      SPOTIFY_TOKEN_URL,
      querystring.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    res.json(response.data); // Send token to frontend
  } catch (error) {
    res.status(400).json({ error: 'Failed to get access token' });
  }
});

app.get('/me', async (req, res) => {
  const { accessToken } = req.query;

  try {
    const response = await axios.get(`${SPOTIFY_API_URL}/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    res.json(response.data); // Send back user details
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch user data' });
  }
});

// Step 3: Create a new playlist
app.post('/create-playlist', async (req, res) => {
  const { accessToken, userId, playlistName } = req.body;

  try {
    const response = await axios.post(
      `${SPOTIFY_API_URL}/users/${userId}/playlists`,
      { name: playlistName, public: false },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create playlist' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
