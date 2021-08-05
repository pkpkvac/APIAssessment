// These should be in .env.local, and hidden from users
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { channel } = req.query;
    const params = channel.split('&');

    let query;
    if (params.length > 1) {
      // in case there is a cursor to search after.
      query = `query=${params[0]}&after=${params[1]}`;
    } else {
      query = `query=${params[0]}`;
    }

    const response = await fetch(
      `https://api.twitch.tv/helix/search/channels?${query}`,
      {
        method: 'GET',
        headers: {
          'Client-ID': process.env.TWITCH_CLIENT_ID,
          Accept: 'application/vnd.twitchtv.v5+json',
          Authorization: 'Bearer ' + process.env.ACCESS_TOKEN,
        },
      }
    );

    if (response.ok) {
      const dataObj = await response.json();

      res.status(200).send({ data: dataObj });
    } else {
      res.status(404).send({
        error: 'Failed to find channel',
      });
    }
  }
}
