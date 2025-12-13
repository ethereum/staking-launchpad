const axios = require('axios');

exports.handler = async function(event) {
  // Get the API path and base URL from query parameters
  const { path, url, ...otherParams } = event.queryStringParameters || {};

  if (!path) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing path parameter' }),
    };
  }

  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing url parameter' }),
    };
  }

  const BEACONCHAIN_API_KEY = process.env.BEACONCHAIN_API_KEY || '';

  // Build the full URL with API key
  const params = new URLSearchParams({
    ...otherParams,
    ...(BEACONCHAIN_API_KEY && { apikey: BEACONCHAIN_API_KEY }),
  });

  const fullUrl = `${url}/api/v1/${path}?${params.toString()}`;

  try {
    const response = await axios.get(fullUrl);

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Beaconchain API error:', error.message);

    return {
      statusCode: error.response?.status || 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Failed to fetch from Beaconchain API',
        message: error.message,
      }),
    };
  }
};
