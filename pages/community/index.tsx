import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Stack, Tab, Typography, Button, Pagination } from '@mui/material';
import CommunityCard from '../../libs/components/common/CommunityCard';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { T } from '../../libs/types/common';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useMutation, useQuery } from '@apollo/client';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import { Messages } from '../../libs/config';
import { ArticlesInquiry } from '../../libs/types/article/article.input';
import { Article } from '../../libs/types/article/article';
import { CREATE_NOTIFICATION, LIKE_ARTICLE } from '../../apollo/user/mutation';
import { GET_ARTICLES } from '../../apollo/user/query';
import { ArticleCategory } from '../../libs/enums/article.enum';
import { useTranslation } from 'next-i18next';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const Community: NextPage = ({ initialInput, ...props }: T) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const { t, i18n } = useTranslation('common');
	const { query } = router;
	const articleCategory = query?.articleCategory as string;
	const [searchCommunity, setSearchCommunity] = useState<ArticlesInquiry>(initialInput);
	const [boardArticles, setBoardArticles] = useState<Article[]>([]);
	const [totalCount, setTotalCount] = useState<number>(0);
	if (articleCategory) initialInput.search.articleCategory = articleCategory;

	/** APOLLO REQUESTS **/
	const [likeTargetBoardArticle] = useMutation(LIKE_ARTICLE);
	const [notificate] = useMutation(CREATE_NOTIFICATION);

	const {
		loading: boardArticlesLoading,
		data: boardArticlesData,
		error: boardArticlesError,
		refetch: boardArticlesRefetch,
	} = useQuery(GET_ARTICLES, {
		fetchPolicy: 'cache-and-network',
		variables: {
			input: searchCommunity,
		},
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setBoardArticles(data?.getArticles?.list);
			setTotalCount(data?.getArticles?.metaCounter[0]?.total);
		},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		if (!query?.articleCategory)
			router.push(
				{
					pathname: router.pathname,
					query: { articleCategory: 'FREE' },
				},
				router.pathname,
				{ shallow: true },
			);
	}, []);

	/** HANDLERS **/
	const tabChangeHandler = async (e: T, value: string) => {
		console.log(value);

		setSearchCommunity({ ...searchCommunity, page: 1, search: { articleCategory: value as ArticleCategory } });
		await router.push(
			{
				pathname: '/community',
				query: { articleCategory: value },
			},
			router.pathname,
			{ shallow: true },
		);
	};

	const paginationHandler = (e: T, value: number) => {
		setSearchCommunity({ ...searchCommunity, page: value });
	};

	const likeBoardArticleHandler = async (e: any, user: any, id: any, creatorId: string) => {
		try {
			e.stopPropagation();
			if (!id) return;
			if (!user._id) throw new Error(Messages.error2);

			await likeTargetBoardArticle({
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

			boardArticlesRefetch({ input: searchCommunity });

			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('ERROR, likeArticleHandler:', err);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	if (device === 'mobile') {
		return <h1>COMMUNITY PAGE MOBILE</h1>;
	} else {
		return (
			<div id="community-list-page">
				<div className="container">
					<TabContext value={searchCommunity.search.articleCategory}>
						<Stack className="main-box">
							<Stack className="left-config">
								<Stack className={'image-info'}>
									<Stack className={'community-name'}>
										<Typography className={'name'}>WCar {t('Community')}</Typography>
									</Stack>
								</Stack>

								<TabList
									orientation="vertical"
									aria-label="lab API tabs example"
									TabIndicatorProps={{
										style: { display: 'none' },
									}}
									onChange={tabChangeHandler}
								>
									<Tab
										value={t('FREE')}
										label={`${t('FREE BOARD')}`}
										className={`tab-button ${searchCommunity.search.articleCategory == 'FREE' ? 'active' : ''}`}
									/>
									<Tab
										value={'RECOMMEND'}
										label={`${t('RECOMMEND')}`}
										className={`tab-button ${searchCommunity.search.articleCategory == 'RECOMMEND' ? 'active' : ''}`}
									/>
									<Tab
										value={'NEWS'}
										label={`${t('NEWS')}`}
										className={`tab-button ${searchCommunity.search.articleCategory == 'NEWS' ? 'active' : ''}`}
									/>
									<Tab
										value={'HUMOR'}
										label={`${t('HUMOR')}`}
										className={`tab-button ${searchCommunity.search.articleCategory == 'HUMOR' ? 'active' : ''}`}
									/>
									<Tab
										value={'OVERVIEW'}
										label={`${t('OVER VIEW')}`}
										className={`tab-button ${searchCommunity.search.articleCategory == 'OVERVIEW' ? 'active' : ''}`}
									/>
									<Tab
										value={'HELPFUL'}
										label={`${t('HELPFUL')}`}
										className={`tab-button ${searchCommunity.search.articleCategory == 'HELPFUL' ? 'active' : ''}`}
									/>
									<Tab
										value={'EVENT'}
										label={`${t('EVENT')}`}
										className={`tab-button ${searchCommunity.search.articleCategory == 'EVENT' ? 'active' : ''}`}
									/>
									<Tab
										value={'FORWEB'}
										label={`${t('For Website')}`}
										className={`tab-button ${searchCommunity.search.articleCategory == 'FORWEB' ? 'active' : ''}`}
									/>
								</TabList>
							</Stack>
							<Stack className="right-config">
								<Stack className="panel-config">
									<Stack className="title-box">
										<Stack className="left">
											<Typography className="title">{searchCommunity.search.articleCategory} {t('BOARD')}</Typography>
											<Typography className="sub-title">
												{t('Express your opinions freely here without content restrictions')}
											</Typography>
										</Stack>
										<Button
											onClick={() =>
												router.push({
													pathname: '/mypage',
													query: {
														category: 'writeArticle',
													},
												})
											}
											className="right"
										>
											{t('Write')}
										</Button>
									</Stack>

									<TabPanel value="FREE">
										<Stack className="list-box">
											{totalCount ? (
												boardArticles?.map((article: Article) => {
													return <CommunityCard
														article={article}
														key={article?._id}
														likeArticleHandler={likeBoardArticleHandler} />;
												})
											) : (
												<Stack className={'no-data'}>
													<img src="/img/icons/icoAlert.svg" alt="" />
													<p>{t('No')} {t('Article')} {t('found!')}</p>
												</Stack>
											)}
										</Stack>
									</TabPanel>
									<TabPanel value="RECOMMEND">
										<Stack className="list-box">
											{totalCount ? (
												boardArticles?.map((article: Article) => {
													return <CommunityCard
														article={article}
														key={article?._id}
														likeArticleHandler={likeBoardArticleHandler} />;
												})
											) : (
												<Stack className={'no-data'}>
													<img src="/img/icons/icoAlert.svg" alt="" />
													<p>{t('No')} {t('Article')} {t('found!')}</p>
												</Stack>
											)}
										</Stack>
									</TabPanel>
									<TabPanel value="NEWS">
										<Stack className="list-box">
											{totalCount ? (
												boardArticles?.map((article: Article) => {
													return <CommunityCard
														article={article}
														key={article?._id}
														likeArticleHandler={likeBoardArticleHandler} />;
												})
											) : (
												<Stack className={'no-data'}>
													<img src="/img/icons/icoAlert.svg" alt="" />
													<p>{t('No')} {t('Article')} {t('found!')}</p>
												</Stack>
											)}
										</Stack>
									</TabPanel>
									<TabPanel value="HUMOR">
										<Stack className="list-box">
											{totalCount ? (
												boardArticles?.map((article: Article) => {
													return <CommunityCard
														article={article}
														key={article?._id}
														likeArticleHandler={likeBoardArticleHandler} />;
												})
											) : (
												<Stack className={'no-data'}>
													<img src="/img/icons/icoAlert.svg" alt="" />
													<p>{t('No')} {t('Article')} {t('found!')}</p>
												</Stack>
											)}
										</Stack>
									</TabPanel>
									<TabPanel value="OVERVIEW">
										<Stack className="list-box">
											{totalCount ? (
												boardArticles?.map((article: Article) => {
													return <CommunityCard
														article={article}
														key={article?._id}
														likeArticleHandler={likeBoardArticleHandler} />;
												})
											) : (
												<Stack className={'no-data'}>
													<img src="/img/icons/icoAlert.svg" alt="" />
													<p>{t('No')} {t('Article')} {t('found!')}</p>
												</Stack>
											)}
										</Stack>
									</TabPanel>
									<TabPanel value="HELPFUL">
										<Stack className="list-box">
											{totalCount ? (
												boardArticles?.map((article: Article) => {
													return <CommunityCard
														article={article}
														key={article?._id}
														likeArticleHandler={likeBoardArticleHandler} />;
												})
											) : (
												<Stack className={'no-data'}>
													<img src="/img/icons/icoAlert.svg" alt="" />
													<p>{t('No')} {t('Article')} {t('found!')}</p>
												</Stack>
											)}
										</Stack>
									</TabPanel>
									<TabPanel value="EVENT">
										<Stack className="list-box">
											{totalCount ? (
												boardArticles?.map((article: Article) => {
													return <CommunityCard
														article={article}
														key={article?._id}
														likeArticleHandler={likeBoardArticleHandler} />;
												})
											) : (
												<Stack className={'no-data'}>
													<img src="/img/icons/icoAlert.svg" alt="" />
													<p>{t('No')} {t('Article')} {t('found!')}</p>
												</Stack>
											)}
										</Stack>
									</TabPanel>
									<TabPanel value="FORWEB">
										<Stack className="list-box">
											{totalCount ? (
												boardArticles?.map((article: Article) => {
													return <CommunityCard
														article={article}
														key={article?._id}
														likeArticleHandler={likeBoardArticleHandler} />;
												})
											) : (
												<Stack className={'no-data'}>
													<img src="/img/icons/icoAlert.svg" alt="" />
													<p>{t('No')} {t('Article')} {t('found!')}</p>
												</Stack>
											)}
										</Stack>
									</TabPanel>
								</Stack>
							</Stack>
						</Stack>
					</TabContext>

					{totalCount > 0 && (
						<Stack className="pagination-config">
							<Stack className="pagination-box">
								<Pagination
									count={Math.ceil(totalCount / searchCommunity.limit)}
									page={searchCommunity.page}
									shape="rounded"
									color="secondary"
									onChange={paginationHandler}
								/>
							</Stack>
							<Stack className="total-result">
								<Typography>
									{t('Total')} {totalCount} article{totalCount > 1 ? 's' : ''} {t('available')}
								</Typography>
							</Stack>
						</Stack>
					)}
				</div>
			</div>
		);
	}
};

Community.defaultProps = {
	initialInput: {
		page: 1,
		limit: 6,
		sort: 'createdAt',
		direction: 'ASC',
		search: {
			articleCategory: 'FREE',
		},
	},
};

export default withLayoutBasic(Community);
