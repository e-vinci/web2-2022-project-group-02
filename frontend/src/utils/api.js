import { getAuthenticatedUser } from './auths';

const CALL_PREFIX = process.env.API_BASE_URL;
const TIMEOUT = 5 * 60 * 1000;

class API {
  /**
   * Call the API
   * @param {string} endpoint - The API endpoint
   * @param {object?} options - The options to use for the fetch call, if any
   * @returns {Promise<object>} - The response
   */
  static async call(endpoint, fetchOptions) {
    const controller = new AbortController();

    if (!fetchOptions?.timeout || fetchOptions.timeout > 0)
      setTimeout(() => controller.abort(), fetchOptions?.timeout || TIMEOUT);

    const user = getAuthenticatedUser();

    const response = await fetch(this.resolvePath(endpoint), {
      ...(fetchOptions || {}),
      headers: {
        'Content-Type': 'application/json',
        ...(user ? { Authorization: user.token } : {}),
        ...(fetchOptions?.headers || {}),
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      const reply = await response.json().catch(() => null);
      if (reply?.error) throw new Error(reply.error);

      throw new Error(response.statusText);
    }

    if (fetchOptions?.raw) return response;

    const reply = await response.json();

    if (typeof reply !== 'object' || reply === null) throw new Error('Unexpected server response');

    return reply;
  }

  /**
   * Call the API with GET
   * @param {string} endpoint - The API endpoint
   * @param {object?} query - The query to send, if any
   * @returns {Promise<object>} - The response
   */
  static GET(endpoint, query = {}) {
    const params = new URLSearchParams(query);
    const paramSep = endpoint.includes('?') ? '&' : '?';

    if (typeof query === 'object')
      return this.call(`${endpoint}${params.toString() ? `${paramSep}${params}` : ''}`);

    return this.call(endpoint);
  }

  /**
   * Call the API with POST
   * @param {string} endpoint - The API endpoint
   * @param {object?} data - The data to send, if any
   * @returns {Promise<object>} - The response
   */
  static POST(endpoint, data) {
    return this.call(endpoint, { method: 'post', body: data ? JSON.stringify(data) : null });
  }

  /**
   * Call the API with PUT
   * @param {string} endpoint - The API endpoint
   * @param {object?} data - The data to send, if any
   * @returns {Promise<object>} - The response
   */
  static PUT(endpoint, data) {
    return this.call(endpoint, { method: 'put', body: data ? JSON.stringify(data) : null });
  }

  /**
   * Call the API with DELETE
   * @param {string} endpoint - The API endpoint
   * @param {object?} data - The data to send, if any
   * @returns {Promise<object>} - The response
   */
  static DELETE(endpoint, data) {
    return this.call(endpoint, { method: 'delete', body: data ? JSON.stringify(data) : null });
  }

  /**
   * Resolve a path to the API
   * @param {string} path - The path to resolve
   * @returns {string} - The resolved path
   */
  static resolvePath(endpoint) {
    return CALL_PREFIX + endpoint;
  }
}

export default API;
export { CALL_PREFIX };
