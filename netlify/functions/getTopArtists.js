// netlify/functions/getTopArtists.js
const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const username = 'leestanleysg';
  const apiKey = process.env.LASTFM_API_KEY;

  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getTopArtists&user=${username}&period=7day&limit=3&format=json&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const artists = data.topartists.artist;

    const artistList = artists.map((artist, index) =>
      index === artists.length - 1 ? `and ${artist.name}` : `${artist.name},`
    );

    const artistNames = artistList.join(" ");

    return {
      statusCode: 200,
      body: JSON.stringify({ artistNames }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
