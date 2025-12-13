import { BEACONCHAIN_URL, IS_DEV } from './envVars';

/**
 * Helper function to build Beaconcha.in API URL
 * In development: calls API directly without key
 * In production: routes through Netlify function with server-side key
 *
 * @param path - The API path (e.g., 'validator/123', 'ethstore/latest')
 * @param queryParams - Optional query parameters to append
 * @returns The full URL to call
 */
export const getBeaconchainV1ApiUrl = (
  path: string,
  queryParams?: Record<string, string | number>
): string => {
  if (IS_DEV) {
    const params = new URLSearchParams(queryParams as Record<string, string>);
    const queryString = params.toString();
    return `${BEACONCHAIN_URL}/api/v1/${path}${
      queryString ? `?${queryString}` : ''
    }`;
  }

  const params = new URLSearchParams({
    path,
    url: BEACONCHAIN_URL,
    ...(queryParams as Record<string, string>),
  });
  return `/.netlify/functions/beaconchain-api?${params.toString()}`;
};
