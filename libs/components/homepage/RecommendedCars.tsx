import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CARS } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { sweetMixinErrorAlert } from '../../sweetAlert';
import { Message } from '../../enums/common.enum';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { CarsInquiry } from '../../types/car/car.input';
import { Car } from '../../types/car/car';
import { CREATE_NOTIFICATION, LIKE_CAR, SAVE_CAR } from '../../../apollo/user/mutation';
import RecommendedCarCard from './ReccomendedCarsCard';
import { useTranslation } from 'next-i18next';

interface RecommendedCarsProps {
	initialInput: CarsInquiry;
}

const RecommendedCars = (props: RecommendedCarsProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [recomCars, setRecomCars] = useState<Car[]>([]);
	const { t, i18n } = useTranslation('common');

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
			setRecomCars(data?.getCars?.list);
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

	if (!recomCars) return null;

	if (device === 'mobile') {
		return <div>WCAR RECOM CARS MOBILE</div>;
	} else {
		return (
			<Stack className={'trend-properties'}>
				<Stack className={'container'}>
					<Stack className={'card-box'}>
						{recomCars?.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								Recommmended Cars Empty
							</Box>
						) : (
							<Swiper
								className={'trend-property-swiper'}
								slidesPerView={'auto'}
								spaceBetween={10}
								modules={[Autoplay, Navigation, Pagination]}
								navigation={{
									nextEl: '.swiper-trend-next',
									prevEl: '.swiper-trend-prev',
								}}
								pagination={{
									el: '.swiper-trend-pagination',
								}}
							>
								{recomCars?.map((car: Car) => {
									return (
										<SwiperSlide key={car._id} className={'trend-property-slide'}>
											<RecommendedCarCard car={car} likeCarHandler={likeCarHandler} saveCarHandler={saveCarHandler} />
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

RecommendedCars.defaultProps = {
	initialInput: {
		page: 1,
		limit: 16,
		sort: 'carRank',
		direction: 'DESC',
		search: {},
	},
};

export default RecommendedCars;
