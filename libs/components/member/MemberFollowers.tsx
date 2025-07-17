import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { FollowInquiry } from '../../types/follow/follow.input';
import { useQuery, useReactiveVar } from '@apollo/client';
import { Follower } from '../../types/follow/follow';
import { REACT_APP_API_URL } from '../../config';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { userVar } from '../../../apollo/store';
import { T } from '../../types/common';
import { GET_FOLLOWERS } from '../../../apollo/user/query';
import { useTranslation } from 'next-i18next';

interface MemberFollowsProps {
	initialInput: FollowInquiry;
	subscribeHandler: any;
	unsubscribeHandler: any;
	likeMemberHandler: any;
	redirectToMemberPageHandler: any;
}

const MemberFollowers = (props: MemberFollowsProps) => {
	const { initialInput, subscribeHandler, unsubscribeHandler, redirectToMemberPageHandler, likeMemberHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const { t, i18n } = useTranslation('common');
	const [total, setTotal] = useState<number>(0);
	const category: any = router.query?.category ?? 'cars';
	const [followInquiry, setFollowInquiry] = useState<FollowInquiry>(initialInput);
	const [memberFollowers, setMemberFollowers] = useState<Follower[]>([]);
	const user = useReactiveVar(userVar);

	/** APOLLO REQUESTS **/
	const {
		loading: getMemberFollowersLoading,
		data: getMemberFollowersData,
		error: getMemberFollowersError,
		refetch: getMemberFollowersRefetch,
	} = useQuery(GET_FOLLOWERS, {
		fetchPolicy: 'network-only',
		variables: { input: followInquiry },
		skip: !followInquiry?.search?.followingId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			console.log("follower", data);

			setMemberFollowers(data?.getMemberFollowers?.list);
			setTotal(data?.getMemberFollowers?.metaCounter[0]?.total);
		},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		if (router?.query?.memberId)
			setFollowInquiry({ ...followInquiry, search: { followingId: router?.query?.memberId as string } });
		else setFollowInquiry({ ...followInquiry, search: { followingId: user?._id } });
	}, [router]);

	useEffect(() => {
		getMemberFollowersRefetch({ input: followInquiry }).then();
	}, [followInquiry]);

	/** HANDLERS **/
	const paginationHandler = async (event: ChangeEvent<unknown>, value: number) => {
		followInquiry.page = value;
		setFollowInquiry({ ...followInquiry });
	};

	if (device === 'mobile') {
		return <div>WCAR FOLLOWS MOBILE</div>;
	} else {
		return (
			<div id="member-follows-page">
				<Stack className="follows-list-box">
					<Stack className="listing-title-box">
						<Typography className="title-text">{t('Name')}</Typography>
						<Typography className="title-text">{t('Follow')}</Typography>
					</Stack>
					{memberFollowers?.length === 0 && (
						<div className={'no-data'}>
							<img src="/img/icons/icoAlert.svg" alt="" />
							<p>{t('No')} {t('Followers')}</p>
						</div>
					)}
					{memberFollowers?.map((follower: Follower) => {
						const imagePath: string = follower?.followerData?.image
							? `${REACT_APP_API_URL}/${follower?.followerData?.image}`
							: '/img/profile/defaultUser.svg';
						return (
							<Stack className="follows-card-box" key={follower?._id}>
								<Stack className={'info'} onClick={() => {
									const followerType = follower?.followerData?.type;
									if (followerType !== 'SELLER' && followerType !== 'SERVICE' && followerType !== 'USER') {
										redirectToMemberPageHandler(follower?.followerData?._id);
									}
								}}>
									<Stack className="image-box">
										<img src={imagePath} alt="" />
									</Stack>
									<Stack className="information-box">
										<Typography className="name">{follower?.followerData?.titleNick}</Typography>
									</Stack>
								</Stack>
								<Stack className={'details-box'}>
									<Box className={'info-box'} component={'div'}>
										<span>{follower?.followerData?.type}</span>
									</Box>
								</Stack>
								{user?._id !== follower?.followerId && follower?.followerData?.type && !['SELLER', 'SERVICE', 'USER'].includes(follower?.followerData?.type) && (
									<Stack className="action-box">
										{follower.meFollowed && follower.meFollowed[0]?.myFollowing ? (
											<>
												<Typography>{t('Following')}</Typography>
												<Button
													variant="outlined"
													sx={{ background: '#ed5858', ':hover': { background: '#ee7171' } }}
													onClick={() =>
														unsubscribeHandler(follower?.followerData?._id, getMemberFollowersRefetch, followInquiry)
													}
												>
													{t('Unfollow')}
												</Button>
											</>
										) : (
											<Button
												variant="contained"
												sx={{ background: '#60eb60d4', ':hover': { background: '#60eb60d4' } }}
												onClick={() =>
													subscribeHandler(follower?.followerData?._id, getMemberFollowersRefetch, followInquiry)
												}
											>
												{t('Follow')}
											</Button>
										)}
									</Stack>
								)}
							</Stack>
						);
					})}
				</Stack>
				{memberFollowers?.length !== 0 && (
					<Stack className="pagination-config">
						<Stack className="pagination-box">
							<Pagination
								page={followInquiry?.page}
								count={Math.ceil(total / followInquiry?.limit)}
								onChange={paginationHandler}
								shape="rounded"
								color="secondary"
							/>
						</Stack>
						<Stack className="total-result">
							<Typography>{total} {t('Followers')}</Typography>
						</Stack>
					</Stack>
				)}
			</div>
		);
	}
};

MemberFollowers.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
		search: {
			followingId: '',
		},
	},
};

export default MemberFollowers;