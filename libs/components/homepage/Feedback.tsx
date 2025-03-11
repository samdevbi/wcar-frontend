import React, { useState } from 'react';
import { Stack, Box, Link } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ARTICLES } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { Message } from '../../enums/common.enum';
import { sweetMixinErrorAlert } from '../../sweetAlert';
import FeedbackCard from './FeedbackCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ArticleCategory } from '../../enums/article.enum';
import { Article } from '../../types/article/article';
import { CREATE_NOTIFICATION, LIKE_ARTICLE } from '../../../apollo/user/mutation';
import { useTranslation } from 'next-i18next';


const Feedback = () => {
    const device = useDeviceDetect();
    const { t, i18n } = useTranslation('common');
    const [topArticle, setTopArticle] = useState<Article[]>([]);


    /** APOLLO REQUESTS **/
    const [likeTargetAericle] = useMutation(LIKE_ARTICLE);
    const [notificate] = useMutation(CREATE_NOTIFICATION);


    const {
        loading: getArticlesLoading,
        data: getArticlesData,
        error: getArticlesError,
        refetch: getArticlesRefetch
    } = useQuery(GET_ARTICLES, {
        fetchPolicy: 'cache-and-network',
        variables: {
            input:
            {
                page: 1,
                limit: 10,
                direction: 'DESC',
                search: {
                    articleCategory: ArticleCategory.FORWEB
                },
            }
        },
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            console.log("data", data);

            setTopArticle(data?.getArticles?.list);
        },
    });

    const likeArticleHandler = async (user: T, id: string, creatorId: string) => {
        try {
            if (!id) return;
            if (!user._id) throw new Error(Message.SOMETHING_WENT_WRONG);

            await likeTargetAericle({
                variables: { input: id },
            });

            await notificate({
                variables: {
                    input: {
                        articleId: id,
                        authorId: user?._id,
                        notificationType: 'LIKE',
                        notificationGroup: 'ARTICLE',
                        receiverId: creatorId,
                    }
                }
            });
            await getArticlesRefetch({
                input: {
                    page: 1,
                    limit: 10,
                    direction: 'DESC',
                    search: {
                        articleCategory: ArticleCategory.FORWEB
                    },
                }
            });
        } catch (err: any) {
            sweetMixinErrorAlert(err.message).then();
        }
    }

    if (device === 'mobile') {
        return <div>WCAR OPINION MOBILE</div>;
    } else {
        return (
            <Stack className={'top-cars'}>
                <Stack className={'container'}>
                    <Stack className={'info-box'}>
                        <Box component={'div'} className={'left'}>
                            <span style={{ marginTop: '20px' }}>{t('What Our Customers say')}</span>
                            <p style={{ marginTop: '20px' }}>"{t('We value our customers and their opinions matter to us. Your feedback helps us grow and improve every day!')}"</p>
                        </Box>
                        <Box component={'div'} className={'right'}>
                            <div className={'more-box'}>
                                <Link href={'/community'}>
                                    <span style={{ color: 'black' }}>{t('See All Articles')}</span>
                                </Link>
                                <img src="/img/icons/rightup.svg" alt="" />
                            </div>
                        </Box>
                    </Stack>
                    <Stack className={'card-box'}>
                        {topArticle.map((article: Article) => {
                            return (
                                <FeedbackCard article={article} likeArticleHandler={likeArticleHandler} />
                            );
                        })}
                    </Stack>
                </Stack>
            </Stack>
        );
    }
};

export default Feedback;