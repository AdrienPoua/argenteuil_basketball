"use client";

import { useState, useEffect } from "react";

interface TokenData {
  token: string;
  expiresAt: number;
}

export default function useToken() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedData = localStorage.getItem("FFBB_TOKEN");
        if (storedData) {
          const parsedData: TokenData = JSON.parse(storedData);
          if (Date.now() < parsedData.expiresAt) {
            setToken(parsedData.token);
            setIsLoading(false);
            return;
          }
        }

        const response = await fetch("/api/auth/ffbb/token");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newToken = await response.text();
        console.log("🚀 ~ fetchToken ~ newToken:", newToken)
        const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // Token expires in 24 hours
        const tokenData: TokenData = { token: newToken, expiresAt };
        localStorage.setItem("FFBB_TOKEN", JSON.stringify(tokenData));
        setToken(newToken);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, []);

  const refreshToken = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/ffbb/token");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newToken = await response.text();
      const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // Token expires in 24 hours
      const tokenData: TokenData = { token: newToken, expiresAt };
      localStorage.setItem("FFBB_TOKEN", JSON.stringify(tokenData));
      setToken(newToken);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An unknown error occurred"));
    } finally {
      setIsLoading(false);
    }
  };

  return { token, isLoading, error, refreshToken };
}

