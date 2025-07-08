import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Stack, Box, Link } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import TopAgentCard from './TopAgentCard';
import { Member } from '../../types/member/member';
import { ADSInquiry, MembersInquiry } from '../../types/member/member.input';
import { useQuery } from '@apollo/client';
import { GET_AGENTS } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { useTranslation } from 'next-i18next';

interface TopAgentsProps {
	initialInput: ADSInquiry;
}

const TopAgents = (props: TopAgentsProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const { t, i18n } = useTranslation('common');
	const [topAgents, setTopAgents] = useState<Member[]>([]);

	/** APOLLO REQUESTS **/
	const {
		loading: getAgentsLoading,
		data: getAgentsData,
		error: getAgentsError,
		refetch: getAgentsRefetch
	} = useQuery(GET_AGENTS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTopAgents(data?.getAgents?.list);
		},
	});
	/** HANDLERS **/

	if (device === 'mobile') {
		return <div>WCAR AGNETS MOBILE</div>;
	} else {
		return (
			<Stack className={'top-agents'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'right'}>
							<Link className={'more-box'}
								href={'/agent'}>
								<span>{t('Meet Our Team')}</span>
								<p>We go the extra mile to make sure you get the best, every time you trust us with your car needs</p>
							</Link>
						</Box>
					</Stack>
					<Stack className={'wrapper'}>
						<Box component={'div'} className={'card-wrapper'}>
							{topAgents.map((agent: Member) => {
								return (
									<TopAgentCard agent={agent} key={agent?.titleNick} />
								);
							})}
						</Box>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

TopAgents.defaultProps = {
	initialInput: {
		page: 1,
		limit: 5,
		direction: 'DESC',
		search: {},
	},
};

export default TopAgents;
