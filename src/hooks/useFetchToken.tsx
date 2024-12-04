"use client";
import useLocalStorage from '@/hooks/useLocalStorage';

export default async function useFetchToken() {
    const [storedValue, setValue] = useLocalStorage<string | null>('FFBB_TOKEN', null);
    if (storedValue) {
        return storedValue;
    } else {
        const response = await fetch('/api/auth/ffbb/token');
        const token = await response.text();
        setValue(token);
    }
};