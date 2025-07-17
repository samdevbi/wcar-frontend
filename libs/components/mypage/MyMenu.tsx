import React from 'react';
import { useRouter } from 'next/router';
import { Stack, Typography, Box, List, ListItem } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Link from 'next/link';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import PortraitIcon from '@mui/icons-material/Portrait';
import IconButton from '@mui/material/IconButton';
import { REACT_APP_API_URL } from '../../config';
import { logOut } from '../../auth';
import { sweetConfirmAlert } from '../../sweetAlert';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { useTranslation } from 'next-i18next';

const MyMenu = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	const { t, i18n } = useTranslation('common');
	const pathname = router.query.category ?? 'myProfile';
	const category: any = router.query?.category ?? 'myProfile';
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const logoutHandler = async () => {
		try {
			if (await sweetConfirmAlert('Do you want to logout?')) logOut();
		} catch (err: any) {
			console.log('ERROR, logoutHandler:', err.message);
		}
	};

	if (device === 'mobile') {
		return <div>MY MENU</div>;
	} else {
		return (
			<Stack width={'100%'} padding={'30px 24px'}>
				<Stack className={'profile'}>
					<Box component={'div'} className={'profile-img'}>
						<img
							src={user?.image ? `${REACT_APP_API_URL}/${user?.image}` : '/img/profile/defaultUser.svg'}
							alt={'member-photo'}
						/>
					</Box>
					<Stack className={'user-info'}>
						<Typography className={'user-name'}>{user?.titleNick}</Typography>
						<Box component={'div'} className={'user-phone'}>
							<PhoneOutlinedIcon className={'call'} />
							<Typography className={'p-number'}>{user?.phone}</Typography>
						</Box>
						{user?.type === 'ADMIN' ? (
							<a href="/_admin/users" target={'_blank'}>
								<Typography className={'view-list'}>{user?.type}</Typography>
							</a>
						) : (
							<Typography className={'view-list'}>{user?.type}</Typography>
						)}
					</Stack>
				</Stack>
				<Stack className={'sections'}>
					<Stack className={'section'} style={{ height: user.type === 'AGENT' ? '228px' : '153px' }}>
						<List className={'sub-section'}>
							{['AGENT', 'DEALER'].includes(user?.type) && (
								<>
									<ListItem className={pathname === 'addCar' ? 'focus' : ''}>
										<Link
											href={{
												pathname: '/mypage',
												query: { category: 'addCar' },
											}}
											scroll={false}
										>
											<div className={'flex-box'}>
												<img className={'com-icon'} src={'/img/icons/addCar.svg'} alt={'com-icon'} />
												<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
													{t('Add')} {t('Cars')}
												</Typography>
												<IconButton aria-label="delete" sx={{ ml: '40px' }}>
													<PortraitIcon style={{ color: 'red' }} />
												</IconButton>
											</div>
										</Link>
									</ListItem>
									<ListItem className={pathname === 'myCars' ? 'focus' : ''}>
										<Link
											href={{
												pathname: '/mypage',
												query: { category: 'myCars' },
											}}
											scroll={false}
										>
											<div className={'flex-box'}>
												<img className={'com-icon'} src={'/img/icons/myCar.svg'} alt={'com-icon'} />
												<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
													{t('My')} {t('Cars')}
												</Typography>
												<IconButton aria-label="delete" sx={{ ml: '36px' }}>
													<PortraitIcon style={{ color: 'red' }} />
												</IconButton>
											</div>
										</Link>
									</ListItem>
								</>
							)}
							{user?.type === 'SELLER' && (
								<>
									<ListItem className={pathname === 'addProdcut' ? 'focus' : ''}>
										<Link
											href={{
												pathname: '/mypage',
												query: { category: 'addProduct' },
											}}
											scroll={false}
										>
											<div className={'flex-box'}>
												<img className={'com-icon'} src={'/img/icons/addCar.svg'} alt={'com-icon'} />
												<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
													{t('Add')} {t('Product')}
												</Typography>
												<IconButton aria-label="delete" sx={{ ml: '40px' }}>
													<PortraitIcon style={{ color: 'red' }} />
												</IconButton>
											</div>
										</Link>
									</ListItem>
									<ListItem className={pathname === 'myProducts' ? 'focus' : ''}>
										<Link
											href={{
												pathname: '/mypage',
												query: { category: 'myProducts' },
											}}
											scroll={false}
										>
											<div className={'flex-box'}>
												<img className={'com-icon'} src={'/img/icons/myCar.svg'} alt={'com-icon'} />
												<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
													{t('My')} {t('Products')}
												</Typography>
												<IconButton aria-label="delete" sx={{ ml: '36px' }}>
													<PortraitIcon style={{ color: 'red' }} />
												</IconButton>
											</div>
										</Link>
									</ListItem>
									<ListItem className={pathname === 'followings' ? 'focus' : ''}>
										<Link
											href={{
												pathname: '/mypage',
												query: { category: 'followings' },
											}}
											scroll={false}
										>
											<div className={'flex-box'}>
												<GroupAddOutlinedIcon className={'icon'} />
												<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
													{t('Followings')}
												</Typography>
											</div>
										</Link>
									</ListItem>
								</>
							)}
							<ListItem className={pathname === 'mySaved' ? 'focus' : ''}>
								<Link
									href={{
										pathname: '/mypage',
										query: { category: 'mySaved' },
									}}
									scroll={false}
								>
									<div className={'flex-box'}>
										<img className={'com-icon'} src={'/img/icons/savedCar.svg'} alt={'com-icon'} />
										<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
											{t('Saved')}
										</Typography>
									</div>
								</Link>
							</ListItem>
							{['USER', 'AGENT'].includes(user?.type) && (
								<ListItem className={pathname === 'recentlyVisited' ? 'focus' : ''}>
									<Link
										href={{
											pathname: '/mypage',
											query: { category: 'recentlyVisited' },
										}}
										scroll={false}
									>
										<div className={'flex-box'}>
											<img className={'com-icon'} src={'/img/icons/searchWhite.svg'} alt={'com-icon'} />
											<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
												{t('Visited')}
											</Typography>
										</div>
									</Link>
								</ListItem>
							)}
							{['DEALER', 'AGENT'].includes(user?.type) && (
								<>
									<ListItem className={pathname === 'followings' ? 'focus' : ''}>
										<Link
											href={{
												pathname: '/mypage',
												query: { category: 'followings' },
											}}
											scroll={false}
										>
											<div className={'flex-box'}>
												<GroupAddOutlinedIcon className={'icon'} />
												<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
													{t('Followings')}
												</Typography>
											</div>
										</Link>
									</ListItem>
									<ListItem className={pathname === 'followers' ? 'focus' : ''}>
										<Link
											href={{
												pathname: '/mypage',
												query: { category: 'followers' },
											}}
											scroll={false}
										>
											<div className={'flex-box'}>
												<PersonAddAlt1OutlinedIcon className={'icon'} />
												<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
													{t('Followers')}
												</Typography>
											</div>
										</Link>
									</ListItem>
								</>
							)}
						</List>
					</Stack>
					<Stack className={'section'} sx={{ marginTop: '10px' }}>
						<div>
							<List className={'sub-section'}>
								<ListItem className={pathname === 'myArticles' ? 'focus' : ''}>
									<Link
										href={{
											pathname: '/mypage',
											query: { category: 'myArticles' },
										}}
										scroll={false}
									>
										<div className={'flex-box'}>
											<img className={'com-icon'} src={'/img/icons/discoveryWhite.svg'} alt={'com-icon'} />
											<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
												{t('Articles')}
											</Typography>
										</div>
									</Link>
								</ListItem>
								<ListItem className={pathname === 'writeArticle' ? 'focus' : ''}>
									<Link
										href={{
											pathname: '/mypage',
											query: { category: 'writeArticle' },
										}}
										scroll={false}
									>
										<div className={'flex-box'}>
											<img className={'com-icon'} src={'/img/icons/whiteTab.svg'} alt={'com-icon'} />
											<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
												{t('Write')} {t('Article')}
											</Typography>
										</div>
									</Link>
								</ListItem>
							</List>
						</div>
					</Stack>
					<Stack className={'section'} sx={{ marginTop: '30px' }}>
						<List className={'sub-section'}>
							<ListItem className={pathname === 'myProfile' ? 'focus' : ''}>
								<Link
									href={{
										pathname: '/mypage',
										query: { category: 'myProfile' },
									}}
									scroll={false}
								>
									<div className={'flex-box'}>
										<img className={'com-icon'} src={'/img/icons/profile.svg'} alt={'com-icon'} />
										<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
											{t('Profile')}
										</Typography>
									</div>
								</Link>
							</ListItem>
							<ListItem onClick={logoutHandler}>
								<div className={'flex-box'}>
									<img className={'com-icon'} src={'/img/icons/userLogout.svg'} alt={'com-icon'} />
									<Typography className={'sub-title'} variant={'subtitle1'} component={'p'}>
										{t('Logout')}
									</Typography>
								</div>
							</ListItem>
						</List>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default MyMenu;
