'use server';

import FBIAuthService from '@/services/FBIAuth';

export async function login() {
  try {
    const token = await FBIAuthService.getToken();
    const test = await test(token);
    console.log("🚀 ~ login ~ test:", test)
    
  } catch (error) {
    console.error(error);
    throw error;
  }
}
