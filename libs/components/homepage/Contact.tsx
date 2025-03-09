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
                        <div className={'small-text'}>{t('We make finding the right car simple')}</div>
                        <div className={'big-text'}>{t('Search Less. Watch More')}</div>
                    </Stack>
                </Stack>
            </>
        )
    }
};

export default LayoutFilter;