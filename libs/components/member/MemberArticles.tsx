import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Pagination, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import CommunityCard from '../common/CommunityCard';
import { T } from '../../types/common';
import { Article } from '../../types/article/article';
import { ArticlesInquiry } from '../../types/article/article.input';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { CREATE_NOTIFICATION, LIKE_ARTICLE } from '../../../apollo/user/mutation';
import { Messages } from '../../config';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { GET_ARTICLES } from '../../../apollo/user/query';
import { userVar } from '../../../apollo/store';

const MemberArticles: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();
	const [total, setTotal] = useState<number>(0);
	const { memberId } = router.query;
	const [searchFilter, setSearchFilter] = useState<ArticlesInquiry>(initialInput);
	const [memberArticles, setMemberArticles] = useState<Article[]>([]);

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
		variables: { input: searchFilter },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setMemberArticles(data?.getArticles?.list);
			setTotal(data?.getArticles?.metaCounter[0]?.total ?? 0);
		},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		if (memberId) setSearchFilter({ ...initialInput, search: { memberId: memberId } });
	}, [memberId]);

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFilter({ ...searchFilter, page: value });
	};

	const likeArticleHandler = async (e: any, user: any, id: string, creatorId: string) => {
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

			getArticlesRefetch({ input: searchFilter });

			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('ERROR, likeArticleHandler:', err);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	if (device === 'mobile') {
		return <div>MEMBER ARTICLES MOBILE</div>;
	} else {
		return (
			<div id="member-articles-page">
				<Stack className="articles-list-box">
					{memberArticles?.length === 0 && (
						<div className={'no-data'}>
							<img src="/img/icons/icoAlert.svg" alt="" />
							<p>No Articles found!</p>
						</div>
					)}
					{memberArticles?.map((article: Article) => {
						return (
							<CommunityCard
								article={article}
								likeArticleHandler={likeArticleHandler}
								key={article?._id}
								size={'small'}
							/>
						);
					})}
				</Stack>
				{memberArticles?.length !== 0 && (
					<Stack className="pagination-config">
						<Stack className="pagination-box">
							<Pagination
								count={Math.ceil(total / searchFilter.limit) || 1}
								page={searchFilter.page}
								shape="rounded"
								color="secondary"
								onChange={paginationHandler}
							/>
						</Stack>
						<Stack className="total-result">
							<Typography>{total} property available</Typography>
						</Stack>
					</Stack>
				)}
			</div>
		);
	}
};

MemberArticles.defaultProps = {
	initialInput: {
		page: 1,
		limit: 2,
		sort: 'createdAt',
		direction: 'DESC',
		search: {},
	},
};

export default MemberArticles;