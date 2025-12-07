import { google } from 'googleapis';
import { Readable } from 'stream';

export const youtube = google.youtube('v3');

type UploadOptions = {
  accessToken: string;
  title: string;
  description: string;
  videoStream: Readable; 
  privacyStatus?: 'private' | 'unlisted' | 'public';
};

export async function uploadVideo({ 
  accessToken, 
  title, 
  description, 
  videoStream, 
  privacyStatus = 'private' 
}: UploadOptions) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const response = await youtube.videos.insert({
    auth,
    part: ['snippet', 'status'],
    requestBody: {
      snippet: {
        title,
        description,
      },
      status: {
        privacyStatus,
      },
    },
    media: {
      body: videoStream,
    },
  });

  return response.data;
}

export async function fetchChannelVideos(accessToken: string) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  // 1. Get the user's channel ID (mine: true)
  const channelRes = await youtube.channels.list({
    auth,
    part: ['contentDetails', 'snippet'],
    mine: true,
  });

  const uploadsPlaylistId = channelRes.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsPlaylistId) return [];

  // 2. Get videos from the "Uploads" playlist
  const playlistItems = await youtube.playlistItems.list({
    auth,
    part: ['snippet', 'contentDetails'],
    playlistId: uploadsPlaylistId,
    maxResults: 50, // Limit for now
  });

  return playlistItems.data.items || [];
}

export async function fetchVideoAnalytics(accessToken: string, videoIds: string[]) {
    // Note: To get detailed analytics we need the YouTube Analytics API, not Data API v3.
    // However, basic view counts are available in the Data API via videos.list
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const videos = await youtube.videos.list({
        auth,
        part: ['statistics', 'snippet'],
        id: videoIds
    });

    return videos.data.items || [];
}
