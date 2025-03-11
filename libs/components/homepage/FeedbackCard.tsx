import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Article } from '../../types/article/article';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';


interface TopArticleCardProps {
    article: Article;
    likeArticleHandler: any;
    myLiked?: any;
}

const FeedbackCard = (props: TopArticleCardProps) => {
    const { article, myLiked, likeArticleHandler } = props;
    const device = useDeviceDetect();
    const router = useRouter();
    const user = useReactiveVar(userVar);
    const cleanContent = article.articleContent.replace(/<\/?p>/g, '');


    /** HANDLERS **/
    const pushDetailhandler = async (articleId: string) => {
        await router.push({ pathname: '/community/detail', query: { id: articleId } })
    };

    if (device === 'mobile') {
        return <div>WCAR OPINION CARD MOBILE</div>;
    } else {
        return (
            <Stack className="post-card-box"
                onClick={() => pushDetailhandler(article?._id)}
            >
                <Box component={'div'} className={'top'}>
                    <Typography className={'title'}>{article.articleTitle}</Typography>
                    <div className={'img'}>
                        <img src="" alt="" />
                    </div>
                </Box>
                <div className={'middle'}>
                    <p className={'desc'}>
                        {cleanContent}
                    </p>
                </div>
                <div className={'member'}>
                    <div className={'member-img'}>
                        <img src={
                            article?.creatorData?.image
                                ? `${REACT_APP_API_URL}/${article?.creatorData?.image}`
                                : `/img/profile/defaultUser.svg`
                        } alt="" />
                    </div>
                    <div className={'info'}>
                        <span className={'name'}>{article?.creatorData?.titleNick}</span>
                    </div>
                    {myLiked ? (
                        <StarRateIcon
                            className={'icon'}
                            onClick={(e: any) => {
                                e.stopPropagation();
                                likeArticleHandler(user, article?._id, article?.creatorData?._id)
                            }}
                            style={{ color: '#ffce69' }} />

                    ) : article?.meLiked && article?.meLiked?.[0]?.myFavorite ? (

                        <StarRateIcon
                            className={'icon'}
                            onClick={(e: any) => {
                                e.stopPropagation();
                                likeArticleHandler(user, article?._id, article?.creatorData?._id)
                            }}
                            style={{ color: '#fcb045' }} />

                    ) : (
                        <StarBorderIcon
                            className={'icon'}
                            onClick={(e: any) => {
                                e.stopPropagation();
                                likeArticleHandler(user, article?._id, article?.creatorData?._id)
                            }}
                            style={{ color: '#fcb045' }}
                        />
                    )}
                    <p className={'likes'} style={{ marginLeft: '5px' }}>
                        {article?.articleLikes}
                    </p>
                </div>
            </Stack>
        );
    }
};

export default FeedbackCard;