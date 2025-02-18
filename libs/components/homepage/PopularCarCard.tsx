import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL, topCarRank } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Car } from '../../types/car/car';

interface PopularCarCardProps {
	car: Car;
}

const PopularCarCard = (props: PopularCarCardProps) => {
	const { car } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const pushDetailhandler = async (carId: string) => {
		console.log("carId:", carId);
		await router.push({ pathname: '/cars/detail', query: { id: carId } })
	};

	if (device === 'mobile') {
		return <div>WCAR POPULAR CAR CARD MOBILE</div>;
	} else {
		return (
			<Stack className="popular-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${car?.carImages?.[0]})` }}
					onClick={() => {
						pushDetailhandler(car._id);
					}}
				>
					{car && car?.carRank >= topCarRank ? (
						<div className={'status'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<span>top</span>
						</div>
					) : (
						''
					)}

					<div className={'price'}>
						<BookmarkIcon style={{ color: 'blue' }} />
					</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}
						onClick={() => {
							pushDetailhandler(car._id);
						}}>{car.carTitle}</strong>
					<p className={'desc'}>{car.carAddress}</p>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'options'}>
						<div>
							<CalendarMonthIcon className={'icon'} />
							<span>{car.carYear} Year</span>
						</div>
						<div>
							<img src="/img/icons/speed.svg" alt="" />
							<span>{car.carMileage} Mile</span>
						</div>
						<div>
							<img src="/img/icons/trans.svg" alt="" />
							<span>{car.carMileage}</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p>${car?.carPrice}</p>
						<p>{car?.carRent ? 'rent' : 'sale'}</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon style={{ color: 'white' }} />
							</IconButton>
							<Typography className="view-cnt">{car?.carViews}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default PopularCarCard;
