import axios from 'axios';
import { SPOTIFY_API_URL } from '../consts/spotify';

export const createPlaylist = async (req, res) => {
  const { accessToken, userId, playlistName } = req.body;

  try {
    const response = await axios.post(
      `${SPOTIFY_API_URL}/users/${userId}/playlists`,
      { name: playlistName, public: false },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    res.json(response.data);
  } catch (error) {
    res
      .status(400)
      .json({ error: `Failed to create playlist for user ${userId}` });
  }
};
