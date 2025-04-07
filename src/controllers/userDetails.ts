import axios from 'axios';
import { Request, Response } from 'express';
import { SPOTIFY_API_URL } from '../consts/spotify';
import { generateSpotifyHeaders } from '../consts/auth';

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${SPOTIFY_API_URL}/me`, {
      headers: generateSpotifyHeaders(req),
    });

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch user data' });
  }
};
