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

interface RecommendedCarCardProps {
	car: any;
	likeCarHandler: any;
	saveCarHandler: any;
	mySaved?: boolean;
}

const RecommendedCarCard = (props: RecommendedCarCardProps) => {
	const { car, likeCarHandler, saveCarHandler, mySaved } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const pushDetailhandler = async (propertyId: string) => {
		await router?.push({ pathname: '/cars/detail', query: { id: propertyId } })
	};

	if (device === 'mobile') {
		return <div>WCAR RECOM CAR CARD MOBILE</div>;
	} else {
		return (
			<Stack className="trend-card-box" key={car?._id}>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${car?.carImages?.[0]})` }}
					onClick={() => {
						pushDetailhandler(car?._id);
					}}
				>
					{mySaved ? (
						<BookmarkIcon
							onClick={(e: any) => {
								e.stopPropagation();
								saveCarHandler(user, car?._id)
							}}
							color="secondary"
							style={{ paddingTop: "10px", marginLeft: "10px" }} />

					) : car?.meSaved && car?.meSaved?.[0]?.mySaved ? (

						<BookmarkIcon
							onClick={(e: any) => {
								e.stopPropagation();
								saveCarHandler(user, car?._id)
							}}
							color="secondary"
							style={{ paddingTop: "10px", marginLeft: "10px" }} />

					) : (
						<BookmarkBorderIcon
							onClick={(e: any) => {
								e.stopPropagation();
								saveCarHandler(user, car?._id)
							}}
							style={{ color: 'white', paddingTop: "10px", marginLeft: "10px" }}
						/>
					)}
					<div>Top Car</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}
						onClick={() => {
							pushDetailhandler(car?._id);
						}}>
						{car?.carTitle}
					</strong>
					<p className={'desc'}>{car?.carAddress}</p>
					<div className={'options'}>
						<div>
							<img src="/img/icons/speed.svg" alt="" />
							<span>{car?.carMileage} Miles</span>
						</div>
						<div>
							<img src="/img/icons/petrol.svg" alt="" />
							<span>{car?.carFuelType}</span>
						</div>
						<div>
							<img src="/img/icons/trans.svg" alt="" />
							<span>{car?.carTransmission}</span>
						</div>
						<div>
							<span style={{ fontWeight: 600, fontSize: '20px' }}>${car?.carPrice}</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '5px' }} />
					<div className={'bott'}>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon style={{ color: 'white' }} />
							</IconButton>
							<Typography className="view-cnt">{car?.carViews}</Typography>
							<IconButton color={'default'} onClick={() => likeCarHandler(user, car?._id, car?.creatorData?._id)}>
								{car?.meLiked && car?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon style={{ color: 'white' }} />
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

export default RecommendedCarCard;
