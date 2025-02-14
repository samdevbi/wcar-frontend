import React, { useState } from 'react';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { FollowInquiry } from '../../types/follow/follow.input';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { Follower } from '../../types/follow/follow';
import { REACT_APP_API_URL } from '../../config';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentBankIcon from '@mui/icons-material/CommentBank';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { userVar } from '../../../apollo/store';
import { T } from '../../types/common';
import { GET_FOLLOWERS, GET_NOTIFICATIONS } from '../../../apollo/user/query';
import { Notificate, Notificates } from '../../types/notification/notification';
import { NotificationGroup, NotificationStatus, NotificationType } from '../../enums/notification.enum';
import moment from 'moment';
import { NotificationInquiry } from '../../types/notification/notification.input';
import { UPDATE_NOTIFICATION } from '../../../apollo/user/mutation';
import { Message } from '../../enums/common.enum';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useTranslation } from 'next-i18next';

interface NotificationsProps {
	redirectToMemberPageHandler: any;
}

const Notification = (props: NotificationsProps) => {
	const { redirectToMemberPageHandler } = props;
	const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common');
	const user = useReactiveVar(userVar);
	const [notificate, setNotificate] = useState<Notificate[]>([]);
	const [total, setTotal] = useState<number>(0);

	const [updateNotification] = useMutation(UPDATE_NOTIFICATION);

	/** APOLLO REQUESTS **/
	const {
		loading: getNotificationsLoading,
		data: getNotificationsData,
		error: getNotificationsError,
		refetch: getNotificationsRefetch
	} = useQuery(GET_NOTIFICATIONS, {
		fetchPolicy: 'cache-and-network',
		variables: {
			input: {
				page: 1,
				limit: 100,
				sort: 'createdAt',
			}
		},
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setNotificate(data?.getNotifications?.list);
			setTotal(data.getNotifications?.metaCounter?.[0]?.total || 0);
		},
	});

	const updateNotificateHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			await updateNotification({
				variables: {
					input: {
						_id: id,
						notificationStatus: 'READ'
					}
				},
			});

			await getNotificationsRefetch({
				input: {
					page: 1,
					limit: 100,
					sort: 'createdAt'
				}
			});

			await sweetTopSmallSuccessAlert('seccess', 800);
		} catch (err: any) {
			sweetMixinErrorAlert(err.message).then;
		}
	};

	/** HANDLERS **/

	if (device === 'mobile') {
		return <div>WCAR NOTIFICATIONS MOBILE</div>;
	} else {
		return (
			<div id="member-notification-page">
				<Stack className="follows-list-box">
					<Stack className="listing-title-box">
						<Typography className="title-text">{t('Notification')}</Typography>
						<Typography className="title-text">{t('Time')}</Typography>
					</Stack>
					{notificate?.length === 0 && (
						<div className={'no-data'}>
							<img src="/img/icons/icoAlert.svg" alt="" />
							<p>{t('No')} {t('Notification')}</p>
						</div>
					)}
					{notificate?.map((notification: Notificate) => {
						const imagePath: string = notification?.creatorData?.image
							? `${REACT_APP_API_URL}/${notification?.creatorData?.image}`
							: '/img/profile/defaultUser.svg';
						return (
							<Stack className="follows-card-box" key={notification?._id}>
								<Stack className={'info'} onClick={() => {
									if (notification?.creatorData?.type !== 'SERVICE' && notification?.creatorData?.type !== 'SELLER' && notification?.creatorData?.type !== 'USER') {
										redirectToMemberPageHandler(notification?.creatorData?._id);
									}
								}}

								>
									<Stack className="image-box">
										<img src={imagePath} alt="" />
									</Stack>
									<Stack className="information-box">
										<Typography className="name">{notification?.creatorData?.titleNick}</Typography>
										<Typography className="name">{notification?.creatorData?.type}</Typography>
									</Stack>
								</Stack>
								<Stack className={'details-box'}>
									<Box className={'info-box'} component={'div'}>
										{notification?.notificationType === NotificationType.LIKE &&
											notification?.notificationGroup === NotificationGroup.MEMBER && (
												<>
													<span>{t('liked you!')}</span>
													<FavoriteIcon fontSize="small" style={{ color: 'red', marginLeft: '10px' }} />
												</>
											)}

										{notification?.notificationType === NotificationType.LIKE &&
											notification?.notificationGroup === NotificationGroup.CAR && (
												<>
													<span>"{notification?.carData?.carTitle}"</span>
													<p>
														{t('liked')}
													</p>
													<FavoriteIcon fontSize="small" style={{ color: 'red', marginLeft: '10px' }} />
												</>
											)}
										{notification?.notificationType === NotificationType.LIKE &&
											notification?.notificationGroup === NotificationGroup.ARTICLE && (
												<>
													<span>"{notification?.articleData?.articleTitle}"</span>
													<p>{t('liked')}</p>
													<FavoriteIcon fontSize="small" style={{ color: 'red', marginLeft: '10px' }} />
												</>
											)}
										{notification?.notificationType === NotificationType.FOLLOW &&
											notification?.notificationGroup === NotificationGroup.MEMBER && (
												<>
													<span>{t('followed')}</span>
													<PersonAddAlt1Icon fontSize="small" style={{ color: '#FFD117', marginLeft: '10px' }} />
												</>
											)}

										{notification?.notificationType === NotificationType.COMMENT &&
											notification?.notificationGroup === NotificationGroup.MEMBER && (
												<>
													<span>{t('comented you!')}</span>
													<CommentBankIcon fontSize="small" style={{ color: '#FF7039', marginLeft: '10px' }} />
												</>
											)}

										{notification?.notificationType === NotificationType.COMMENT &&
											notification?.notificationGroup === NotificationGroup.CAR && (
												<>
													<span>"{notification?.carData?.carTitle}"</span>
													<p>{t('comented')}</p>
													<CommentBankIcon fontSize="small" style={{ color: '#FF7039', marginLeft: '10px' }} />
												</>
											)}
										{notification?.notificationType === NotificationType.COMMENT &&
											notification?.notificationGroup === NotificationGroup.ARTICLE && (
												<>
													<span>"{notification?.articleData?.articleTitle}"</span>
													<p>{t('comented')}</p>
													<CommentBankIcon fontSize="small" style={{ color: '#FF7039', marginLeft: '10px' }} />
												</>
											)}
									</Box>
									<Box className={'info-box'} component={'div'}>
										<span>
											{moment().diff(moment(notification?.createdAt), 'days') > 0
												? `${moment().diff(moment(notification?.createdAt), 'days')} ${t('days age')}`
												: moment().diff(moment(notification?.createdAt), 'hours') > 0
													? `${moment().diff(moment(notification?.createdAt), 'hours')} ${moment().diff(moment(notification?.createdAt), 'hours') === 1 ? `${t('hour')}` : `${t('hour')}`
													} ${t('ago')}`
													: `${moment().diff(moment(notification?.createdAt), 'minutes')} ${moment().diff(moment(notification?.createdAt), 'minutes') === 1 ? `${t('minute')}` : `${t('minutes')}`
													} ${t('ago')}`}
										</span>
									</Box>
									<Box className={'info-box'} component={'div'}>
										<span>
											{notification?.notificationStatus === NotificationStatus.WAIT && (
												<Typography className="title-text btn" onClick={() => updateNotificateHandler(user, notification?._id)}>{t('Close')}</Typography>
											)}
											{notification?.notificationStatus === NotificationStatus.READ && (
												<DoneAllIcon />
											)}
										</span>
									</Box>
								</Stack>
							</Stack>
						);
					})}
				</Stack>
			</div>
		);
	}
};

export default Notification;