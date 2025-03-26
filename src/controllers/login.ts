import { Request, Response } from 'express';
import querystring from 'querystring';
import {
  SPOTIFY_AUTH_URL,
  SPOTIFY_TOKEN_URL,
  USER_GRANT_PERMISSIONS,
} from '../consts/spotify';
import axios from 'axios';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

export const login = (_req: Request, res: Response) => {
  const authQuery = querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    USER_GRANT_PERMISSIONS,
    redirect_uri: REDIRECT_URI,
  });
  res.redirect(`${SPOTIFY_AUTH_URL}?${authQuery}`);
};

export const callback = async (req, res) => {
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

    const accessToken = response.data.access_token;

    res.redirect(
      `${process.env.BEATMATCH_CLIENT_URL}/?accessToken=${accessToken}`
    );
  } catch (error) {
    res.status(400).json({ error: "Failed to get spotify's access token" });
  }
};
