import { useUser } from '@/providers/context';
import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

export function MyTimer({ expiryTimestamp }: any) {
    const {
        seconds,
        minutes,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });
    const { setSec, setMin } = useUser();

    useEffect(() => {
        setSec(seconds);
        setMin(minutes);
    }, [seconds, minutes]);
    
    return (
        <div>
            <div className="font-semibold mx-5 text-xl">
                <span>{minutes}</span>:<span>{seconds}</span>
            </div>
        </div>
    );
}