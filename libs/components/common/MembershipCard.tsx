import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { REACT_APP_API_URL } from '../../config';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import NorthEastOutlinedIcon from '@mui/icons-material/NorthEastOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const MembershipCard = () => {
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	if (device === 'mobile') {
		return <div>MEMBERSHIP CARD</div>;
	} else {
		return (
			<div className="membership-general-card">
				<div className={'agent-month'}>
					<div className={'agent-info'}>
						<strong>$49.9</strong>
					</div>
					<Typography>/monthly</Typography>
				</div>

				<div className={'agent-plan'}>
					<div className={'agent-info'}>
						<strong>Basic Plan</strong>
					</div>
					<Typography >Nottingham Road, Alfreton, Derbyshire, DE55 4GR</Typography>
				</div>
				<div className={'agent-desc'}>
					<div className={'agent-info'}>
						<div className={'icon-div'}>
							<CheckOutlinedIcon className={'icon'} />
						</div>
						<strong>KIA London Branch</strong>
					</div>
					<div className={'agent-info'}>
						<div className={'icon-div'}>
							<CheckOutlinedIcon className={'icon'} />
						</div>
						<strong>KIA London Branch</strong>
					</div>
					<div className={'agent-info'}>
						<div className={'icon-div'}>
							<CheckOutlinedIcon className={'icon'} />
						</div>
						<strong>KIA London Branch</strong>
					</div>
					<div className={'agent-info'}>
						<div className={'icon-div'}>
							<CheckOutlinedIcon className={'icon'} />
						</div>
						<strong>KIA London Branch</strong>
					</div>
					<div className={'agent-info'}>
						<div className={'icon-div'}>
							<CheckOutlinedIcon className={'icon'} />
						</div>
						<strong>KIA London Branch</strong>
					</div>
					<div className={'agent-info'}>
						<div className={'icon-div'}>
							<CheckOutlinedIcon className={'icon'} />
						</div>
						<strong>KIA London Branch</strong>
					</div>
				</div>

				<div className={'button'}>
					<div className={'agent-info'}>
						<Link
							href={{
								pathname: '/service/membership',
							}}
						>
							<strong className={'buy'}>Buy Now</strong>
							<NorthEastOutlinedIcon className={'btn-icon'} />
						</Link>
					</div>
				</div>
			</div>
		);
	}
};

export default MembershipCard;
