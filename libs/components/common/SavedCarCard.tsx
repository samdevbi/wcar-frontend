import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Car } from '../../types/car/car';

interface SavedCarCardProps {
	car: Car;
	saveCarHandler: any;
	mySaved?: boolean;
}

const SavedCarCard = (props: SavedCarCardProps) => {
	const { car, saveCarHandler, mySaved } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const pushDetailhandler = async (carId: string) => {
		await router.push({ pathname: '/cars/detail', query: { id: carId } })
	};

	if (device === 'mobile') {
		return <div>WCAR SEVED CAR MOBILE</div>;
	} else {
		return (
			<Stack className="find-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${car?.carImages?.[0]})` }}
					onClick={() => {
						pushDetailhandler(car?._id);
					}}
				>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}
						onClick={() => {
							pushDetailhandler(car?._id);
						}}>{car?.carTitle}</strong>
					<p className={'desc'}>{car?.carAddress}</p>
					<Divider sx={{ mt: '2px', mb: '2px' }} />
					<div className={'options'}>
						<div>
							<img src="/img/icons/speed.svg" alt="" />
							<span>{car?.carMileage} Mile </span>
						</div>
						<div>
							<img src="/img/icons/petrol.svg" alt="" />
							<span>{car?.carFuelType}</span>
						</div>
						<div>
							<img src="/img/icons/trans.svg" alt="" />
							<span>{car?.carTransmission}</span>
						</div>
					</div>
					<Divider sx={{ mt: '5px', mb: '5px' }} />
					<div className={'bott'}>
						<p>
							${car?.carPrice}
						</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon style={{ color: 'white' }} />
							</IconButton>
							<Typography className="view-cnt">{car?.carViews}</Typography>
							<BookmarkIcon
								onClick={(e: any) => {
									e.stopPropagation();
									saveCarHandler(user, car?._id)
								}}
								color="secondary" />
						</div>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default SavedCarCard;
