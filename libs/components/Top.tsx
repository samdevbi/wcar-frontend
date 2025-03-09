import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useRouter, withRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { getJwtToken, logOut, updateUserInfo } from '../auth';
import { Stack, Box, Badge } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { CaretDown } from 'phosphor-react';
import useDeviceDetect from '../hooks/useDeviceDetect';
import Link from 'next/link';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useQuery, useReactiveVar } from '@apollo/client';
import { userVar } from '../../apollo/store';
import { Logout } from '@mui/icons-material';
import { REACT_APP_API_URL } from '../config';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookIcon from '@mui/icons-material/Book';
import CommentBankIcon from '@mui/icons-material/CommentBank';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { GET_NOTIFICATIONS } from '../../apollo/user/query';
import { T } from '../types/common';
import { Notificate } from '../types/notification/notification';
import { NotificationGroup, NotificationStatus, NotificationType } from '../enums/notification.enum';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const Top = () => {
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const { t, i18n } = useTranslation('common');
	const router = useRouter();
	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
	const [lang, setLang] = useState<string | null>('en');
	const drop = Boolean(anchorEl2);
	const [colorChange, setColorChange] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<any | HTMLElement>(null);
	let open = Boolean(anchorEl);
	const [bgColor, setBgColor] = useState<boolean>(false);
	const [logoutAnchor, setLogoutAnchor] = React.useState<null | HTMLElement>(null);
	const [notifAnchor, setNotifAnchor] = React.useState<null | HTMLElement>(null);
	const logoutOpen = Boolean(logoutAnchor);
	const notifOpen = Boolean(notifAnchor);
	const [notificate, setNotificate] = useState<Notificate[]>([]);
	const [total, setTotal] = useState<number>(0);


	const {
		loading: getNotificationsLoading,
		data: getNotificationsData,
		error: getNotificationsError,
		refetch: getNotificationsRefetch
	} = useQuery(GET_NOTIFICATIONS, {
		skip: !user?._id,
		fetchPolicy: 'cache-and-network',
		variables: {
			input: {
				page: 1,
				limit: 100,
				...(NotificationStatus.WAIT ? { notificationStatus: NotificationStatus.WAIT } : {})
			}

		},
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setNotificate(data?.getNotifications?.list);
			setTotal(data.getNotifications?.metaCounter?.[0]?.total || 0);
			console.log("data", data)
		},
	});
	/** LIFECYCLES **/
	useEffect(() => {
		if (localStorage.getItem('locale') === null) {
			localStorage.setItem('locale', 'en');
			setLang('en');
		} else {
			setLang(localStorage.getItem('locale'));
		}
	}, [router]);

	useEffect(() => {
		switch (router.pathname) {
			case '/cars/detail':
				setBgColor(true);
				break;
			default:
				break;
		}
	}, [router]);

	useEffect(() => {
		const jwt = getJwtToken();
		if (jwt) updateUserInfo(jwt);
	}, []);

	/** HANDLERS **/
	const langClick = (e: any) => {
		setAnchorEl2(e.currentTarget);
	};

	const langClose = () => {
		setAnchorEl2(null);
	};

	const langChoice = useCallback(
		async (e: any) => {
			setLang(e.target.id);
			localStorage.setItem('locale', e.target.id);
			setAnchorEl2(null);
			await router.push(router.asPath, router.asPath, { locale: e.target.id });
		},
		[router],
	);

	const changeNavbarColor = () => {
		if (window.scrollY >= 50) {
			setColorChange(true);
		} else {
			setColorChange(false);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleHover = (event: any) => {
		if (anchorEl !== event.currentTarget) {
			setAnchorEl(event.currentTarget);
		} else {
			setAnchorEl(null);
		}
	};

	const StyledMenu = styled((props: MenuProps) => (
		<Menu
			elevation={0}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			{...props}
		/>
	))(({ theme }) => ({
		'& .MuiPaper-root': {
			top: '109px',
			borderRadius: 6,
			marginTop: theme.spacing(1),
			minWidth: 160,
			color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
			boxShadow:
				'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
			'& .MuiMenu-list': {
				padding: '4px 0',
			},
			'& .MuiMenuItem-root': {
				'& .MuiSvgIcon-root': {
					fontSize: 18,
					color: theme.palette.text.secondary,
					marginRight: theme.spacing(1.5),
				},
				'&:active': {
					backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
				},
			},
		},
	}));

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', changeNavbarColor);
	}

	if (device == 'mobile') {
		return <div>TOP</div>;
	} else {
		return (
			<Stack className={'navbar'}>
				<Stack className={`navbar-main ${colorChange ? 'transparent' : ''} ${bgColor ? 'transparent' : ''}`}>
					<Stack className={'container'}>
						<Box component={'div'} className={'logo-box'}>
							<Link href={'/'}>
								<p>WCar</p>
							</Link>
						</Box>
						<Box component={'div'} className={'router-box'}>
							<Link href={'/cars'}>
								<div>{t('Cars')}</div>
							</Link>
							<Link href={'/agent'}>
								<div> {t('Agents')} </div>
							</Link>
							<Link href={'/dealers'}>
								<div>{t('Dealers')}</div>
							</Link>
							<Link href={'/shop'}>
								<div>{t('Shop')}</div>
							</Link>
							<Link href={'/service'}>
								<div>{t('Service')}</div>
							</Link>
							<Link href={'/community?articleCategory=FREE'}>
								<div> {t('Community')} </div>
							</Link>
							<Link href={'/cs'}>
								<div> {t('CS')} </div>
							</Link>
							<Link href={'/about'}>
								<div> {t('About')} </div>
							</Link>
						</Box>
						<Box component={'div'} className={'user-box'}>
							{user?._id ? (
								<>
									<div className={'login-user'} onClick={(event: any) => setLogoutAnchor(event.currentTarget)}>
										<img
											src={
												user?.image ? `${REACT_APP_API_URL}/${user?.image}` : '/img/profile/defaultUser.svg'
											}
											alt=""
										/>
									</div>

									<Menu
										id="basic-menu"
										anchorEl={logoutAnchor}
										open={logoutOpen}
										onClose={() => {
											setLogoutAnchor(null);
										}}
										sx={{ mt: '5px' }}
									>
										<MenuItem >
											<Link href={'/mypage'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
												<PersonIcon fontSize="small" style={{ color: 'blue', marginRight: '10px' }} />
												{t('Profile')}
											</Link>
										</MenuItem>
										<MenuItem onClick={() => logOut()}>
											<Logout fontSize="small" style={{ color: 'blue', marginRight: '10px' }} />
											{t('Logout')}
										</MenuItem>
									</Menu>
								</>
							) : (
								<Link href={'/account/join'}>
									<div className={'join-box'}>
										<AccountCircleOutlinedIcon />
										<span>
											{t('Register')}
										</span>
									</div>
								</Link>
							)}

							<div className={'lan-box'}>
								{user?._id &&
									<>
										<Badge
											badgeContent={total > 0 ? total : 0}
											color="error"
											invisible={total === 0} // Agar notification yo'q bo'lsa, ko'rsatma
										>
											<NotificationsOutlinedIcon
												className={'notification-icon'}
												onClick={(event: any) => setNotifAnchor(event.currentTarget)}
											/>
										</Badge>


										{
											notificate?.length !== 0 && (
												<Menu
													id="basic-menu"
													anchorEl={notifAnchor}
													open={notifOpen}
													onClose={() => {
														setNotifAnchor(null);
													}}
													className={'notif'}
													sx={{ mt: '20px', maxHeight: '800px' }}
												>
													{notificate?.map((notification: Notificate) => {
														return (
															<MenuItem className={'notif-item'}
																style={{
																	maxWidth: '540px',
																	height: '40px'
																}} >
																<Link href={'/mypage?category=notification'} style={{ display: 'flex', justifyContent: 'flexStart', alignItems: 'center' }}>
																	<PersonIcon fontSize="small" style={{ color: 'blue', marginRight: '10px' }} />
																	<p
																		style={{
																			maxWidth: '140px',
																			fontSize: '12px',
																			fontWeight: 800,
																			whiteSpace: 'nowrap',
																			overflow: 'hidden',
																			textOverflow: 'ellipsis',
																			marginRight: '10px'
																		}}
																	>
																		{notification?.creatorData?.titleNick}
																	</p>
																	<p
																		style={{
																			maxWidth: '90px',
																			fontSize: '12px',
																			fontWeight: 600,
																			whiteSpace: 'nowrap',
																			overflow: 'hidden',
																			textOverflow: 'ellipsis',
																		}}
																	>
																		{notification?.notificationGroup === NotificationGroup.CAR && (
																			<>
																				"{notification?.carData?.carTitle}"
																			</>
																		)}
																		{notification?.notificationGroup === NotificationGroup.MEMBER && (
																			<>
																				"{t('You')}"
																			</>
																		)}
																		{notification?.notificationGroup === NotificationGroup.ARTICLE && (
																			<>
																				"{notification?.articleData?.articleTitle}"
																			</>
																		)}
																	</p>
																	<p
																		style={{
																			maxWidth: '140px',
																			fontSize: '12px',
																			whiteSpace: 'nowrap',
																			overflow: 'hidden',
																			textOverflow: 'ellipsis',
																		}}
																	>
																		{notification?.notificationType === NotificationType.COMMENT && (
																			<div>{t('comented')}</div>
																		)}
																		{notification?.notificationType === NotificationType.LIKE && (
																			<div>{t('liked')}</div>
																		)}
																		{notification?.notificationType === NotificationType.FOLLOW && (
																			<div>{t('followed you')}</div>
																		)}
																	</p>
																	{notification?.notificationType === NotificationType.LIKE && (
																		<FavoriteIcon fontSize="small" style={{ color: 'red' }} />
																	)}

																	{notification?.notificationType === NotificationType.COMMENT && (
																		<CommentBankIcon fontSize="small" style={{ color: '#FF7039' }} />
																	)}

																	{notification?.notificationType === NotificationType.FOLLOW && (
																		<PersonAddAlt1Icon fontSize="small" style={{ color: '#FFD117' }} />
																	)}
																</Link>
															</MenuItem>
														)
													})}

												</Menu>
											)
										}
									</>}
								<Button
									disableRipple
									className="btn-lang"
									onClick={langClick}
									endIcon={<CaretDown size={14} color="#616161" weight="fill" />}
								>
									<Box component={'div'} className={'flag'}>
										{lang !== null ? (
											<img src={`/img/flag/lang${lang}.png`} alt={'usaFlag'} />
										) : (
											<img src={`/img/flag/langen.png`} alt={'usaFlag'} />
										)}
									</Box>
								</Button>

								<StyledMenu anchorEl={anchorEl2} open={drop} onClose={langClose} sx={{ position: 'absolute' }}>
									<MenuItem disableRipple onClick={langChoice} id="en">
										<img
											style={{ width: '24px', height: '24px', marginRight: '8px' }}
											src={'/img/flag/langen.png'}
											onClick={langChoice}
											id="en"
											alt={'usaFlag'}
										/>
										{t('English')}
									</MenuItem>
									<MenuItem disableRipple onClick={langChoice} id="kr">
										<img
											style={{ width: '24px', height: '24px', marginRight: '8px' }}
											src={'/img/flag/langkr.png'}
											onClick={langChoice}
											id="uz"
											alt={'koreanFlag'}
										/>
										{t('Korean')}
									</MenuItem>
									<MenuItem disableRipple onClick={langChoice} id="ru">
										<img
											style={{ width: '24px', height: '24px', marginRight: '8px' }}
											src={'/img/flag/langru.png'}
											onClick={langChoice}
											id="ru"
											alt={'russiaFlag'}
										/>
										{t('Russian')}
									</MenuItem>
								</StyledMenu>
							</div>
						</Box>
					</Stack>
				</Stack>
			</Stack >
		);
	}
};

export default withRouter(Top);
