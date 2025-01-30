const extranetTokenEndpoint = '/api/auth/ffbb/token';

class AuthTokenManager {
  async fetchExtranetToken() {
    const response = await fetch(extranetTokenEndpoint, {
      headers: {
        'X-Custom-Request-ID': Date.now().toString(),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const token = await response.text();
    localStorage.setItem('FFBB_TOKEN', token);
    return token;
  }
}

const authTokenManager = new AuthTokenManager();

export default authTokenManager;
