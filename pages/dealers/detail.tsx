import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import { NextPage } from 'next';
import Review from '../../libs/components/car/Review';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import { Messages, REACT_APP_API_URL } from '../../libs/config';
import { userVar } from '../../apollo/store';
import { Pagination as MuiPagination } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import 'swiper/css';
import 'swiper/css/pagination';
import { GET_CARS, GET_COMMENTS, GET_MEMBER } from '../../apollo/user/query';
import { CREATE_COMMENT, LIKE_CAR, LIKE_MEMBER, SAVE_CAR } from '../../apollo/user/mutation';
import { T } from '../../libs/types/common';
import { Direction, Message } from '../../libs/enums/common.enum';
import { sweetErrorHandling, sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
import { Car } from '../../libs/types/car/car';
import { Member } from '../../libs/types/member/member';
import RecommendedCarCard from '../../libs/components/homepage/ReccomendedCarsCard';
import Link from 'next/link';
import { CommentInput, CommentsInquiry } from '../../libs/types/comment/comment.input';
import { CommentGroup } from '../../libs/enums/comment.enum';
import { Comment } from '../../libs/types/comment/comment';
import { useTranslation } from 'next-i18next';






SwiperCore.use([Autoplay, Navigation, Pagination]);

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

const DealerDetail: NextPage = ({ initialComment, ...props }: any) => {
    const device = useDeviceDetect();
    const router = useRouter();
    const { t, i18n } = useTranslation('common');
    const user = useReactiveVar(userVar);
    const [dealerId, setDealerId] = useState<string | null>(null);
    const [dealer, setDealer] = useState<Member | null>(null);
    const [slideImage, setSlideImage] = useState<string>('');
    const [destinationCars, setDestinationCars] = useState<Car[]>([]);
    const [commentInquiry, setCommentInquiry] = useState<CommentsInquiry>(initialComment);
    const [dealerComments, setDealerComments] = useState<Comment[]>([]);
    const [commentTotal, setCommentTotal] = useState<number>(0);
    const [insertCommentData, setInsertCommentData] = useState<CommentInput>({
        commentGroup: CommentGroup.MEMBER,
        commentContent: '',
        commentRefId: '',
    });

    /** APOLLO REQUESTS **/
    const [likeTargetCar] = useMutation(LIKE_CAR);
    const [saveTargetCar] = useMutation(SAVE_CAR);
    const [createComment] = useMutation(CREATE_COMMENT);
    const {
        loading: getMemberLoading,
        data: getMemberData,
        error: getMemberError,
        refetch: getMemberRefetch
    } = useQuery(GET_MEMBER, {
        fetchPolicy: 'network-only',
        variables: { input: dealerId },
        skip: !dealerId,
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            setDealer(data?.getMember);
            setSlideImage(data?.getMember?.viewImage);
        },
    });

    const {
        loading: getCarsLoading,
        data: getCarsData,
        error: getCarsError,
        refetch: getCarsRefetch
    } = useQuery(GET_CARS, {
        fetchPolicy: 'cache-and-network',
        variables: {
            input: {
                page: 1,
                limit: 4,
                sort: 'createdAt',
                direction: Direction.DESC,
                search: {
                    memberId: dealer?._id
                }
            },
        },
        skip: !dealerId && !dealer,
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            if (data?.getCars) setDestinationCars(data?.getCars?.list);
        },
    });

    const {
        loading: getCommentsLoading,
        data: getCommentsData,
        error: getCommentsError,
        refetch: getCommentsRefetch
    } = useQuery(GET_COMMENTS, {
        fetchPolicy: 'network-only',
        variables: { input: commentInquiry },
        skip: !commentInquiry.search.commentRefId,
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            setDealerComments(data?.getComments?.list);
            setCommentTotal(data?.getComments?.metaCounter[0]?.total ?? 0);
        },
    });

    /** LIFECYCLES **/
    useEffect(() => {
        if (router?.query?.id) {
            setCommentInquiry({
                ...commentInquiry,
                search: {
                    commentRefId: router?.query?.id as string,
                },
            });
            setInsertCommentData({
                ...insertCommentData,
                commentRefId: router.query.id as string,
            });
        }
    }, [router]);

    useEffect(() => {
        if (router?.query?.dealerId) {
            setDealerId(router?.query?.dealerId as string);
        }
    }, [router])

    useEffect(() => {
        if (commentInquiry.search.commentRefId) {
            getCommentsRefetch({ input: commentInquiry });
        }
    }, [commentInquiry]);

    /** HANDLERS **/

    const likeCarHandler = async (user: T, id: string) => {
        try {
            if (!id) return;
            if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

            await likeTargetCar({
                variables: { input: id },
            });

            getCarsRefetch({
                input: {
                    page: 1,
                    limit: 4,
                    sort: 'createdAt',
                    direction: Direction.DESC,
                    search: {},
                },
            });

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

            getCarsRefetch({
                input: {
                    page: 1,
                    limit: 4,
                    sort: 'createdAt',
                    direction: Direction.DESC,
                    search: {},
                },
            });

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
            if (!user._id) throw new Error(Messages.error2);
            if (user._id === dealerId) throw new Error('Cannot write a review for yourself');
            await createComment({
                variables: {
                    input: insertCommentData,
                },
            });

            setInsertCommentData({ ...insertCommentData, commentContent: '' });

            await getCommentsRefetch({ input: commentInquiry });
        } catch (err: any) {
            sweetErrorHandling(err).then();
        }
    };

    if (getMemberLoading) {
        return (
            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '1080px' }}>
                <CircularProgress size={'4rem'} />
            </Stack>
        );
    };

    if (device === 'mobile') {
        return <div>DEALER DETAIL PAGE</div>;
    } else {
        return (
            <div id={'dealer-detail-page'}>
                <div className={'container'}>
                    <Stack className={'property-detail-config'}>
                        <Stack className={'property-info-config'}>
                            <Stack className={'info'}>
                                <Stack className={'left-box'}>
                                    <Typography className={'title-main'}>{dealer?.titleNick}</Typography>
                                    <Stack className={'bottom-box'} sx={{ marginTop: '10px' }}>
                                        <Stack className="option">
                                            <Typography className={'icon'} sx={{ color: 'red' }}>{t('Used Cars')}:</Typography>
                                            <Typography sx={{ color: 'red' }}>{dealer?.usedCars}</Typography>
                                        </Stack>
                                        <Stack className="option">
                                            <Typography className={'icon'} sx={{ color: 'blue' }}>{t('New Cars')}:</Typography>
                                            <Typography sx={{ color: 'blue' }}>{dealer?.newCars}</Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack className={'brand-img'}>
                                <Stack className={'right'}>
                                    <Stack className={'config'}>
                                        <Stack className={'right'}>
                                            <Typography className={'main-title'}>{dealer?.titleNick}</Typography>
                                            <Box component={'div'} className={'social'}>
                                                {dealer?.address?.trim() && (
                                                    <>
                                                        <img src="/img/icons/addressb.svg" alt="" />
                                                        <Typography className={'data'}>{dealer.address}</Typography>
                                                    </>
                                                )}
                                            </Box>
                                            <Box component={'div'} className={'social'}>
                                                {dealer?.email?.trim() && (
                                                    <>
                                                        <img src="/img/icons/mailb.svg" alt="" />
                                                        <Typography className={'data'}>{dealer?.email}</Typography></>
                                                )}
                                            </Box>
                                            <Box component={'div'} className={'social'}>
                                                {dealer?.phone?.trim() && (
                                                    <>
                                                        <img src="/img/icons/phoneb.svg" alt="" />
                                                        <Typography className={'data'}>{dealer?.phone}</Typography>
                                                    </>
                                                )}
                                            </Box>
                                            <Box component={'div'} className={'social'}>
                                                {dealer?.phone2?.trim() && (
                                                    <>
                                                        <img src="/img/icons/callb.svg" alt="" />
                                                        <Typography className={'data'}>{dealer?.phone2}</Typography>
                                                    </>
                                                )}
                                            </Box>
                                            <Box component={'div'} className={'social'}>
                                                {dealer?.kakaoTalk?.trim() && (
                                                    <>
                                                        <img src="/img/icons/kakaotalkb.svg" alt="" />
                                                        <Typography className={'data'}>{dealer?.kakaoTalk}</Typography>
                                                    </>
                                                )}
                                                {dealer?.youtube?.trim() && (
                                                    <>
                                                        <img src="/img/icons/youtubeb.svg" alt="" />
                                                        <Typography className={'data'}>{dealer?.youtube}</Typography>
                                                    </>
                                                )}
                                                {dealer?.instagram?.trim() && (
                                                    <>
                                                        <img src="/img/icons/instab.svg" alt="" />
                                                        <Typography className={'data'}>{dealer?.instagram}</Typography>
                                                    </>
                                                )}
                                            </Box>
                                            <Box component={'div'} className={'social'}>
                                                {dealer?.naverBlog?.trim() && (
                                                    <>
                                                        <img src="/img/icons/nb.svg" alt="" />
                                                        <Typography className={'data'}>{dealer?.naverBlog}</Typography>
                                                    </>
                                                )}
                                                {dealer?.tikTok?.trim() && (
                                                    <>
                                                        <img src="/img/icons/tiktokb.svg" alt="" />
                                                        <Typography className={'data'}>{dealer?.tikTok}</Typography>
                                                    </>
                                                )}
                                                {dealer?.xcom?.trim() && (
                                                    <>
                                                        <img src="/img/icons/xcomb.svg" alt="" />
                                                        <Typography className={'data'}>{dealer?.xcom}</Typography>
                                                    </>
                                                )}
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack className={'right-frame'}>
                                    <Stack className={'right-config'}>
                                        <Stack className={'right'}>
                                            <Typography className={'main-title'}>{t('Opening Hours')}</Typography>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>{t('Mon-Fri')}</Typography>
                                                {(dealer?.openAt?.trim() || dealer?.closeAt?.trim()) ? (
                                                    <Typography className={'icons'}>
                                                        {`${dealer?.openAt || 'N/A'} - ${dealer?.closeAt || 'N/A'}`}
                                                    </Typography>
                                                ) : (
                                                    <Typography className={'icons'}>{t('Not Yet')}</Typography>
                                                )}
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>{t('Saturday')}</Typography>
                                                {(dealer?.openSaturday?.trim() || dealer?.closeSaturday?.trim()) ? (
                                                    <Typography className={'icons'}>
                                                        {`${dealer?.openSaturday || 'N/A'} - ${dealer?.closeSaturday || 'N/A'}`}
                                                    </Typography>
                                                ) : (
                                                    <Typography className={'icons'}>{t('Not Yet')}</Typography>
                                                )}
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>{t('Sunday')}</Typography>
                                                {(dealer?.openSunday?.trim() || dealer?.closeSunday?.trim()) ? (
                                                    <Typography className={'icons'}>
                                                        {`${dealer?.openSunday || 'N/A'} - ${dealer?.closeSunday || 'N/A'}`}
                                                    </Typography>
                                                ) : (
                                                    <Typography className={'icons'}>{t('Not Yet')}</Typography>
                                                )}
                                            </Box>
                                            <Box component={'div'} className={'info'}>
                                                <Typography className={'data'}>{t('Public Holdiays')}</Typography>
                                                {dealer?.publicHolidays === true ? (
                                                    <Typography className={'icons'}>{t('Open')}</Typography>
                                                ) : (
                                                    <Typography className={'icons'}>{t('Close')}</Typography>
                                                )}
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack className={'images'}>
                                <Stack className={'main-image'}>
                                    <img
                                        src={`${REACT_APP_API_URL}/${dealer?.image}`}
                                        alt={'main-image'}
                                    />
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack className={'property-desc-config'}>
                            <Stack className={'left-config'}>
                                <Stack className={'prop-desc-config'}>
                                    <Stack className={'bottom'}>
                                        <Typography className={'data'}>
                                            {dealer?.longDesc}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Stack className={'prop-desc-config'}>
                                    <Stack className={'bottom'}>
                                        <Typography className={'title'}>{t('Our Service')}</Typography>
                                        <Stack className={'info-box'}>
                                            <Stack className={'right'}>
                                                {dealer?.dealerFinancing === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/financingdealer.svg" alt="" />
                                                        <Typography className={'data'}>{t('Financing')}</Typography>
                                                    </Box>
                                                )}
                                                {dealer?.dealerCarService === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/carservice.svg" alt="" />
                                                        <Typography className={'data'}>{t('Car Service')}</Typography>
                                                    </Box>
                                                )}
                                                {dealer?.dealerTradeIn === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/tradein.svg" alt="" />
                                                        <Typography className={'data'}>{t('Trade In')}</Typography>
                                                    </Box>
                                                )}
                                                {dealer?.dealerCustomization === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/customazation.svg" alt="" />
                                                        <Typography className={'data'}>{t('Customization')}</Typography>
                                                    </Box>
                                                )}
                                                {dealer?.dealerWarranties === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/warranties.svg" alt="" />
                                                        <Typography className={'data'}>{t('Warranties')}</Typography>
                                                    </Box>
                                                )}
                                                {dealer?.dealerParts === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/carparts.svg" alt="" />
                                                        <Typography className={'data'}>{t('Car Parts')}</Typography>
                                                    </Box>
                                                )}
                                                {dealer?.dealerAccessories === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/accessories.svg" alt="" />
                                                        <Typography className={'data'}>{t('Accessories')}</Typography>
                                                    </Box>
                                                )}
                                                {dealer?.dealerCarDetailing === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/detailservice.svg" alt="" />
                                                        <Typography className={'data'}>{t('Car Detailing')}</Typography>
                                                    </Box>
                                                )}
                                                {dealer?.dealerCarWash === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/carwash.svg" alt="" />
                                                        <Typography className={'data'}>{t('Car Wash')}</Typography>
                                                    </Box>
                                                )}
                                                {dealer?.dealerCarTestDrive === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/testdrive.svg" alt="" />
                                                        <Typography className={'data'}>{t('Test Drive')}</Typography>
                                                    </Box>
                                                )}
                                                {dealer?.dealerCarDelivery === true && (
                                                    <Box component={'div'} className={'info'}>
                                                        <img src="/img/icons/deliverycar.svg" alt="" />
                                                        <Typography className={'data'}>{t('Delivery')}</Typography>
                                                    </Box>
                                                )}
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack className={'address-config'}>
                                    <Typography className={'title'}>{t('Our Location')}</Typography>
                                    <Typography className={'address'}>{t('City')}: {dealer?.address}</Typography>
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
                        {destinationCars?.length !== 0 && (
                            <Stack className={'similar-properties-config'}>
                                <Stack className={'title-pagination-box'}>
                                    <Stack className={'title-box'}>
                                        <Typography className={'main-title'}>{t('Dealer Created Cars')}</Typography>
                                        <Typography className={'sub-title'}>{t('There are also similar cars available here')}</Typography>
                                    </Stack>
                                    <Stack className={'pagination-box'}>
                                        <WestIcon className={'swiper-similar-prev'} />
                                        <div className={'swiper-similar-pagination'}></div>
                                        <EastIcon className={'swiper-similar-next'} />
                                    </Stack>
                                </Stack>
                                <Stack className={'cards-box'}>
                                    <Swiper
                                        className={'similar-homes-swiper'}
                                        slidesPerView={'auto'}
                                        spaceBetween={35}
                                        modules={[Autoplay, Navigation, Pagination]}
                                        navigation={{
                                            nextEl: '.swiper-similar-next',
                                            prevEl: '.swiper-similar-prev',
                                        }}
                                        pagination={{
                                            el: '.swiper-similar-pagination',
                                        }}
                                    >
                                        {destinationCars?.map((car: Car) => {
                                            return (
                                                <SwiperSlide className={'similar-homes-slide'} key={car?.carTitle}>
                                                    <RecommendedCarCard car={car} likeCarHandler={likeCarHandler} saveCarHandler={saveCarHandler} key={car?._id} />
                                                </SwiperSlide>
                                            );
                                        })}
                                    </Swiper>
                                </Stack>
                            </Stack>
                        )}
                    </Stack>
                </div>
            </div>
        );
    }
};

DealerDetail.defaultProps = {
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

export default withLayoutBasic(DealerDetail);