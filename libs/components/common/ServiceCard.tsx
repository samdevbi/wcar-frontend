import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Stack, Box, Typography } from '@mui/material';
import Link from 'next/link';
import { REACT_APP_API_URL } from '../../config';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import NorthEastOutlinedIcon from '@mui/icons-material/NorthEastOutlined';
import { useTranslation } from 'next-i18next';

interface AgentCardProps {
	service: any;
	likeMemberHandler: any;
}

const ServiceCard = (props: AgentCardProps) => {
	const { service, likeMemberHandler } = props;
	const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common');
	const user = useReactiveVar(userVar);
	const imagePath: string = service?.image
		? `${REACT_APP_API_URL}/${service?.image}`
		: '/img/profile/defaultUser.svg';

	if (device === 'mobile') {
		return <div>SERVICE CARD</div>;
	} else {
		return (
			<Stack className="dealer-general-card">
				<Link
					href={{
						pathname: '/service/detail',
						query: { serviceId: service?._id },
					}}
				>
					<img src={imagePath} className={'agent-img'} alt="" />
				</Link>
				<Stack className={'agent-desc'}>
					<Box component={'div'} className={'agent-info'}>
						<strong>{service?.titleNick}</strong>
					</Box>
					<p>{t('Address')}: {service?.address}</p>
				</Stack>
				<Stack className={'button'}>
					<Box component={'div'} className={'agent-info'}>
						<Link
							href={{
								pathname: '/service/detail',
								query: { serviceId: service?._id },
							}}
						>
							<strong>{t('See More About')}</strong>
							<NorthEastOutlinedIcon className={'icon'} />
						</Link>
					</Box>
				</Stack>
			</Stack>
		);
	}
};

export default ServiceCard;
