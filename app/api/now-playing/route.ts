import { NextResponse } from 'next/server';

export async function GET() {
  // Static "Recently Played" data since Spotify API requires Premium for live playback
  return NextResponse.json({
    isPlaying: true,
    title: "Starboy",
    artist: "The Weeknd",
    songUrl: "https://open.spotify.com/track/7MXVBY9G9ssZAVSkaYqURk",
  });
}
