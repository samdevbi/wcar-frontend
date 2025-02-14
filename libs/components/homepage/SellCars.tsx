import { Box, Button, Stack, Typography } from "@mui/material";
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { useTranslation } from "next-i18next";



const SellCars = (props: any) => {
    const device = useDeviceDetect();
    const { t, i18n } = useTranslation('common');

    if (device === 'mobile') {
        return <div>Header Sell Buy</div>
    } else {
        return (
            <>
                <Stack className={'start-box'}>
                    <Stack className={'frame'}>
                        <Stack className={'sell'}>
                            <Typography className={'big-text'}>{t('Do You Want To Sell A Car?')}</Typography>
                            <Typography className={'small-text'}>{t('We offer our top-quality services to help you sell your car effortlessly')}</Typography>
                            <Button className={'button'}>
                                {t('Join as a Agent!')}
                            </Button>
                        </Stack>
                        <Stack className={'buy'}>
                            <Typography className={'text'}>{t('Do You Want To Create Your Own Dealership?')}</Typography>
                            <Typography className={'small-text'}>{t('We offer our top-quality services to help you create dealer. Make it easy and reliable with us')}</Typography>
                            <Button className={'button'}>
                                {t('Join as a Dealer!')}
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </>
        )
    }
};

export default SellCars;