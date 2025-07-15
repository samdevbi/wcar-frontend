import React from 'react';
import { Stack, Typography, Box, Button } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Link from 'next/link';
import { REACT_APP_API_URL, topCarRank } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Car } from '../../types/car/car';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface CarCardType {
	car: Car;
	likeCarHandler?: any;
	saveCarHandler?: any;
	myFavorites?: boolean;
	mySaved?: boolean;
	recentlyVisited?: boolean;
}

const MainCarCard = (props: CarCardType) => {
	const { car, likeCarHandler, saveCarHandler, mySaved, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const { t, i18n } = useTranslation('common');
	const router = useRouter();
	const imagePath: string = car?.carImages?.[0]
		? `${REACT_APP_API_URL}/${car?.carImages?.[0]}`
		: '/img/banner/header1.svg';

	console.log("imagePath", imagePath);



	const pushDetailhandler = async (carId: string) => {
		console.log("carId:", carId);
		await router.push({ pathname: '/cars/detail', query: { id: carId } })
	};

	if (device === 'mobile') {
		return <div>MAIN CAR CARD</div>;
	} else {
		return (
			<Stack className="card-config">
				<Stack className="top">
					<Link
						href={{
							pathname: '/cars/detail',
							query: { id: car?._id },
						}}
					>
						<img src={imagePath} alt="" />
					</Link>
					{car && car?.carRank > topCarRank && (
						<Stack component={'div'} className={'top-badge'}>
							<Typography>TOP</Typography>
						</Stack>
					)}
					<div onClick={() => saveCarHandler(user, car?._id)}>
						{mySaved ? (
							<BookmarkIcon style={{ color: '#FDFFF5' }} />
						) : car?.meSaved && car?.meSaved?.[0]?.mySaved ? (
							<BookmarkIcon style={{ color: '#FDFFF5' }} />
						) : (
							<BookmarkBorderIcon style={{ color: '#FDFFF5' }} />
						)}
					</div>

				</Stack>
				<Stack className="bottom">
					<Stack className="name-address">
						<Stack className="name">
							<Link
								href={{
									pathname: '/cars/detail',
									query: { id: car?._id },
								}}
							>
								<Typography>{car?.carTitle}</Typography>
							</Link>
						</Stack>
						<Stack className="address">
							<Typography>
								<strong>{t('City')}</strong>: {car?.carLocation}
							</Typography>
						</Stack>
						<Stack className="address">
							<Typography>
								<strong>{t('Address')}</strong>: {car?.carAddress}
							</Typography>
						</Stack>
					</Stack>
					<Stack className="options">
						<Stack className="option">
							<img src="/img/icons/speedb.svg" alt="" />
							<Typography>{car?.carMileage.toLocaleString('de-DE')} {t('km')}</Typography>
						</Stack>
						<Stack className="option">
							<img src="/img/icons/petrolb.svg" alt="" />
							<Typography>{car?.carFuelType}</Typography>
						</Stack>
						<Stack className="option">
							<img src="/img/icons/transb.svg" alt="" />
							<Typography>{car?.carTransmission}</Typography>
						</Stack>
					</Stack>
				</Stack>
				<div className={'divider'}></div>
				<Stack className={'second-box'}>
					{!recentlyVisited && (
						<Stack className="buttons">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{car?.carViews}</Typography>
							<IconButton color={'default'} onClick={() => likeCarHandler(user, car?._id, car?.creatorData?._id)}>
								{myFavorites ? (
									<FavoriteIcon color="primary" />
								) : car?.meLiked && car?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon color="primary" />
								) : (
									<FavoriteBorderIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{car?.carLikes}</Typography>
						</Stack>
					)}
					<div className={'btn-box'}>
						<Stack className="type">
							{car?.carRent === true && (<div className={'feature'}>{t('Rent')}</div>)}
							{car?.carBarter === true && (<div className={'feature'}>{t('Barter')}</div>)}
						</Stack>
					</div>
					<Typography className={'price'}><strong>${car?.carPrice.toLocaleString('de-DE')}</strong></Typography>
				</Stack>
			</Stack>
		);
	}
};

export default MainCarCard;
