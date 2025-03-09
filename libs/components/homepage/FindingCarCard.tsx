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
import { Car } from '../../types/car/car';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useTranslation } from 'next-i18next';

interface FinndingCarCardProps {
	car: Car;
	likeCarHandler: any;
	saveCarHandler: any;
	mySaved?: boolean;
}

const FindingCarCard = (props: FinndingCarCardProps) => {
	const { car, likeCarHandler, saveCarHandler, mySaved } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const { t, i18n } = useTranslation('common');
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const pushDetailhandler = async (carId: string) => {
		await router.push({ pathname: '/cars/detail', query: { id: carId } })
	};

	if (device === 'mobile') {
		return <div>WCAR FIND CARS MOBILE</div>;
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
					<p className={'desc'}>By {car?.creatorData?.type} - {car?.creatorData?.titleNick}</p>
					<Divider sx={{ mt: '2px', mb: '2px' }} />
					<div className={'options'}>
						<div>
							<span>{car?.carYear}/</span>
						</div>
						<div>
							<span>{car?.carMileage} Mile/</span>
						</div>
						<div>
							<span>{car?.carFuelType}/</span>
						</div>
						<div>
							<span>{car?.carDriveType}</span>
						</div>
					</div>
					<Divider sx={{ mt: '5px', mb: '5px' }} />
					<div className={'bott'}>
						<p>
							${car?.carPrice}
						</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon style={{ color: '#1D2671' }} />
							</IconButton>
							<Typography className="view-cnt">{car?.carViews}</Typography>
							<IconButton color={'default'} onClick={() => likeCarHandler(user, car?._id, car?.creatorData?._id)}>
								{car?.meLiked && car?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon color="primary" />
								) : (
									<FavoriteBorderOutlinedIcon style={{ color: "#1D2671" }} />
								)}
							</IconButton>
							<Typography className="view-cnt">{car?.carLikes}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default FindingCarCard;
