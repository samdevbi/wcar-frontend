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
					break;
				case '/cars/detail':
					title = 'Car Search';
					break;
				case '/shop':
					title = 'Product Search';
					break;
				case '/shop/detail':
					title = 'Product Search';
					break;
				case '/agent':
					title = 'Agents';
					break;
				case '/agent/detail':
					title = 'Agent Page';
					break;
				case '/dealers':
					title = 'Dealers';
					break;
				case '/dealers/detail':
					title = 'Dealer Page';
					break;
				case '/service':
					title = 'Services';
					break;
				case '/mypage':
					title = 'my page';
					break;
				case '/community':
					title = 'Community';
					break;
				case '/community/detail':
					title = 'Community Detail';
					break;
				case '/cs':
					title = 'CS';
					break;
				case '/account/join':
					title = 'Join';
					setAuthHeader(true);
					break;
				case '/member':
					title = 'Member Page';
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
