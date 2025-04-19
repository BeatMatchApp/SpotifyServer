import { Request, Response } from 'express';

export const generateSpotifyHeaders = (req: Request) => {
  const tokens = getTokens(req);
  if (tokens.accessToken) {
    return {
      Authorization: `Bearer ${tokens.accessToken}`,
    };
  }
  return {};
};

export const getTokens = (req: Request) => {
  const accessToken = req.cookies.spotify_access_token;
  const refreshToken = req.cookies.spotify_refresh_token;

  return {
    accessToken,
    refreshToken,
  };
};
