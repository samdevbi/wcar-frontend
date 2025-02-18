import React, { ChangeEvent, useState } from 'react';
import { Stack, Box, Pagination, Link } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CARS } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { Message } from '../../enums/common.enum';
import { sweetMixinErrorAlert } from '../../sweetAlert';
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';
import FindingCarCard from './FindingCarCard';
import { CREATE_NOTIFICATION, LIKE_CAR, SAVE_CAR } from '../../../apollo/user/mutation';
import { CarsInquiry } from '../../types/car/car.input';
import { Car } from '../../types/car/car';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface FindingCars {
	initialInput: CarsInquiry;
}

const FindingCars = (props: FindingCars) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common');
	const router = useRouter();
	const [topCars, setTopCars] = useState<Car[]>([]);
	const [carTotal, setCarTotal] = useState<number>(0);
	const [searchFilter, setSearchFilter] = useState<CarsInquiry>(
		router?.query?.input ? JSON.parse(router?.query?.input as string) : initialInput,
	);
	const carPaginationChangeHandler = async (event: ChangeEvent<unknown>, value: number) => {
		searchFilter.page = value;
		setSearchFilter({ ...searchFilter });
	};




	/** APOLLO REQUESTS **/
	const [likeTargetCar] = useMutation(LIKE_CAR);
	const [saveTargetCar] = useMutation(SAVE_CAR);
	const [notificate] = useMutation(CREATE_NOTIFICATION);

	const {
		loading: getCarsLoading,
		data: getCarsData,
		error: getCarsError,
		refetch: getCarsRefetch
	} = useQuery(GET_CARS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTopCars(data?.getCars?.list);
			setCarTotal(data.getCars?.metaCounter?.[0]?.total || 0);
		},
	});
	/** HANDLERS **/
	const likeCarHandler = async (user: T, id: string, creatorId: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.SOMETHING_WENT_WRONG);

			await likeTargetCar({
				variables: { input: id },
			});

			await notificate({
				variables: {
					input: {
						carId: id,
						authorId: user._id,
						notificationType: 'LIKE',
						notificationGroup: 'CAR',
						receiverId: creatorId,
					}
				}
			});
			await getCarsRefetch({ input: initialInput });
		} catch (err: any) {
			console.log('Error, likePropertyHandler:', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	}

	const saveCarHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.SOMETHING_WENT_WRONG);

			await saveTargetCar({
				variables: { input: id },
			});
			await getCarsRefetch({ input: initialInput });
		} catch (err: any) {
			console.log('Error, likePropertyHandler:', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	}

	if (device === 'mobile') {
		return <div>WCAR FIND CARS MOBILE</div>;
	} else {
		return (
			<>
				<Stack className={'search-body'}>
					<Box className={'title'}>{t('Find Car For Every LifeStyle')}</Box>
					<Link
						href={'/cars'}
						className={'view-all'}>
						{t('View All')}
						<NorthEastRoundedIcon className={'icon'} />
					</Link>
				</Stack>
				<Stack className={'agent-home-list'}>
					<Stack className={'card-wrap'}>
						{topCars?.map((car: Car) => {
							return (
								<div className={'wrap-main'} key={car?._id}>
									<FindingCarCard car={car} key={car?._id} likeCarHandler={likeCarHandler} saveCarHandler={saveCarHandler} />
								</div>
							);
						})}
					</Stack>
					<Stack className={'pagination'}>
						{carTotal ? (
							<>
								<Stack className="pagination-box">
									<Pagination
										page={searchFilter.page}
										count={Math.ceil(carTotal / searchFilter.limit) || 1}
										onChange={carPaginationChangeHandler}
										shape="rounded"
										color="secondary"
									/>
								</Stack>
								<span>
									{t('Total')} {carTotal} {t('car')}{carTotal > 1 ? 's' : ''} {t('available')}
								</span>
							</>
						) : (
							<div className={'no-data'}>
								<img src="/img/icons/icoAlert.svg" alt="" />
								<p>{t('No')} {t('cars')} {t('found')}</p>
							</div>
						)}
					</Stack>
				</Stack>
			</>
		);
	}
};

FindingCars.defaultProps = {
	initialInput: {
		page: 1,
		limit: 8,
		sort: 'carLikes',
		direction: 'DESC',
		search: {},
	},
};

export default FindingCars;
