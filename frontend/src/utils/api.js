const CALL_PREFIX = process.env.API_BASE_URL;
const TIMEOUT = 10000;

class API {
  /**
   * Call the API
   * @param {string} endpoint - The API endpoint
   * @param {object?} options - The options to use for the fetch call, if any
   * @returns {Promise<object>} - The response
   */
  static async call(endpoint, fetchOptions) {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), TIMEOUT);

    const response = await fetch(this.resolvePath(endpoint), {
      ...(fetchOptions || {}),
      headers: {
        'Content-Type': 'application/json',
        ...(fetchOptions?.headers || {}),
      },
      signal: controller.signal,
    });

    if (!response.ok) throw new Error(response.statusText);

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
    if (typeof query === 'object') return this.call(`${endpoint}?${new URLSearchParams(query)}`);

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
   * Resolve a path to the API
   * @param {string} path - The path to resolve
   * @returns {string} - The resolved path
   */
  static resolvePath(endpoint) {
    return CALL_PREFIX + endpoint;
  }
}

export default API;
