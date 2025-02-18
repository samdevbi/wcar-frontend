import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useQuery } from '@apollo/client';
import { GET_NOTICES } from '../../../apollo/admin/query';
import { NoticeType } from '../../types/notice/notice';
import { NoticeCategory, NoticeGroup } from '../../enums/notice.enum';
import moment from 'moment';
import { useTranslation } from 'next-i18next';

const NoticeComponent = () => {
	const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common');
	const [notices, setNotices] = useState<NoticeType[]>([]);
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
					noticeCategory: NoticeCategory.EVENT,
					noticeGroup: NoticeGroup.EVENT,
				}
			}
		},
		onCompleted: (data) => {

			setNotices(data?.getNotices?.list);
			setTotal(data?.getNotices?.metaCounter[0]?.total);
		},
	});

	const data = [
		{
			no: 1,
			event: true,
			title: 'Register to use and get discounts',
			date: '01.03.2024',
		},
		{
			no: 2,
			title: "It's absolutely free to upload and trade properties",
			date: '31.03.2024',
		},
	];

	if (device === 'mobile') {
		return <div>NOTICE MOBILE</div>;
	} else {
		return (
			<div className={'notice-content'}>
				<span className={'title'}>{t('Notice')}</span>
				<Stack className={'main'}>
					<Box component={'div'} className={'top'}>
						<span>{t('Number')}</span>
						<span>{t('Date')}</span>
					</Box>
					<Stack className={'bottom'}>
						{notices.map((notice: NoticeType, index) => (
							<div className={`notice-card`} key={notice?._id}>
								<span className={'notice-date'} style={{
									flex: "0 0 auto", marginRight: "10px", fontWeight: '500',
									fontSize: '16px',
									marginTop: "5px",
								}}>{index + 1}</span>
								<div style={{ flex: "1", display: 'flex', flexDirection: 'column', gap: '5px' }}>
									<span
										style={{
											maxWidth: '800px',
											fontWeight: '500',
											fontSize: '16px',
											wordWrap: 'break-word',
											overflowWrap: 'break-word',
											whiteSpace: 'normal',
										}}
									>
										{notice?.noticeTitle}
									</span>
									<span
										style={{
											maxWidth: '1100px',
											color: '#555', // Ajralib turishi uchun ochroq rang
											fontSize: '14px',
											marginTop: '5px',
										}}
									>
										{notice?.noticeContent}
									</span>
								</div>

								<span className={'notice-date'} style={{ flex: "0 0 auto", marginLeft: "10px" }}>{moment(notice.createdAt).format('YYYY-MM-DD HH:mm')}</span>
							</div>
						))}
					</Stack>
				</Stack>
			</div>
		);
	}
};

export default NoticeComponent;
