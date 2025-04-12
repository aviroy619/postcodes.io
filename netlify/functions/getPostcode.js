const fetch = require('node-fetch');

exports.handler = async function(event) {
  const { postcode } = event.queryStringParameters;

  if (!postcode) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing postcode parameter' }),
    };
  }

  const url = `https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch postcode info', detail: err.message }),
    };
  }
};
