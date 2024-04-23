import React, { useEffect, useState } from 'react';

export default function useTopPage() {
    const [isTopPage, setIsTopPage] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsTopPage(window.scrollY === 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [window.scrollY]);

    return isTopPage;
}
