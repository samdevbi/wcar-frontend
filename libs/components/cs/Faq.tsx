import React, { SyntheticEvent, useState } from 'react';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { AccordionDetails, Box, Stack, Typography } from '@mui/material';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { useQuery } from '@apollo/client';
import { GET_NOTICES } from '../../../apollo/admin/query';
import { NoticeCategory, NoticeGroup, NoticeStatus } from '../../enums/notice.enum';
import { Notice } from '../../types/notice/notice';
import notice from '../../../pages/_admin/cs/notice';
import { useTranslation } from 'next-i18next';

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
	({ theme }) => ({
		border: `1px solid ${theme.palette.divider}`,
		'&:not(:last-child)': {
			borderBottom: 0,
		},
		'&:before': {
			display: 'none',
		},
	}),
);
const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: '1.4rem' }} />} {...props} />
))(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : '#fff',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(180deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));

const Faq = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	const { t, i18n } = useTranslation('common');
	const [category, setCategory] = useState<string>('CAR');
	const [expanded, setExpanded] = useState<string | false>('panel1');
	const [notices, setNotices] = useState<Notice[]>([]);
	const [total, setTotal] = useState<number>(0);

	/** APOLLO REQUESTS **/
	const {
		loading: getNoticesLoading,
		data: getNoticesData,
		error: getNoticesError,
		refetch: getNoticesRefetch,
	} = useQuery(GET_NOTICES, {
		fetchPolicy: 'network-only',
		variables: {
			input: {
				page: 1,
				limit: 100,
				search: {
					noticeStatus: NoticeStatus.ACTIVE,
					noticeCategory: NoticeCategory.FAQ,
					noticeGroup: category,
				}
			}
		},
		onCompleted: (data) => {
			console.log("dataNotice", data);

			setNotices(data?.getNotices?.list);
			setTotal(data?.getNotices?.metaCounter[0]?.total);
		},
	});
	/** LIFECYCLES **/

	/** HANDLERS **/
	const changeCategoryHandler = (category: string) => {
		setCategory(category);
	};

	const handleChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};


	if (device === 'mobile') {
		return <div>FAQ MOBILE</div>;
	} else {
		return (
			<div className={'faq-content'}>
				<Box className={'categories'} component={'div'}>
					<div
						className={category === 'CAR' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('CAR');
						}}
					>
						{t('Cars')}
					</div>
					<div
						className={category === 'PAYMENT' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('PAYMENT');
						}}
					>
						{t('Payment')}
					</div>
					<div
						className={category === 'FOR_BUYERS' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('FOR_BUYERS');
						}}
					>
						{t('Foy Buyers')}
					</div>
					<div
						className={category === 'FOR_AGENTS' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('FOR_AGENTS');
						}}
					>
						{t('For Agents')}
					</div>
					<div
						className={category === 'FOR_DEALERS' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('FOR_DEALERS');
						}}
					>
						{t('For Dealers')}
					</div>
					<div
						className={category === 'MEMBERSHIP' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('MEMBERSHIP');
						}}
					>
						{t('Membership')}
					</div>
					<div
						className={category === 'COMMUNITY' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('COMMUNITY');
						}}
					>
						{t('Community')}
					</div>
					<div
						className={category === 'OTHER' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('OTHER');
						}}
					>
						{t('Other')}
					</div>
				</Box>
				<Box className={'wrap'} component={'div'}>
					{notices &&
						notices.map((notice: Notice) => (
							<Accordion expanded={expanded === notice?._id} onChange={handleChange(notice?._id)} key={notice?.noticeContent}>
								<AccordionSummary id="panel1d-header" className="question" aria-controls="panel1d-content">
									<Typography className="badge" variant={'h4'}>
										Q
									</Typography>
									<Typography
										style={{
											maxWidth: '1000px',
											wordWrap: 'break-word',
											overflowWrap: 'break-word',
											whiteSpace: 'normal',
										}}
									> {notice?.noticeTitle}</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Stack className={'answer flex-box'}>
										<Typography className="badge" variant={'h4'} color={'primary'}>
											A
										</Typography>
										<Typography
											style={{
												maxWidth: '1000px',
												wordWrap: 'break-word',
												overflowWrap: 'break-word',
												whiteSpace: 'normal',
											}}
										>
											{notice?.noticeContent}
										</Typography>

									</Stack>
								</AccordionDetails>
							</Accordion>
						))}
				</Box>
			</div>
		);
	}
};

export default Faq;
