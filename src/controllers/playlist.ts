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

export const addSong = async (req, res) => {
  const { accessToken, playlistId, trackUri } = req.body;

  if (!accessToken || !playlistId || !trackUri) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const response = await axios.post(
      `${SPOTIFY_API_URL}/playlists/${playlistId}/tracks`,
      { uris: [trackUri], public: false },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    res.json({ success: true, message: 'Song added!', data: response.data });
  } catch (error) {
    console.error('Error adding song:', error.response?.data || error);
    res.status(400).json({ error: `Failed to add song to playlist` });
  }
};
