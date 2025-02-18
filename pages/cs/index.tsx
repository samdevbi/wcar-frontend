import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Faq from '../../libs/components/cs/Faq';
import NoticeComponent from '../../libs/components/cs/Notice';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const CS: NextPage = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	const { t, i18n } = useTranslation('common');

	/** HANDLERS **/
	const changeTabHandler = (tab: string) => {
		router.push(
			{
				pathname: '/cs',
				query: { tab: tab },
			},
			undefined,
			{ scroll: false },
		);
	};
	const tab = router.query.tab ?? 'notice';

	if (device === 'mobile') {
		return <h1>CS PAGE MOBILE</h1>;
	} else {
		return (
			<Stack className={'cs-page'}>
				<Stack className={'container'}>
					<Stack component={'div'} className={'cs-main-info'}>
						<Stack component={'div'} className={'info'}>
							<span>{t('Cs center')}</span>
							<p>{t('I will answer your questions')}</p>
						</Stack>
						<Stack component={'div'} className={'btns'}>
							<div
								className={tab == 'notice' ? 'active' : ''}
								onClick={() => {
									changeTabHandler('notice');
								}}
							>
								{t('Notice')}
							</div>
							<div
								className={tab == 'faq' ? 'active' : ''}
								onClick={() => {
									changeTabHandler('faq');
								}}
							>
								{t('FAQ')}
							</div>
						</Stack>
					</Stack>

					<Stack component={'div'} className={'cs-content'}>
						{tab === 'notice' && <NoticeComponent />}

						{tab === 'faq' && <Faq />}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default withLayoutBasic(CS);
