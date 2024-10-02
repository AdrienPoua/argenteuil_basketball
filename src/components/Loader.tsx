import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

export default function Loader() {
    const [progress, setProgress] = useState(13);

    useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 200);
        return () => clearTimeout(timer);
    }, []);

    return <Progress value={progress} className="w-[60%]" />;
}
