/**
 * API utility for building URLs with environment-based configuration
 * 
 * Requires VITE_CODESPACE_NAME to be set in .env.local for Codespace deployments.
 * Falls back to http://localhost:8000 if VITE_CODESPACE_NAME is not defined.
 */

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (!codespaceName) {
    console.warn(
      'VITE_CODESPACE_NAME is not defined. Falling back to localhost. ' +
      'For Codespace deployments, set VITE_CODESPACE_NAME in .env.local'
    );
    return 'http://localhost:8000';
  }
  
  return `https://${codespaceName}-8000.app.github.dev`;
};

export const buildApiUrl = (endpoint) => {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}/api${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
};

/**
 * Fetch with error handling and JSON response parsing
 */
export const apiFetch = async (endpoint) => {
  const url = buildApiUrl(endpoint);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    throw error;
  }
};

/**
 * Helper to handle both paginated responses and array responses
 * Paginated: { data: [...], total: number, page: number, pageSize: number }
 * Array: [...]
 */
export const extractDataFromResponse = (response) => {
  if (Array.isArray(response)) {
    return { data: response, total: response.length, isPaginated: false };
  }
  if (response && response.data !== undefined) {
    return { 
      data: response.data, 
      total: response.total || response.data.length,
      page: response.page,
      pageSize: response.pageSize,
      isPaginated: true 
    };
  }
  return { data: [], total: 0, isPaginated: false };
};
