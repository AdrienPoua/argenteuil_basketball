"use client";

import { useState, useEffect } from "react";
import FFBBTokenHelper from "@/models/FFBBToken";


export default function useToken() {
  const [token, setToken] = useState<string | null>(null);
  const FFBBToken = new FFBBTokenHelper();

  useEffect(() => {
    const getToken = async () => {
      try {
        const localToken = FFBBToken.getToken();
        if (localToken) {
          setToken(localToken);
        } else {
          const token = await FFBBToken.fetchToken();
          setToken(token);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };
    getToken();
  }, []);

  return { token };
}
