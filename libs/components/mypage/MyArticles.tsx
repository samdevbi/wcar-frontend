import React, { useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Pagination, Stack, Typography } from '@mui/material';
import CommunityCard from '../common/CommunityCard';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { T } from '../../types/common';
import { Article } from '../../types/article/article';
import { Messages } from '../../config';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { GET_ARTICLES } from '../../../apollo/user/query';
import { userVar } from '../../../apollo/store';
import { CREATE_NOTIFICATION, LIKE_ARTICLE } from '../../../apollo/user/mutation';
import { useTranslation } from 'next-i18next';

const MyArticles: NextPage = ({ initialInput, ...props }: T) => {
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const { t, i18n } = useTranslation('common');
	const [searchCommunity, setSearchCommunity] = useState({
		...initialInput,
		search: { memberId: user?._id },
	});
	const [articles, setArticles] = useState<Article[]>([]);
	const [totalCount, setTotalCount] = useState<number>(0);

	/** APOLLO REQUESTS **/
	const [likeTargetArticle] = useMutation(LIKE_ARTICLE);
	const [notificate] = useMutation(CREATE_NOTIFICATION);

	const {
		loading: getArticlesLoading,
		data: getArticlesData,
		error: getArticlesError,
		refetch: getArticlesRefetch,
	} = useQuery(GET_ARTICLES, {
		fetchPolicy: 'network-only',
		variables: { input: searchCommunity },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			console.log("data", data);

			setArticles(data?.getArticles?.list);
			setTotalCount(data?.getArticles?.metaCounter[0]?.total ?? 0);
		},
	});


	/** HANDLERS **/
	const likeArticleHandler = async (e: any, user: any, id: any, creatorId: string) => {
		try {
			e.stopPropagation();
			if (!id) return;
			if (!user._id) throw new Error(Messages.error2);

			await likeTargetArticle({
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

			getArticlesRefetch({ input: searchCommunity });

			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('ERROR, likeArticleHandler:', err);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	const paginationHandler = (e: T, value: number) => {
		setSearchCommunity({ ...searchCommunity, page: value });
	};

	if (device === 'mobile') {
		return <>ARTICLE PAGE MOBILE</>;
	} else
		return (
			<div id="my-articles-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">{t('Article')}</Typography>
						<Typography className="sub-title">{t('We are glad to see you again!')}</Typography>
					</Stack>
				</Stack>
				<Stack className="article-list-box">
					{articles?.length > 0 ? (
						articles?.map((article: Article) => {
							return <CommunityCard article={article} key={article?._id} size={'small'} likeArticleHandler={likeArticleHandler} />;
						})
					) : (
						<div className={'no-data'}>
							<img src="/img/icons/icoAlert.svg" alt="" />
							<p>No Articles found!</p>
						</div>
					)}
				</Stack>

				{articles?.length > 0 && (
					<Stack className="pagination-conf">
						<Stack className="pagination-box">
							<Pagination
								count={Math.ceil(totalCount / searchCommunity.limit)}
								page={searchCommunity.page}
								shape="rounded"
								color="secondary"
								onChange={paginationHandler}
							/>
						</Stack>
						<Stack className="total">
							<Typography>{t('Total')} {totalCount ?? 0} article(s) {t('available')}</Typography>
						</Stack>
					</Stack>
				)}
			</div>
		);
};

MyArticles.defaultProps = {
	initialInput: {
		page: 1,
		limit: 6,
		sort: 'createdAt',
		direction: 'DESC',
		search: {},
	},
};

export default MyArticles;
