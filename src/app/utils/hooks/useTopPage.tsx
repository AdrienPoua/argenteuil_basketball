"use client"

import React, { useEffect } from 'react';

export default function useTopPage(setIsTopPage: React.Dispatch<React.SetStateAction<boolean>>) {
    useEffect(() => {
        const handleScroll = () => {
            setIsTopPage(window.scrollY === 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [window.scrollY]);
      
    
}
