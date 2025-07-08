import React from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Member } from '../../types/member/member';

interface TopAgentProps {
	agent: Member;
}
const TopAgentCard = (props: TopAgentProps) => {
	const { agent } = props;
	const router = useRouter();
	const device = useDeviceDetect();
	const agentImage = agent?.image
		? `${process.env.REACT_APP_API_URL}/${agent?.image}`
		: '/img/profile/defaultUser.svg';


	/** HANDLERS **/
	const pushDetailhandler = async (agentId: string) => {
		await router.push({ pathname: '/agent/detail', query: { agentId: agentId } })
	};

	if (device === 'mobile') {
		return <div>WCAR AGENTS MOBILE</div>;
	} else {
		return (
			<Stack className="top-agent-card"
				onClick={() => pushDetailhandler(agent?._id)}
			>
				<div>
					<div className={'email'}>{agent.titleNick}</div>
					<div className={'phone'}>{agent.type}</div>
					<img src={agentImage} alt="" />
					<div className={'fade'}></div>
				</div>
			</Stack>
		);
	}
};

export default TopAgentCard;
