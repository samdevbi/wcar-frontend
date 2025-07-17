import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { FollowInquiry } from '../../types/follow/follow.input';
import { useQuery, useReactiveVar } from '@apollo/client';
import { Following } from '../../types/follow/follow';
import { REACT_APP_API_URL } from '../../config';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { userVar } from '../../../apollo/store';
import { T } from '../../types/common';
import { GET_FOLLOWINGS } from '../../../apollo/user/query';
import { useTranslation } from 'next-i18next';

interface MemberFollowingsProps {
	initialInput: FollowInquiry;
	subscribeHandler: any;
	unsubscribeHandler: any;
	likeMemberHandler: any;
	redirectToMemberPageHandler: any;
}

const MemberFollowings = (props: MemberFollowingsProps) => {
	const { initialInput, subscribeHandler, unsubscribeHandler, redirectToMemberPageHandler, likeMemberHandler } = props;
	const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common');
	const router = useRouter();
	const [total, setTotal] = useState<number>(0);
	const category: any = router.query?.category ?? 'cars';
	const [followInquiry, setFollowInquiry] = useState<FollowInquiry>(initialInput);
	const [memberFollowings, setMemberFollowings] = useState<Following[]>([]);
	const user = useReactiveVar(userVar);

	/** APOLLO REQUESTS **/
	const {
		loading: getMemberFollowingsLoading,
		data: getMemberFollowingsData,
		error: getMemberFollowingsError,
		refetch: getMemberFollowingsRefetch,
	} = useQuery(GET_FOLLOWINGS, {
		fetchPolicy: 'network-only',
		variables: { input: followInquiry },
		skip: !followInquiry?.search?.followerId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			console.log("data", data);

			setMemberFollowings(data?.getMemberFollowings?.list);
			setTotal(data?.getMemberFollowings?.metaCounter[0]?.total);
		},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		if (router.query.memberId)
			setFollowInquiry({ ...followInquiry, search: { followerId: router?.query?.memberId as string } });
		else setFollowInquiry({ ...followInquiry, search: { followerId: user?._id } });
	}, [router]);

	useEffect(() => {
		getMemberFollowingsRefetch({ input: followInquiry }).then();
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
						<Typography className="title-text">{t('Followings')}</Typography>
					</Stack>
					{memberFollowings?.length === 0 && (
						<div className={'no-data'}>
							<img src="/img/icons/icoAlert.svg" alt="" />
							<p>{t('No')} {t('Followings')}</p>
						</div>
					)}
					{memberFollowings?.map((follower: Following) => {
						const imagePath: string = follower?.followingData?.image
							? `${REACT_APP_API_URL}/${follower?.followingData?.image}`
							: '/img/profile/defaultUser.svg';
						return (
							<Stack className="follows-card-box" key={follower?._id}>
								<Stack className={'info'} onClick={() => {
									const followerType = follower?.followingData?.type;
									if (followerType !== 'SELLER' && followerType !== 'SERVICE' && followerType !== 'USER') {
										redirectToMemberPageHandler(follower?.followingData?._id);
									}
								}}>
									<Stack className="image-box">
										<img src={imagePath} alt="" />
									</Stack>
									<Stack className="information-box">
										<Typography className="name">{follower?.followingData?.titleNick}</Typography>
									</Stack>
								</Stack>
								<Stack className={'details-box'}>
									<Box className={'info-box'} component={'div'}>
										<span>{follower?.followingData?.type}</span>
									</Box>
								</Stack>
								{user?._id !== follower?.followingId && follower?.followingData?.type && !['SELLER', 'SERVICE', 'USER'].includes(follower?.followingData?.type) && (
									<Stack className="action-box">
										{follower?.meFollowed && follower.meFollowed[0]?.myFollowing ? (
											<>
												<Typography>{t('Following')}</Typography>
												<Button
													variant="outlined"
													sx={{ background: '#f78181', ':hover': { background: '#f06363' } }}
													onClick={() =>
														unsubscribeHandler(follower?.followingData?._id, getMemberFollowingsRefetch, followInquiry)
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
													subscribeHandler(follower?.followingData?._id, getMemberFollowingsRefetch, followInquiry)
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
				{memberFollowings?.length !== 0 && (
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
							<Typography>{total} {t('Followings')}</Typography>
						</Stack>
					</Stack>
				)}
			</div>
		);
	}
};

MemberFollowings.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
		search: {
			followerId: '',
		},
	},
};

export default MemberFollowings;