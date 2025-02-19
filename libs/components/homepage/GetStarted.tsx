import { Box, Button, Stack, Typography } from "@mui/material";
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { useTranslation } from "next-i18next";



const GetStarted = (props: any) => {
    const device = useDeviceDetect();
    const { t, i18n } = useTranslation('common');

    if (device === 'mobile') {
        return <div>Header Get Started</div>
    } else {
        return (
            <>
                <Stack className={'get-box'}>
                    <Stack className={'under-box'}>
                        <div className={'text'}>
                            <div>796M</div>
                            <span>{t('CARS FOR SALE')}</span>
                        </div>
                        <div className={'text'}>
                            <div>834M</div>
                            <span>{t('DEALERS REVIEWS')}</span>
                        </div>
                        <div className={'text'}>
                            <div>957M</div>
                            <span>{t('VISITORS PER DAY')}</span>
                        </div>
                        <div className={'text'}>
                            <div>123M</div>
                            <span>{t('VERIFIED DEALERS')}</span>
                        </div>
                    </Stack>
                    <div className={'divider'}></div>
                </Stack>
            </>
        )
    }
};

export default GetStarted;