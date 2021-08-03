// These should be in .env.local, and hidden from users

const TWITCH_CLIENT_ID = '2fnrhgi6m2bqn28yg0qi5ncmcpnfcb';
// const TWITCH_SECRET = '82m0v2147uqjyy5rbo8awpufaxlzqj';
const ACCESS_TOKEN = 'pl666u6akj6wpxg6flan7k821sfb7l';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { channel } = req.query;

    const response = await fetch(
      `https://api.twitch.tv/helix/channels?broadcaster_id=${channel}`,
      {
        method: 'GET',
        headers: {
          'Client-ID': TWITCH_CLIENT_ID,
          Accept: 'application/vnd.twitchtv.v5+json',
          Authorization: 'Bearer ' + ACCESS_TOKEN,
        },
      }
    );

    const dataObj = await response.json();

    const returnData = {
      game_name: dataObj.data[0].game_name,
      channel: channel,
      title: dataObj.data[0].title,
      broadcaster_name: dataObj.data[0].broadcaster_name,
    };

    if (response.ok) {
      res.status(200).send({ data: returnData });
    } else {
      res.status(404).send({
        error: 'Failed to find channel',
      });
    }
  }
}
