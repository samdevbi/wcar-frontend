import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Head from 'next/head';
import Top from '../Top';
import Footer from '../Footer';
import { Stack } from '@mui/material';
import { getJwtToken, updateUserInfo } from '../../auth';
import Chat from '../Chat';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useTranslation } from 'next-i18next';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Link from 'next/link';

const withLayoutBasic = (Component: any) => {
	return (props: any) => {
		const router = useRouter();
		const { t, i18n } = useTranslation('common');
		const device = useDeviceDetect();
		const [authHeader, setAuthHeader] = useState<boolean>(false);
		const user = useReactiveVar(userVar);

		const memoizedValues = useMemo(() => {
			let title = '',
				desc = '',
				bgImage = '';

			switch (router.pathname) {
				case '/cars':
					title = 'Car Search';
					desc = 'We are glad to see you again!';
					break;
				case '/cars/detail':
					title = 'Car Search';
					desc = 'We are glad to see you again!';
					break;
				case '/shop':
					title = 'Product Search';
					desc = 'We are glad to see you again!';
					break;
				case '/shop/detail':
					title = 'Product Search';
					desc = 'We are glad to see you again!';
					break;
				case '/agent':
					title = 'Agents';
					desc = 'Car / For Rent';
					break;
				case '/agent/detail':
					title = 'Agent Page';
					desc = 'Car / For Rent';
					break;
				case '/dealers':
					title = 'Dealers';
					desc = 'Car / For Rent';
					break;
				case '/dealers/detail':
					title = 'Dealer Page';
					desc = 'Car / For Rent';
					break;
				case '/service':
					title = 'Services';
					desc = 'Service / For Rent';
					break;
				case '/service/detail':
					title = 'Service Page';
					desc = 'Service / For Rent';
					break;
				case '/mypage':
					title = 'my page';
					desc = 'Home / For Rent';
					break;
				case '/community':
					title = 'Community';
					desc = 'Home / For Rent';
					break;
				case '/community/detail':
					title = 'Community Detail';
					desc = 'Home / For Rent';
					break;
				case '/cs':
					title = 'CS';
					desc = 'We are glad to see you again!';
					break;
				case '/account/join':
					title = 'Login/Signup';
					desc = 'Authentication Process';
					setAuthHeader(true);
					break;
				case '/member':
					title = 'Member Page';
					desc = 'Home / For Rent';
					break;
				default:
					break;
			}

			return { title, desc, bgImage };
		}, [router.pathname]);

		/** LIFECYCLES **/
		useEffect(() => {
			const jwt = getJwtToken();
			if (jwt) updateUserInfo(jwt);
		}, []);

		/** HANDLERS **/

		if (device == 'mobile') {
			return <div>WCAR MOBILE</div>;
		} else {
			return (
				<>
					<Head>
						<title>WCar</title>
						<meta name={'title'} content={`WCar`} />
					</Head>
					<Stack id="pc-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack
							className={`header-basic ${authHeader && 'auth'}`}
							style={{
								backgroundImage: `url(${memoizedValues.bgImage})`,
								backgroundSize: 'cover',
							}}
						>
							<Stack className={'container'}>
								<strong>{t(memoizedValues.title)}</strong>
								<Link href={'/'}>
									<span>Home</span>
								</Link>
							</Stack>
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						<Chat />

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		}
	};
};

export default withLayoutBasic;
