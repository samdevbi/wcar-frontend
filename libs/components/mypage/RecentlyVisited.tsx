import React, { useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Pagination, Stack, Typography } from '@mui/material';
import { T } from '../../types/common';
import { useMutation, useQuery } from '@apollo/client';
import { GET_VISITED } from '../../../apollo/user/query';
import { LIKE_CAR } from '../../../apollo/user/mutation';
import { Messages } from '../../config';
import { Car } from '../../types/car/car';
import ViewCarCard from '../common/ViewCard';
import { useTranslation } from 'next-i18next';

const RecentlyVisited: NextPage = () => {
	const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common');
	const [recentlyVisited, setRecentlyVisited] = useState<Car[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [searchVisited, setSearchVisited] = useState<T>({ page: 1, limit: 6 });

	/** APOLLO REQUESTS **/
	const [likeTargetCar] = useMutation(LIKE_CAR);

	const {
		loading: getVisitedLoading,
		data: getVisitedData,
		error: getVisitedError,
		refetch: getVisitedRefetch,
	} = useQuery(GET_VISITED, {
		fetchPolicy: 'network-only',
		variables: {
			input: searchVisited,
		},
		onCompleted: (data: T) => {
			setRecentlyVisited(data?.getVisited?.list);
			setTotal(data?.getVisited?.metaCounter?.[0]?.total ?? 0);
		},
	});

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchVisited({ ...searchVisited, page: value });
	};

	const likeCarHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Messages.error2);

			await likeTargetCar({
				variables: { input: id },
			});
		} catch (err) {
			getVisitedRefetch({ input: searchVisited });
		}
	};

	if (device === 'mobile') {
		return <div>WCAR MY FAVORITES MOBILE</div>;
	} else {
		return (
			<div id="my-favorites-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">{t('Recently Visited')}</Typography>
						<Typography className="sub-title">{t('We are glad to see you again!')}</Typography>
					</Stack>
				</Stack>
				<Stack className="favorites-list-box">
					{recentlyVisited?.length ? (
						recentlyVisited?.map((car: Car) => {
							return <ViewCarCard likeCarHandler={likeCarHandler} car={car} />;
						})
					) : (
						<div className={'no-data'}>
							<img src="/img/icons/icoAlert.svg" alt="" />
							<p>{t('No Cars found!')}</p>
						</div>
					)}
				</Stack>
				{recentlyVisited?.length ? (
					<Stack className="pagination-config">
						<Stack className="pagination-box">
							<Pagination
								count={Math.ceil(total / searchVisited.limit)}
								page={searchVisited.page}
								shape="rounded"
								color="secondary"
								onChange={paginationHandler}
							/>
						</Stack>
						<Stack className="total-result">
							<Typography sx={{ color: "white" }}>
								{t('Total')} {total}  car{total > 1 ? 's' : ''}
							</Typography>
						</Stack>
					</Stack>
				) : null}
			</div>
		);
	}
};

export default RecentlyVisited;
