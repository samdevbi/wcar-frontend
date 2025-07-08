import { Box, Button, Stack, Typography } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { useTranslation } from "next-i18next";
import React, { useRef, useEffect } from 'react';

function useInView(ref: React.RefObject<HTMLElement>, threshold = 0.3): boolean {
    const [inView, setInView] = React.useState(false);

    React.useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new window.IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold }
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    }, [ref, threshold]);

    return inView;
}

function countUp(
    element: HTMLElement,
    end: number,
    duration = 1000,
    suffix = ""
) {
    let start = 0;
    let startTime: number | null = null;

    function animateCount(timestamp: number) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + suffix;
        if (progress < 1) {
            requestAnimationFrame(animateCount);
        } else {
            element.textContent = end + suffix;
        }
    }

    requestAnimationFrame(animateCount);
}

const GetStarted = (props: any) => {
    const device = useDeviceDetect();
    const { t } = useTranslation('common');

    const statsRef = useRef<HTMLDivElement>(null);

    const ref796 = useRef<HTMLDivElement>(null);
    const ref834 = useRef<HTMLDivElement>(null);
    const ref957 = useRef<HTMLDivElement>(null);
    const ref123 = useRef<HTMLDivElement>(null);

    const inView = useInView(statsRef, 0.3); // 30% ko‘rinsa yetarli

    useEffect(() => {
        if (device !== 'mobile' && inView) {
            if (ref796.current) countUp(ref796.current, 796, 10000, "M");
            if (ref834.current) countUp(ref834.current, 834, 10000, "M");
            if (ref957.current) countUp(ref957.current, 957, 10000, "M");
            if (ref123.current) countUp(ref123.current, 123, 10000, "M");
        }
    }, [device, inView]);

    if (device === 'mobile') {
        return <div>Header Get Started</div>;
    } else {
        return (
            <>
                <Stack className={'get-box'} ref={statsRef}>
                    <Stack className={'under-box'}>
                        <div className={'text'}>
                            <div ref={ref796}>0M</div>
                            <span>{t('CARS FOR SALE')}</span>
                        </div>
                        <div className={'text'}>
                            <div ref={ref834}>0M</div>
                            <span>{t('DEALERS REVIEWS')}</span>
                        </div>
                        <div className={'text'}>
                            <div ref={ref957}>0M</div>
                            <span>{t('VISITORS PER DAY')}</span>
                        </div>
                        <div className={'text'}>
                            <div ref={ref123}>0M</div>
                            <span>{t('VERIFIED DEALERS')}</span>
                        </div>
                    </Stack>
                    <div className={'divider'}></div>
                </Stack>
            </>
        );
    }
};

export default GetStarted;

