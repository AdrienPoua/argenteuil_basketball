type HTTPRequestBuilder = {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: any;
};

export default class HTTPRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: any;

  constructor(builder: HTTPRequestBuilder) {
    this.url = builder.url;
    this.method = builder.method;
    this.headers = builder.headers;
    this.body = builder.body;
  }

  async send() {
    const options = {
      method: this.method,
      headers: this.headers,
      body: this.body ? JSON.stringify(this.body) : null,
    };

    const response = await fetch(this.url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error: ${response.status} - ${errorText}`);
    }
    return await response.json();
  }

  static get Builder() {
    return class Builder {
      url: string;
      method: string;
      headers: Record<string, string>;
      body: any;

      constructor() {
        this.url = '';
        this.method = 'GET';
        this.headers = {};
        this.body = null;
      }

      setUrl(url: string) {
        this.url = url;
        return this; // Permet le chaînage
      }

      setMethod(method: string) {
        this.method = method;
        return this; // Permet le chaînage
      }

      addHeader(key: string, value: string) {
        this.headers[key] = value;
        return this; // Permet le chaînage
      }

      setBody(body: any) {
        this.body = body;
        return this; // Permet le chaînage
      }

      build() {
        return new HTTPRequest(this);
      }
    };
  }
}
