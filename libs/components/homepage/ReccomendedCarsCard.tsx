import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL, topCarRank } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import LanguageIcon from '@mui/icons-material/Language';
import SpeedIcon from '@mui/icons-material/Speed';
import PinDropIcon from '@mui/icons-material/PinDrop';
import { useTranslation } from 'next-i18next';

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
	const { t, i18n } = useTranslation('common');

	/** HANDLERS **/
	const pushDetailhandler = async (propertyId: string) => {
		await router?.push({ pathname: '/cars/detail', query: { id: propertyId } })
	};

	if (device === 'mobile') {
		return <div>WCAR RECOM CAR CARD MOBILE</div>;
	} else {
		return (
			<div className="trend-card-box" key={car?._id}>
				<div
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${car?.carImages?.[0]})` }}
					onClick={() => {
						pushDetailhandler(car?._id);
					}}
				>
					{car && car?.carRank > topCarRank && (
						<Stack component={'div'} className={'top-badge'}>
							<Typography>{t('TOP')}</Typography>
						</Stack>
					)}
				</div>
				<div className={'info'}>
					<strong className={'title'}
						onClick={() => {
							pushDetailhandler(car?._id);
						}}>
						{car?.carTitle}
					</strong>
					<Divider className={'divider-recom'} sx={{ mt: '20px' }} />
					<div className={'options'}>
						<div>
							<EditCalendarIcon className={'img'} />
							<span>{car?.carYear}</span>
						</div>
						<div>
							<LocalGasStationIcon className={'img'} />
							<span>{car?.carFuelType}</span>
						</div>
						<div>
							<AirlineSeatReclineExtraIcon className={'img'} />
							<span>{car?.carDriveType}</span>
						</div>
					</div>
					<Divider className={'divider-recom'} />
					<div className={'options'}>
						<div>
							<LanguageIcon className={'img'} />
							<span>{car?.carMadeIn}</span>
						</div>
						<div>
							<SpeedIcon className={'img'} />
							<span>{car?.carMileage} {t('km')}</span>
						</div>
						<div>
							<PinDropIcon className={'img'} />
							<span>{car?.carLocation}</span>
						</div>
					</div>
					<Divider className={'divider-recom'} sx={{ mb: '10px' }} />
					<p className={'desc'}><span style={{ fontWeight: '500', color: '#2F313A' }}>Price:</span> ${car?.carPrice?.toLocaleString('de-DE')}</p>
				</div>
			</div>
		);
	}
};

export default RecommendedCarCard;
