import { Box, Link, Stack } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';
import { useTranslation } from "next-i18next";

const LayoutFilter = (props: any) => {
    const device = useDeviceDetect();
    const { t, i18n } = useTranslation('common');

    if (device === 'mobile') {
        return <div>CONTACT MOBILE</div>;
    } else {
        return (
            <>
                <Stack className={'first-box'}>
                    <Stack className={'text'}>
                        <Box className={'small-text'}>{t('We make finding the right car simple')}</Box>
                        <Box className={'big-text'}>{t('Search Less. Watch More')}</Box>
                    </Stack>
                    <Stack className={'view'}>
                        <Link href="/cars" className={'view-car'}>
                            <span className={'cars'}>{t('View Cars')}</span>
                            <NorthEastRoundedIcon />
                        </Link>
                        <Link href="/cs" className={'contact-us'}>
                            <span className={'contact'}>{t('Contact')}</span>
                            <NorthEastRoundedIcon />
                        </Link>
                    </Stack>
                </Stack>
            </>
        )
    }
};

export default LayoutFilter;