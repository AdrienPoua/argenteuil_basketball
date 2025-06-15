'use server';

import FBIAuthService from '@/services/FBIAuth';
import { test } from './test';

export async function login() {
  try {
    const token = await FBIAuthService.getToken();
    await test(token);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
