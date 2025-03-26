import { Request, Response } from 'express';
import querystring from 'querystring';
import {
  SPOTIFY_AUTH_URL,
  SPOTIFY_TOKEN_URL,
  USER_GRANT_PERMISSIONS,
} from '../consts/spotify';
import axios from 'axios';
import { envVariables } from '../config/config';

const CLIENT_ID = envVariables.clientId;
const CLIENT_SECRET = envVariables.clientSecret;
const REDIRECT_URI = envVariables.redirectURI;

export const login = (_req: Request, res: Response) => {
  const authQuery = querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: USER_GRANT_PERMISSIONS.join(' '),
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

    res.redirect(`${envVariables.beatMatchURL}/?accessToken=${accessToken}`);
  } catch (error) {
    res.status(400).json({ error: "Failed to get spotify's access token" });
  }
};
