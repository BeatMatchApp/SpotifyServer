import axios from 'axios';
import { SPOTIFY_API_URL } from '../consts/spotify';

export const getUserDetails = async (req, res) => {
  const { accessToken } = req.query;

  try {
    const response = await axios.get(`${SPOTIFY_API_URL}/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch user data' });
  }
};
