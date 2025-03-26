export interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[];
  };
}

export interface SpotifyTrack {
  name: string;
  artists: SpotifyArtist[];
  uri: string;
}

export interface SpotifyArtist {
  name: string;
}
