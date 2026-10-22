const axios = require('axios');

// The API key is attached to every request, so only forward to beaconcha.in or the configured explorer.
const isAllowedHost = target => {
  if (target.protocol !== 'https:') return false;
  if (/^[a-z0-9-]+\.beaconcha\.in$/.test(target.hostname)) return true;
  const custom = process.env.REACT_APP_BEACONCHAIN_URL;
  return !!custom && new URL(custom).host === target.host;
};

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

  let requestUrl;
  try {
    requestUrl = new URL(`/api/v1/${path}`, url);
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid url parameter' }),
    };
  }

  if (
    !isAllowedHost(requestUrl) ||
    !requestUrl.pathname.startsWith('/api/v1/')
  ) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: 'url not allowed' }),
    };
  }

  const apiKey = process.env.BEACONCHAIN_API_KEY || '';

  Object.entries(otherParams).forEach(([key, value]) => {
    requestUrl.searchParams.set(key, value);
  });

  try {
    const response = await axios.get(requestUrl.toString(), {
      ...(apiKey && { headers: { Authorization: `Bearer ${apiKey}` } }),
    });

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
