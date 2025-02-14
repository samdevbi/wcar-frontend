import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import { NextPage } from 'next';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import { REACT_APP_API_URL } from '../../libs/config';
import { userVar } from '../../apollo/store';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import 'swiper/css';
import 'swiper/css/pagination';
import { CREATE_COMMENT, LIKE_MEMBER } from '../../apollo/user/mutation';
import { T } from '../../libs/types/common';
import { Message } from '../../libs/enums/common.enum';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { Member } from '../../libs/types/member/member';
import Link from 'next/link';
import { GET_MEMBER } from '../../apollo/user/query';
import { useTranslation } from 'next-i18next';



SwiperCore.use([Autoplay, Navigation, Pagination]);

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

const PropertyDetail: NextPage = ({ initialComment, ...props }: any) => {
    const device = useDeviceDetect();
    const router = useRouter();
    const user = useReactiveVar(userVar);
    const { t, i18n } = useTranslation('common');
    const [serviceId, setServiceId] = useState<string | null>(null);
    const [service, setService] = useState<Member | null>(null);
    const [slideImage, setSlideImage] = useState<string>('');

    /** APOLLO REQUESTS **/
    const {
        loading: getMemberLoading,
        data: getMmeberData,
        error: getMemberError,
        refetch: getMemberRefetch
    } = useQuery(GET_MEMBER, {
        fetchPolicy: 'network-only',
        variables: { input: serviceId },
        skip: !serviceId,
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            console.log('member', data);

            if (data?.getMember) setService(data?.getMember);
            if (data?.getMember) setSlideImage(data?.getMember?.image);
        },
    });

    /** LIFECYCLES **/
    useEffect(() => {
        if (router?.query?.serviceId) {
            setServiceId(router.query.serviceId as string);
        }
    }, [router]);

    if (getMemberLoading) {
        return (
            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '1080px' }}>
                <CircularProgress size={'4rem'} />
            </Stack>
        );
    };

    if (device === 'mobile') {
        return <div>SERVICE DETAIL PAGE</div>;
    } else {
        return (
            <div id={'service-detail-page'}>
                <div className={'container'}>
                    <Stack className={'property-detail-config'}>
                        <Stack className={'property-info-config'}>
                            <Stack className={'info'}>
                                <Stack className={'left-box'}>
                                    <Typography className={'title-main'}>{service?.titleNick}</Typography>
                                </Stack>
                            </Stack>
                            <Stack className={'brand-img'}>
                                <Stack className={'right'}>
                                    <Stack className={'config'}>
                                        <Stack className={'right'}>
                                            <Typography className={'small-title'}>
                                                {service?.shortDesc}
                                            </Typography>
                                            <Box component={'div'} className={'social'}>
                                                {service?.address?.trim() && (
                                                    <>
                                                        <img src="/img/icons/addressb.svg" alt="" />
                                                        <Typography className={'data'}>{service?.address}</Typography>
                                                    </>
                                                )}
                                            </Box>
                                            <Box component={'div'} className={'social'}>
                                                {service?.email?.trim() && (
                                                    <>
                                                        <img src="/img/icons/mailb.svg" alt="" />
                                                        <Typography className={'data'}>{service?.email}</Typography>
                                                    </>
                                                )}
                                            </Box>
                                            <Box component={'div'} className={'social'}>
                                                {service?.phone.trim() && (
                                                    <>
                                                        <img src="/img/icons/phoneb.svg" alt="" />
                                                        <Typography className={'data'}>{service?.phone}</Typography>
                                                    </>
                                                )}
                                                {service?.phone2?.trim() && (
                                                    <>
                                                        <img src="/img/icons/callb.svg" alt="" />
                                                        <Typography className={'data'}>{service?.phone2}</Typography>
                                                    </>
                                                )}
                                            </Box>
                                            <Box component={'div'} className={'social'}>
                                                {service?.kakaoTalk?.trim() && (
                                                    <>
                                                        <img src="/img/icons/kakaotalkb.svg" alt="" />
                                                        <Typography className={'data'}>{service?.kakaoTalk}</Typography>
                                                    </>
                                                )}
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Link
                                                    href={'/service/membership'}
                                                    className={'data'}>{t('Join For Membership')}
                                                </Link>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack className={'images'}>
                                <Stack className={'main-image'}>
                                    <img
                                        src={slideImage ? `${REACT_APP_API_URL}/${slideImage}` : '/img/property/bigImage.png'}
                                        alt={'main-image'}
                                    />
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack className={'property-desc-config'}>
                            <Stack className={'right-frame'}>
                                <Stack className={'hour'}>
                                    <Stack className={'time'}>
                                        <Stack className={'right'}>
                                            <Typography className={'main-title'}>{t('Opening Hours')}</Typography>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>{t('Mon-Fri')}</Typography>
                                                {(service?.openAt?.trim() || service?.closeAt?.trim()) ? (
                                                    <Typography className={'icons'}>
                                                        {`${service?.openAt || 'N/A'} - ${service?.closeAt || 'N/A'}`}
                                                    </Typography>
                                                ) : (
                                                    <Typography className={'icons'}>{t('Not Yet')}</Typography>
                                                )}
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>{t('Saturday')}</Typography>
                                                {(service?.openSaturday?.trim() || service?.closeSaturday?.trim()) ? (
                                                    <Typography className={'icons'}>
                                                        {`${service?.openSaturday || 'N/A'} - ${service?.closeSaturday || 'N/A'}`}
                                                    </Typography>
                                                ) : (
                                                    <Typography className={'icons'}>{t('Not Yet')}</Typography>
                                                )}
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>{t('Sunday')}</Typography>
                                                {(service?.openSunday?.trim() || service?.closeSunday?.trim()) ? (
                                                    <Typography className={'icons'}>
                                                        {`${service?.openSunday || 'N/A'} - ${service?.closeSunday || 'N/A'}`}
                                                    </Typography>
                                                ) : (
                                                    <Typography className={'icons'}>{t('Not Yet')}</Typography>
                                                )}
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>{t('Public Holdiays')}</Typography>
                                                {service?.publicHolidays === true ? (
                                                    <Typography className={'icons'}>{t('Open')}</Typography>
                                                ) : (
                                                    <Typography className={'icons'}>{t('Close')}</Typography>
                                                )}
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack className={'frame'}>
                                    <Box className={'top'}>
                                        <Typography className={'main'}>{t('Service')}</Typography>
                                        <div className={'div-m'}></div>
                                        <Typography className={'second'}>{t('Location')}</Typography>
                                        <div></div>
                                    </Box>
                                    <Box className={'top'}>
                                        <Typography className={'second'}>{t('Service')}</Typography>
                                        <div ></div>
                                        <Typography className={'main'}>{t('Location')}</Typography>
                                        <div className={'div-m'}></div>
                                    </Box>
                                </Stack>
                            </Stack>
                            <Stack className={'left-config'}>
                                <Stack className={'prop-desc-config'}>
                                    <Stack className={'bottom'}>
                                        <Typography className={'data'}>
                                            {service?.longDesc}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Stack className={'prop-desc-config'}>
                                    <Stack className={'bottom'}>
                                        <Stack className={'info-box'}>
                                            <Stack className={'left'}>
                                                {service?.carOilChange === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/oilcar.svg" alt="" />
                                                        <Typography className={'data'}>{t('Oil Change')}</Typography>
                                                    </Box>
                                                )}
                                                {service?.carAlignment === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/tire.svg" alt="" />
                                                        <Typography className={'data'}>{t('Car Alignment')}</Typography>
                                                    </Box>
                                                )}
                                                {service?.carTireChange === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/tirechange.svg" alt="" />
                                                        <Typography className={'data'}>{t('Tire Change')}</Typography>
                                                    </Box>
                                                )}
                                                {service?.carTireBalance === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/carpart.svg" alt="" />
                                                        <Typography className={'data'}>{t('Car Parts')}</Typography>
                                                    </Box>
                                                )}
                                                {service?.carBrakeCheck === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/brake.svg" alt="" />
                                                        <Typography className={'data'}>{t('Brake Check')}</Typography>
                                                    </Box>
                                                )}
                                                {service?.carBatteryCheck === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/batterycar.svg" alt="" />
                                                        <Typography className={'data'}>{t('Battery Check')}</Typography>
                                                    </Box>
                                                )}
                                                {service?.carSuspension === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/suspensioncar.svg" alt="" />
                                                        <Typography className={'data'}>{t('Car Suspension')}</Typography>
                                                    </Box>
                                                )}
                                                {service?.carAirCondition === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/aircondition.svg" alt="" />
                                                        <Typography className={'data'}>{t('Air Condition')}</Typography>
                                                    </Box>
                                                )}
                                                {service?.carTransmissionCheck === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/transmissioncar.svg" alt="" />
                                                        <Typography className={'data'}>{t('Tarnsmission Check')}</Typography>
                                                    </Box>
                                                )}
                                                {service?.carEngineDiagnostic === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/enginecar.svg" alt="" />
                                                        <Typography className={'data'}>{t('Engine Diagnostic')}</Typography>
                                                    </Box>
                                                )}
                                                {service?.carExhaust === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/exhaustcar.svg" alt="" />
                                                        <Typography className={'data'}>{t('Car Exhaust')}</Typography>
                                                    </Box>
                                                )}
                                                {service?.carTimingBelt === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/beltcar.svg" alt="" />
                                                        <Typography className={'data'}>{t('Timing Belt')}</Typography>
                                                    </Box>
                                                )}
                                                {service?.carChainReplacement === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/chaincar.svg" alt="" />
                                                        <Typography className={'data'}>{t('Chain Replacement')}</Typography>
                                                    </Box>
                                                )}
                                                {service?.carWindshield === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/windcar.svg" alt="" />
                                                        <Typography className={'data'}>{t('Car Windshield')}</Typography>
                                                    </Box>
                                                )}
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack className={'address-config'}>
                                    <Typography className={'title'}>{t('Location')}</Typography>
                                    <Typography className={'title'}>{t('Address')}: {service?.address}</Typography>
                                    <Stack className={'map-box'}>
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25867.098915951767!2d128.68632810247993!3d35.86402299180927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35660bba427bf179%3A0x1fc02da732b9072f!2sGeumhogangbyeon-ro%2C%20Dong-gu%2C%20Daegu!5e0!3m2!1suz!2skr!4v1695537640704!5m2!1suz!2skr"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen={true}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </div>
            </div >
        );
    }
};

export default withLayoutBasic(PropertyDetail);