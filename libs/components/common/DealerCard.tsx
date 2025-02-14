import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Stack, Box, Typography } from '@mui/material';
import Link from 'next/link';
import { REACT_APP_API_URL } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import NorthEastOutlinedIcon from '@mui/icons-material/NorthEastOutlined';
import { useTranslation } from 'next-i18next';
import { Member } from '../../types/member/member';

interface DealerCardProps {
	dealer: Member;
	likeMemberHandler: any;
}

const DealerCard = (props: DealerCardProps) => {
	const { dealer, likeMemberHandler } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const { t, i18n } = useTranslation('common');
	const imagePath: string = dealer?.image
		? `${REACT_APP_API_URL}/${dealer?.image}`
		: '/img/profile/defaultUser.svg';

	if (device === 'mobile') {
		return <div>DEALER CARD</div>;
	} else {
		return (
			<Stack className="dealer-general-card">
				<Link
					href={{
						pathname: '/dealers/detail',
						query: { dealerId: dealer?._id },
					}}
				>
					<img src={imagePath} className={'agent-img'} alt="" />
				</Link>
				<Stack className={'agent-desc'}>
					<Box component={'div'} className={'agent-info'}>
						<strong>{dealer?.titleNick}</strong>
					</Box>
					<p>{t('Address')}: {dealer?.address}</p>
				</Stack>

				<Stack className={'button'}>
					<Box component={'div'} className={'agent-info'}>
						<Link
							href={{
								pathname: '/dealers/detail',
								query: { dealerId: dealer?._id },
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

export default DealerCard;
