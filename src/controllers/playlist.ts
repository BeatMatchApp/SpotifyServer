import axios from 'axios';
import { SPOTIFY_API_URL } from '../consts/spotify';
import {
  SpotifySearchResponse,
  SpotifyTrack,
} from '../models/interfaces/SpotifySearch';
import { TrackDetails } from '../models/interfaces/Track';

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
  const { accessToken, playlistId, songName, artist } = req.body;

  if (!accessToken || !playlistId || !songName || !artist) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const trackUri: string = await getTrackUri(accessToken, {
      songName,
      artist,
    });

    if (trackUri) {
      const response = await axios.post(
        `${SPOTIFY_API_URL}/playlists/${playlistId}/tracks`,
        { uris: [trackUri], public: false },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      res.json({ success: true, message: 'Song added!', data: response.data });
    } else {
      res.json({ success: false, message: "Song wasn't found", data: null });
    }
  } catch (error) {
    console.error('Error adding song:', error.response?.data || error);
    res.status(400).json({ error: `Failed to add song to playlist` });
  }
};

const getTrackUri = async (
  accessToken: string,
  trackDetails: TrackDetails
): Promise<string | null> => {
  const { songName, artist } = trackDetails;

  try {
    const response = await axios.get<SpotifySearchResponse>(
      `${SPOTIFY_API_URL}/search?q=${encodeURIComponent(
        songName + artist
      )}&type=track&limit=1`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const chosenTrackUri: SpotifyTrack = response.data.tracks.items[0];

    return chosenTrackUri.uri;
  } catch (error) {
    throw new Error(`Error searching song: ${error.response?.data || error}`);
  }
};
