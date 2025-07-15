import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import { NextPage } from 'next';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import moment from 'moment';
import { formatterStr } from '../../libs/utils';
import { REACT_APP_API_URL } from '../../libs/config';
import { userVar } from '../../apollo/store';
import { CommentInput, CommentsInquiry } from '../../libs/types/comment/comment.input';
import { Comment } from '../../libs/types/comment/comment';
import { CommentGroup } from '../../libs/enums/comment.enum';
import { Pagination as MuiPagination } from '@mui/material';
import Link from 'next/link';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import 'swiper/css';
import 'swiper/css/pagination';
import { GET_CAR, GET_CARS, GET_COMMENTS } from '../../apollo/user/query';
import { CREATE_COMMENT, CREATE_NOTIFICATION, LIKE_CAR, SAVE_CAR } from '../../apollo/user/mutation';
import { T } from '../../libs/types/common';
import { Direction, Message } from '../../libs/enums/common.enum';
import { sweetErrorHandling, sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'; // country
import CarRepairOutlinedIcon from '@mui/icons-material/CarRepairOutlined'; // brand
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined'; // repair
import MinorCrashOutlinedIcon from '@mui/icons-material/MinorCrashOutlined'; // crush
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'; // city
import AddRoadOutlinedIcon from '@mui/icons-material/AddRoadOutlined'; // highway
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined'; // max speed
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined'; // hundred speed
import HeightOutlinedIcon from '@mui/icons-material/HeightOutlined'; // height
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined'; //width
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined'; // lenght
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined'; // weight
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'; // load weight
import DonutSmallOutlinedIcon from '@mui/icons-material/DonutSmallOutlined'; // tire size
import AirlineSeatReclineNormalOutlinedIcon from '@mui/icons-material/AirlineSeatReclineNormalOutlined'; //seats up
import SwapHorizontalCircleOutlinedIcon from '@mui/icons-material/SwapHorizontalCircleOutlined'; // wheela base
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import TimeToLeaveOutlinedIcon from '@mui/icons-material/TimeToLeaveOutlined'; // cruise control
import SurroundSoundOutlinedIcon from '@mui/icons-material/SurroundSoundOutlined'; // esc
import NoCrashOutlinedIcon from '@mui/icons-material/NoCrashOutlined'; // auto drive
import FlashlightOnOutlinedIcon from '@mui/icons-material/FlashlightOnOutlined'; // exterior light
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'; // ponarama
import AirlineSeatLegroomExtraOutlinedIcon from '@mui/icons-material/AirlineSeatLegroomExtraOutlined'; // heated seat
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined'; // cool seat
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined'; // touch screen display
import HighlightOutlinedIcon from '@mui/icons-material/HighlightOutlined'; // auto head light
import PanToolAltOutlinedIcon from '@mui/icons-material/PanToolAltOutlined'; // start stop
import NoiseControlOffOutlinedIcon from '@mui/icons-material/NoiseControlOffOutlined'; // noise cencellation
import SettingsRemoteOutlinedIcon from '@mui/icons-material/SettingsRemoteOutlined'; // remote keyylass
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'; // laneDw\
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'; // blind monitoring
import CommuteOutlinedIcon from '@mui/icons-material/CommuteOutlined'; //  rear traffic alert
import AirplayOutlinedIcon from '@mui/icons-material/AirplayOutlined'; // apple play
import CastOutlinedIcon from '@mui/icons-material/CastOutlined'; // android play
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined'; // voice control
import BluetoothConnectedOutlinedIcon from '@mui/icons-material/BluetoothConnectedOutlined'; // car bluetooth
import ElectricalServicesOutlinedIcon from '@mui/icons-material/ElectricalServicesOutlined'; // charging
import LocalParkingOutlinedIcon from '@mui/icons-material/LocalParkingOutlined'; // parking assist
import ThreeSixtyOutlinedIcon from '@mui/icons-material/ThreeSixtyOutlined'; // 360 camera
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined'; // back sensor
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined'; // front sensor
import CameraOutlinedIcon from '@mui/icons-material/CameraOutlined'; // front camera
import FlipCameraAndroidOutlinedIcon from '@mui/icons-material/FlipCameraAndroidOutlined'; // rear camera
import LensBlurOutlinedIcon from '@mui/icons-material/LensBlurOutlined'; // heads up display
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined'; // climate control
import AirlineSeatReclineExtraOutlinedIcon from '@mui/icons-material/AirlineSeatReclineExtraOutlined'; // adjustable seat
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined'; // memory seat
import BatteryCharging20OutlinedIcon from '@mui/icons-material/BatteryCharging20Outlined'; // regenerative braking
import DeblurOutlinedIcon from '@mui/icons-material/DeblurOutlined'; // traction control
import VideoStableOutlinedIcon from '@mui/icons-material/VideoStableOutlined'; // stability
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined'; //hill start
import TireRepairOutlinedIcon from '@mui/icons-material/TireRepairOutlined'; // tire pressure
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined'; // push button
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import { Car } from '../../libs/types/car/car';
import Review from '../../libs/components/car/Review';
import RecommendedCarCard from '../../libs/components/homepage/ReccomendedCarsCard';
import { useTranslation } from 'next-i18next';







SwiperCore.use([Autoplay, Navigation, Pagination]);

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

const CarDetailList: NextPage = ({ initialComment, ...props }: any) => {
    const device = useDeviceDetect();
    const { t, i18n } = useTranslation('common');
    const router = useRouter();
    const user = useReactiveVar(userVar);
    const [carId, setCarId] = useState<string | null>(null);
    const [car, setCar] = useState<Car | null>(null);
    const [slideImage, setSlideImage] = useState<string>('');
    const [commentInquiry, setCommentInquiry] = useState<CommentsInquiry>(initialComment);
    const [propertyComments, setPropertyComments] = useState<Comment[]>([]);
    const [commentTotal, setCommentTotal] = useState<number>(0);
    const [insertCommentData, setInsertCommentData] = useState<CommentInput>({
        commentGroup: CommentGroup.CAR,
        commentContent: '',
        commentRefId: '',
    });

    /** APOLLO REQUESTS **/
    const [likeTargetCar] = useMutation(LIKE_CAR);
    const [saveTargetCar] = useMutation(SAVE_CAR);
    const [createComment] = useMutation(CREATE_COMMENT);
    const [notificate] = useMutation(CREATE_NOTIFICATION);
    const {
        loading: getCarLoading,
        data: getCarData,
        error: getCarError,
        refetch: getCarRefetch
    } = useQuery(GET_CAR, {
        fetchPolicy: 'network-only',
        variables: { input: carId },
        skip: !carId,
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            if (data?.getCar) setCar(data?.getCar);
            if (data?.getCar) setSlideImage(data?.getCar?.carImages[0]);
        },
    });

    const {
        loading: getCommentsLoading,
        data: getCommentsData,
        error: getCommentsError,
        refetch: getCommentsRefetch
    } = useQuery(GET_COMMENTS, {
        fetchPolicy: 'cache-and-network',
        variables: { input: initialComment },
        skip: !commentInquiry.search.commentRefId,
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            if (data?.getComments?.list) setPropertyComments(data?.getComments?.list);
            setCommentTotal(data?.getComments?.metaCounter[0]?.total ?? 0);
        },
    });

    /** LIFECYCLES **/
    useEffect(() => {
        if (router.query.id) {
            setCarId(router?.query?.id as string);
            setCommentInquiry({
                ...commentInquiry,
                search: {
                    commentRefId: router?.query?.id as string,
                },
            });
            setInsertCommentData({
                ...insertCommentData,
                commentRefId: router?.query?.id as string,
            });
        }
    }, [router]);

    useEffect(() => {
        if (commentInquiry.search.commentRefId) {
            getCommentsRefetch({ input: commentInquiry });
        }
    }, [commentInquiry]);

    /** HANDLERS **/
    const changeImageHandler = (image: string) => {
        setSlideImage(image);
    };

    const likeCarHandler = async (user: T, id: string, creatorId: string) => {
        try {
            if (!id) return;
            if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

            await likeTargetCar({
                variables: { input: id },
            });

            await notificate({
                variables: {
                    input: {
                        carId: id,
                        authorId: user?._id,
                        notificationType: 'LIKE',
                        notificationGroup: 'CAR',
                        receiverId: creatorId,
                    }
                }
            });

            await getCarRefetch({ input: id });

            await sweetTopSmallSuccessAlert('seccess', 800);
        } catch (err: any) {
            sweetMixinErrorAlert(err.message).then;
        }
    };

    const saveCarHandler = async (user: T, id: string) => {
        try {
            if (!id) return;
            if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

            await saveTargetCar({
                variables: { input: id },
            });

            await getCarRefetch({ input: id });

            await sweetTopSmallSuccessAlert('seccess', 800);
        } catch (err: any) {
            sweetMixinErrorAlert(err.message).then;
        }
    };

    const commentPaginationChangeHandler = async (event: ChangeEvent<unknown>, value: number) => {
        commentInquiry.page = value;
        setCommentInquiry({ ...commentInquiry });
    };

    const createCommentHandler = async () => {
        try {
            if (!user?._id) throw new Error(Message.NOT_AUTHENTICATED);
            const result = await createComment({ variables: { input: insertCommentData } });

            await notificate({
                variables: {
                    input: {
                        carId: car?._id,
                        authorId: user._id,
                        notificationType: 'COMMENT',
                        notificationGroup: 'CAR',
                        receiverId: car?.creatorData?._id,
                        commentId: result?.data?.createComment?._id,
                    }
                }
            });

            setInsertCommentData({ ...insertCommentData, commentContent: '' });

            await getCommentsRefetch({ input: commentInquiry });
        } catch (err: any) {
            await sweetErrorHandling(err);
        }
    };

    const [showAllFeatures, setShowAllFeatures] = React.useState(false);
    // Car featurelar massivini tuzamiz:
    const features = [
        car?.carAutoBrake && { icon: <DonutSmallOutlinedIcon className={'icons'} />, label: t('Auto Brake') },
        car?.carCruiseControl && { icon: <TimeToLeaveOutlinedIcon className={'icons'} />, label: t('Cruise Control') },
        car?.carESC && { icon: <SurroundSoundOutlinedIcon className={'icons'} />, label: t('Car ESC system') },
        car?.carAutonomuosDrive && { icon: <NoCrashOutlinedIcon className={'icons'} />, label: t('Autonomuos Drive') },
        car?.carExteriorLight && { icon: <FlashlightOnOutlinedIcon className={'icons'} />, label: t('Exterior Light') },
        car?.carPanoramicSunroof && { icon: <LightModeOutlinedIcon className={'icons'} />, label: t('Panoramic Sun Roof') },
        car?.carHeatedSeats && { icon: <AirlineSeatLegroomExtraOutlinedIcon className={'icons'} />, label: t('Heated Seats') },
        car?.carCooledSeats && { icon: <AcUnitOutlinedIcon className={'icons'} />, label: t('Cooled Seats') },
        car?.carTouchscreenDisplay && { icon: <SmartDisplayOutlinedIcon className={'icons'} />, label: t('Touch Screen') },
        car?.carAutoHeadLight && { icon: <HighlightOutlinedIcon className={'icons'} />, label: t('Auto Head Light') },
        car?.carStarStop && { icon: <PanToolAltOutlinedIcon className={'icons'} />, label: t('Keyless Start') },
        car?.carNoiseCancellation && { icon: <NoiseControlOffOutlinedIcon className={'icons'} />, label: t('Noise Cancellation') },
        car?.carRemoteKeyless && { icon: <SettingsRemoteOutlinedIcon className={'icons'} />, label: t('Remote Keyless') },
        car?.carLaneDW && { icon: <SendOutlinedIcon className={'icons'} />, label: t('Lane DW System') },
        car?.carBlindSpotMonitoring && { icon: <VisibilityOutlinedIcon className={'icons'} />, label: t('Blind Monitoring') },
        car?.carRearCrossTrafficAlert && { icon: <CommuteOutlinedIcon className={'icons'} />, label: t('Rear Traffic Alert') },
        car?.carApplePlay && { icon: <AirplayOutlinedIcon className={'icons'} />, label: t('Apple Play') },
        car?.carAndroidAuto && { icon: <CastOutlinedIcon className={'icons'} />, label: t('Android Play') },
        car?.carVoiceControl && { icon: <RecordVoiceOverOutlinedIcon className={'icons'} />, label: t('Voice Control') },
        car?.carBluetoothConnectivity && { icon: <BluetoothConnectedOutlinedIcon className={'icons'} />, label: t('Bluetooth') },
        car?.carWirelessCharging && { icon: <ElectricalServicesOutlinedIcon className={'icons'} />, label: t('Charging') },
        car?.carParkingAssist && { icon: <LocalParkingOutlinedIcon className={'icons'} />, label: t('Parking Assist') },
        car?.carSurroundViewCamera && { icon: <ThreeSixtyOutlinedIcon className={'icons'} />, label: t('360 Camera') },
        car?.carFrontSensors && { icon: <SkipNextOutlinedIcon className={'icons'} />, label: t('Front Sensor') },
        car?.carRearSensors && { icon: <SkipPreviousOutlinedIcon className={'icons'} />, label: t('Rear Sensor') },
        car?.carFrontRecordCamera && { icon: <CameraOutlinedIcon className={'icons'} />, label: t('Front Camera') },
        car?.carRearRecordCamera && { icon: <FlipCameraAndroidOutlinedIcon className={'icons'} />, label: t('Rear Camera') },
        car?.carHeadsUpDisplay && { icon: <LensBlurOutlinedIcon className={'icons'} />, label: t('Heads Up Display') },
        car?.carClimateControl && { icon: <ThunderstormOutlinedIcon className={'icons'} />, label: t('Climate Control') },
        car?.carAdjustableSeats && { icon: <AirlineSeatReclineExtraOutlinedIcon className={'icons'} />, label: t('Adjustable Seats') },
        car?.carMemorySeats && { icon: <PsychologyOutlinedIcon className={'icons'} />, label: t('Memory Seats') },
        car?.carRegenerativeBraking && { icon: <BatteryCharging20OutlinedIcon className={'icons'} />, label: t('Regenerative Braking') },
        car?.carTractionControl && { icon: <DeblurOutlinedIcon className={'icons'} />, label: t('Traction Control') },
        car?.carStabilityControl && { icon: <VideoStableOutlinedIcon className={'icons'} />, label: t('Stability Control') },
        car?.carHillStartAssist && { icon: <TimelineOutlinedIcon className={'icons'} />, label: t('Hill Start Assist') },
        car?.carTirePressureSystem && { icon: <TireRepairOutlinedIcon className={'icons'} />, label: t('Tire Pressure System') },
        car?.carPushButton && { icon: <TouchAppOutlinedIcon className={'icons'} />, label: t('Push Button') },
    ].filter(Boolean);


    const [showFullDesc, setShowFullDesc] = React.useState(false);
    const maxDescLength = 600;

    function getShortDesc(desc: string | undefined, length: number = 600): string {
        if (!desc) return '';
        if (desc.length <= length) return desc;
        return desc.substring(0, length) + '...';
    }



    console.log('car', car?.carImages)
    if (getCarLoading) {
        return (
            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '1080px' }}>
                <CircularProgress size={'4rem'} />
            </Stack>
        );
    };

    if (device === 'mobile') {
        return <div>CAR DETAIL PAGE</div>;
    } else {
        return (
            <div id={'property-detail-page'}>
                <div className={'container'}>
                    <Stack className={'property-detail-config'}>
                        <Stack className={'property-info-config'}>
                            <Stack className={'info'}>
                                <Stack className={'left-box'}>
                                    <Typography className={'title-main'}>{car?.carTitle}</Typography>
                                    <Typography className={'title-small'}>{car?.carModel}</Typography>
                                    <Stack className={'top-box'}>
                                        <Typography className={'city'}>{car?.carLocation}</Typography>
                                        <Stack className={'divider'}></Stack>
                                        <Stack className={'buy-rent-box'}>
                                            {car?.carBarter && (
                                                <>
                                                    <Stack className={'circle'}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                                                            <circle cx="3" cy="3" r="3" fill="#EB6753" />
                                                        </svg>
                                                    </Stack>
                                                    <Typography className={'buy-rent'}>{t('Barter')}</Typography>
                                                </>
                                            )}

                                            {car?.carRent && (
                                                <>
                                                    <Stack className={'circle'}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                                                            <circle cx="3" cy="3" r="3" fill="#EB6753" />
                                                        </svg>
                                                    </Stack>
                                                    <Typography className={'buy-rent'}>{t('Rent')}</Typography>
                                                </>
                                            )}
                                        </Stack>
                                        <Stack className={'divider'}></Stack>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <g clipPath="url(#clip0_6505_6282)">
                                                <path
                                                    d="M7 14C5.61553 14 4.26216 13.5895 3.11101 12.8203C1.95987 12.0511 1.06266 10.9579 0.532846 9.67879C0.00303297 8.3997 -0.13559 6.99224 0.134506 5.63437C0.404603 4.2765 1.07129 3.02922 2.05026 2.05026C3.02922 1.07129 4.2765 0.404603 5.63437 0.134506C6.99224 -0.13559 8.3997 0.00303297 9.67879 0.532846C10.9579 1.06266 12.0511 1.95987 12.8203 3.11101C13.5895 4.26216 14 5.61553 14 7C14 8.85652 13.2625 10.637 11.9498 11.9498C10.637 13.2625 8.85652 14 7 14ZM7 0.931878C5.79984 0.931878 4.62663 1.28777 3.62873 1.95454C2.63084 2.62132 1.85307 3.56903 1.39379 4.67783C0.934505 5.78664 0.814336 7.00673 1.04848 8.18384C1.28262 9.36094 1.86055 10.4422 2.70919 11.2908C3.55783 12.1395 4.63907 12.7174 5.81617 12.9515C6.99327 13.1857 8.21337 13.0655 9.32217 12.6062C10.431 12.1469 11.3787 11.3692 12.0455 10.3713C12.7122 9.37337 13.0681 8.20016 13.0681 7C13.067 5.39099 12.4273 3.84821 11.2895 2.71047C10.1518 1.57273 8.60901 0.933037 7 0.931878Z"
                                                    fill="#181A20"
                                                />
                                                <path
                                                    d="M9.0372 9.7275C8.97153 9.72795 8.90643 9.71543 8.84562 9.69065C8.7848 9.66587 8.72948 9.62933 8.68282 9.58313L6.68345 7.58375C6.63724 7.53709 6.6007 7.48177 6.57592 7.42096C6.55115 7.36015 6.53863 7.29504 6.53907 7.22938V2.7275C6.53907 2.59464 6.59185 2.46723 6.6858 2.37328C6.77974 2.27934 6.90715 2.22656 7.04001 2.22656C7.17287 2.22656 7.30028 2.27934 7.39423 2.37328C7.48817 2.46723 7.54095 2.59464 7.54095 2.7275V7.01937L9.39595 8.87438C9.47462 8.9425 9.53001 9.03354 9.55436 9.13472C9.57871 9.2359 9.5708 9.34217 9.53173 9.43863C9.49266 9.53509 9.4244 9.61691 9.3365 9.67264C9.24861 9.72836 9.14548 9.75519 9.04157 9.74938L9.0372 9.7275Z"
                                                    fill="#181A20"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_6505_6282">
                                                    <rect width="14" height="14" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <Typography className={'date'}>{moment().diff(car?.createdAt, 'days')} {t('days ago')}</Typography>
                                    </Stack>
                                    <Stack className={'bottom-box'}>
                                        <Stack className="option">
                                            <img src="/img/icons/years.svg" alt="" /> <Typography>{car?.carYear}</Typography>
                                        </Stack>
                                        <Stack className="option">
                                            <img src="/img/icons/speeds.svg" alt="" /> <Typography>{car?.carMileage.toLocaleString('de-De')} km</Typography>
                                        </Stack>
                                        <Stack className="option">
                                            <img src="/img/icons/transs.svg" alt="" /> <Typography>{car?.carTransmission}</Typography>
                                        </Stack>
                                        <Stack className="option">
                                            <img src="/img/icons/petrols.svg" alt="" /> <Typography>{car?.carFuelType}</Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack className={'right-box'}>
                                    <Stack className="buttons">
                                        <Stack className={'save-box'}>
                                            {car?.meSaved && car?.meSaved[0]?.mySaved ? (

                                                <BookmarkIcon
                                                    // @ts-ignore
                                                    onClick={() => saveCarHandler(user, car?._id)}
                                                    color="secondary" fontSize={'medium'} />
                                            ) : (
                                                <BookmarkBorderIcon
                                                    fontSize={'medium'}
                                                    // @ts-ignore
                                                    onClick={() => saveCarHandler(user, car?._id)}
                                                />
                                            )}
                                        </Stack>
                                        <Stack className="button-box">
                                            <RemoveRedEyeIcon fontSize="medium" />
                                            <Typography>{car?.carViews}</Typography>
                                        </Stack>
                                        <Stack className="button-box">
                                            {car?.meLiked && car?.meLiked[0]?.myFavorite ? (

                                                <FavoriteIcon
                                                    // @ts-ignore
                                                    onClick={() => likeCarHandler(user, car?._id, car?.creatorData?._id)}
                                                    color="primary" fontSize={'medium'} />
                                            ) : (
                                                <FavoriteBorderIcon
                                                    fontSize={'medium'}
                                                    // @ts-ignore
                                                    onClick={() => likeCarHandler(user, car?._id, car?.creatorData?._id)}
                                                />
                                            )}
                                            <Typography>{car?.carLikes}</Typography>
                                        </Stack>
                                    </Stack>
                                    <Typography>${car?.carPrice.toLocaleString('de-DE')}</Typography>
                                    <Stack className={'offer'}>
                                        <Typography>Make An Offer Price</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack className={'images'}>
                                <Stack className={'main-image'}>
                                    <img
                                        src={slideImage ? `${REACT_APP_API_URL}/${slideImage}` : '/img/banner/banner.webp'}
                                        alt={'main-image'}
                                    />
                                </Stack>
                                <Stack className={'sub-images'}>
                                    {car?.carImages.map((subImg: string) => {
                                        const imagePath: string = `${REACT_APP_API_URL}/${subImg}`;
                                        return (
                                            <Stack className={'sub-img-box'} key={subImg}>
                                                <img src={imagePath} alt={'sub-image'} />
                                            </Stack>
                                        );
                                    })}
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack className={'property-desc-config'}>
                            <Stack className={'left-config'}>
                                <Stack className={'prop-desc-config'}>
                                    <Stack className={'top'}>
                                        <Typography className={'title'}>{t('Car Overview')}</Typography>
                                    </Stack>
                                    <Stack className={'bottom'}>
                                        <Stack className={'info-box'}>
                                            <Stack className={'left'}>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <img src="/img/icons/carbody.svg" alt="" />
                                                        {t('Body')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carBody}</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <img src="/img/icons/speedb.svg" alt="" />
                                                        {t('Mile')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carMileage} km</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <img src="/img/icons/petrolb.svg" alt="" />
                                                        {t('Fuel')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carFuelType}</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <img src="/img/icons/yearb.svg" alt="" />
                                                        {t('Year')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carYear}</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <img src="/img/icons/transb.svg" alt="" />
                                                        {t('Trans')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carTransmission}</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <img src="/img/icons/engineb.svg" alt="" />
                                                        {t('Size')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carEngineSize} L</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <img src="/img/icons/doorb.svg" alt="" />
                                                        {t('Doors')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carDoor}</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <img src="/img/icons/cyldb.svg" alt="" />
                                                        {t('Cylinders')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carCylinders}</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <img src="/img/icons/driveb.svg" alt="" />
                                                        {t('Drive')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carDriveType}</Typography>
                                                </Box>
                                            </Stack>
                                            <Stack className={'middle'}>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <img src="/img/icons/conb.svg" alt="" />
                                                        {t('Condition')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carType}</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <LanguageOutlinedIcon className={'icons'} />
                                                        {t('Made In')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carMadeIn}</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <CarRepairOutlinedIcon className={'icons'} />
                                                        {t('Brand')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carBrand}</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <HandymanOutlinedIcon className={'icons'} />
                                                        {t('Repair')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carRepair} repaires</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <MinorCrashOutlinedIcon className={'icons'} />
                                                        {t('Crush')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carCrush} crushes</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <ApartmentOutlinedIcon className={'icons'} />
                                                        {t('MpgCity')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carMpgCity} km</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <AddRoadOutlinedIcon className={'icons'} />
                                                        {t('MpgHw')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carMpgHw} km</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <ScaleOutlinedIcon className={'icons'} />
                                                        {t('Weigth')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carWeigth} kg</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <LocalShippingOutlinedIcon className={'icons'} />
                                                        {t('Load Weigth')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carLoadWeight} kg</Typography>
                                                </Box>
                                            </Stack>
                                            <Stack className={'right'}>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <img src="/img/icons/colorb.svg" alt="" />
                                                        {t('Full Fuel')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carFullFuel} L</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <SpeedOutlinedIcon className={'icons'} />
                                                        {t('Max Speed')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carMaxSpeed} km/h</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <ElectricBoltOutlinedIcon className={'icons'} />
                                                        {t('100km Speed')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carHundredSpeed} s</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <HeightOutlinedIcon className={'icons'} />
                                                        {t('Heigth')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carHeigth} mm</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <DirectionsCarOutlinedIcon className={'icons'} />
                                                        {t('Width')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carWidth} mm</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <AirportShuttleOutlinedIcon className={'icons'} />
                                                        {t('Length')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carLength} mm</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <DonutSmallOutlinedIcon className={'icons'} />
                                                        {t('Tire')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carTireSize}</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <AirlineSeatReclineNormalOutlinedIcon className={'icons'} />
                                                        {t('Seats')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carSeatsUp}</Typography>
                                                </Box>
                                                <Box component={'div'} className={'info'}>
                                                    <div>
                                                        <SwapHorizontalCircleOutlinedIcon className={'icons'} />
                                                        {t('Wheel Base')}:
                                                    </div>
                                                    <Typography className={'data'}>{car?.carWheelBase} mm</Typography>
                                                </Box>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack className={'prop-desc'}>
                                    <Stack className={'top'}>
                                        <Typography className={'title'}>{t('Car Description')}</Typography>
                                    </Stack>
                                    <Stack className={'bottom'}>
                                        <Typography className={'data'}>
                                            {showFullDesc ? car?.carDesc : getShortDesc(car?.carDesc, maxDescLength)}
                                        </Typography>
                                        {car?.carDesc && car?.carDesc.length > maxDescLength && (
                                            <Button
                                                onClick={() => setShowFullDesc((v) => !v)}
                                            >
                                                {showFullDesc ? t('Show Less') : t('Show More')}
                                            </Button>
                                        )}
                                    </Stack>
                                </Stack>
                                <Stack className={'floor-plans-config'}>
                                    <Typography className={'title'}>{t('Car Crush Parts')}</Typography>
                                    <Stack className={'image-box'}>
                                        {car?.carFrontBumper === true && (
                                            <div className={'front-bumper'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carBackBumper === true && (
                                            <div className={'rear-bumper'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carBonnet === true && (
                                            <div className={'bonnet'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carTailgate === true && (
                                            <div className={'tailgate'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carRightFrontWing === true && (
                                            <div className={'rf-wing'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carLeftFrontWing === true && (
                                            <div className={'lf-wing'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carRightBackWing === true && (
                                            <div className={'rb-wing'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carLeftBackWing === true && (
                                            <div className={'lb-wing'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carRoof === true && (
                                            <div className={'roof'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carRightFrontDoor === true && (
                                            <div className={'rf-door'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carLeftFrontDoor === true && (
                                            <div className={'lf-door'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carRightBackDoor === true && (
                                            <div className={'rb-door'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        {car?.carLeftBackDoor === true && (
                                            <div className={'lb-door'}>
                                                <img src="/img/logo/cancle2.svg" alt="" />
                                            </div>
                                        )}
                                        <img src={'/img/logo/carbody.jpg'} alt={'image'} />
                                    </Stack>
                                </Stack>
                                <Stack className={'address-config'}>
                                    <Typography className={'title'}>{t('Address')}</Typography>
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
                                {commentTotal !== 0 && (
                                    <Stack className={'reviews-config'}>
                                        <Stack className={'filter-box'}>
                                            <Stack className={'review-cnt'}>
                                                <Typography className={'reviews'}>{commentTotal} {t('reviews')}</Typography>
                                            </Stack>
                                        </Stack>
                                        <Stack className={'review-list'}>
                                            {propertyComments?.map((comment: Comment) => {
                                                return <Review comment={comment} key={comment?._id} />;
                                            })}
                                            <Box component={'div'} className={'pagination-box'}>
                                                <MuiPagination
                                                    page={commentInquiry.page}
                                                    count={Math.ceil(commentTotal / commentInquiry.limit)}
                                                    onChange={commentPaginationChangeHandler}
                                                    shape="circular"
                                                    color="secondary"
                                                />
                                            </Box>
                                        </Stack>
                                    </Stack>
                                )}
                                <Stack className={'leave-review-config'}>
                                    <Typography className={'main-title'}>{t('Leave A Review')}</Typography>
                                    <Typography className={'review-title'}>{t('Review')}</Typography>
                                    <textarea
                                        onChange={({ target: { value } }: any) => {
                                            setInsertCommentData({ ...insertCommentData, commentContent: value });
                                        }}
                                        value={insertCommentData.commentContent}
                                    ></textarea>
                                    <Box className={'submit-btn'} component={'div'}>
                                        <Button
                                            className={'submit-review'}
                                            disabled={insertCommentData.commentContent === '' || user?._id === ''}
                                            onClick={createCommentHandler}
                                        >
                                            <Typography className={'title'}>{t('Comment Post')}</Typography>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                <g clipPath="url(#clip0_6975_3642)">
                                                    <path
                                                        d="M16.1571 0.5H6.37936C6.1337 0.5 5.93491 0.698792 5.93491 0.944458C5.93491 1.19012 6.1337 1.38892 6.37936 1.38892H15.0842L0.731781 15.7413C0.558156 15.915 0.558156 16.1962 0.731781 16.3698C0.818573 16.4566 0.932323 16.5 1.04603 16.5C1.15974 16.5 1.27345 16.4566 1.36028 16.3698L15.7127 2.01737V10.7222C15.7127 10.9679 15.9115 11.1667 16.1572 11.1667C16.4028 11.1667 16.6016 10.9679 16.6016 10.7222V0.944458C16.6016 0.698792 16.4028 0.5 16.1571 0.5Z"
                                                        fill="#181A20"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_6975_3642">
                                                        <rect width="16" height="16" fill="white" transform="translate(0.601562 0.5)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </Button>
                                    </Box>
                                </Stack>
                            </Stack>

                            <Stack className={'right-frame'}>
                                <Stack className={'right-config'}>
                                    <Stack className={'right'}>
                                        <Typography className={'main-title'}>{t('Car Features')}</Typography>
                                        {(showAllFeatures ? features : features.slice(0, 8)).map((f, idx) =>
                                            f && (
                                                <Box key={idx} component={'div'} className={'info'}>
                                                    {f.icon}
                                                    <Typography className={'data'}>{f.label}</Typography>
                                                    <DoneAllOutlinedIcon className={'icons'} />
                                                </Box>
                                            )
                                        )}
                                        {features.length > 8 && (
                                            <Button
                                                onClick={() => setShowAllFeatures((v) => !v)}
                                            >
                                                {showAllFeatures ? t('Show Less') : t('Show More')}
                                            </Button>
                                        )}
                                    </Stack>

                                </Stack>

                            </Stack>
                        </Stack>
                    </Stack>
                </div>
            </div>
        );
    }
};

CarDetailList.defaultProps = {
    initialComment: {
        page: 1,
        limit: 5,
        sort: 'createdAt',
        direction: 'DESC',
        search: {
            commentRefId: '',
        },
    },
};

export default withLayoutBasic(CarDetailList);