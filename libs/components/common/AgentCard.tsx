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

interface AgentCardProps {
	agent: any;
	likeMemberHandler: any;
}

const AgentCard = (props: AgentCardProps) => {
	const { agent, likeMemberHandler } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = agent?.image
		? `${REACT_APP_API_URL}/${agent?.image}`
		: '/img/profile/defaultUser.svg';

	if (device === 'mobile') {
		return <div>AGENT CARD</div>;
	} else {
		return (
			<Stack className="agent-general-card">
				<Link
					href={{
						pathname: '/agent/detail',
						query: { agentId: agent?._id },
					}}
				>
					<Box
						component={'div'}
						className={'agent-img'}
						style={{
							backgroundImage: `url(${imagePath})`,
							backgroundSize: 'cover',
							backgroundPosition: 'top center',
							backgroundRepeat: 'no-repeat',
						}}
					>
					</Box>
				</Link>

				<Stack className={'agent-desc'}>
					<Box component={'div'} className={'agent-info'}>
						<Link
							href={{
								pathname: '/agent/detail',
								query: { agentId: 'id' },
							}}
						>
						</Link>
						<span>{agent?.type}</span>
						<strong>{agent?.titleNick}</strong>
						<span>{agent?.memberCars} cars</span>
					</Box>
					<Box component={'div'} className={'buttons'}>
						<IconButton color={'default'}>
							<RemoveRedEyeIcon className={'icon'} />
						</IconButton>
						<Typography className="view-cnt">{agent?.views}</Typography>
						<IconButton color={'default'} onClick={() => likeMemberHandler(user, agent?._id)}>
							{agent?.meLiked && agent?.meLiked[0]?.myFavorite ? (
								<FavoriteIcon color={'primary'} />
							) : (
								<FavoriteBorderIcon className={'icon'} />
							)}
						</IconButton>
						<Typography className="view-cnt">{agent?.likes}</Typography>
					</Box>
				</Stack>
			</Stack>
		);
	}
};

export default AgentCard;
