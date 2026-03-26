import { httpClient } from "./../utils/http";

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

export async function getUPSToken(): Promise<string> {
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const response = await mockAuthCall();

  cachedToken = response.access_token;
  tokenExpiry = Date.now() + response.expires_in * 1000;

  return cachedToken;
}

async function mockAuthCall() {
  return {
    access_token: "mock-ups-token",
    expires_in: 3600,
  };
}