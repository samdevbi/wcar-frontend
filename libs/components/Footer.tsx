import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import useDeviceDetect from '../hooks/useDeviceDetect';
import { Stack, Box } from '@mui/material';
import moment from 'moment';
import { useTranslation } from 'next-i18next';

const Footer = () => {
	const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common');

	if (device == 'mobile') {
		return <div>FOOTER</div>;
	} else {
		return (
			<Stack className={'footer-container'}>
				<Stack className={'main'}>
					<Stack className={'left'}>
						<Box component={'div'} className={'main-box'}>
							<img src="/img/logo/deal1.svg" alt="" className={'logo'} />
							<p className={'wcar'}>Car Sale On</p>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<span>total free customer care</span>
							<p>+82 10 4867 5455</p>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<span>nee live</span>
							<p>+82 10 4867 5455</p>
							<span>Support?</span>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<p>follow us on social media</p>
							<div className={'media-box'}>
								<FacebookOutlinedIcon />
								<TelegramIcon />
								<InstagramIcon />
								<TwitterIcon />
							</div>
						</Box>
					</Stack>
					<Stack className={'right'}>
						<Box component={'div'} className={'top'}>
							<strong>keep yourself up to date</strong>
							<div>
								<input type="text" placeholder={'Your Email'} />
								<span>Subscribe</span>
							</div>
						</Box>
						<Box component={'div'} className={'bottom'}>
							<div>
								<strong>Popular Search</strong>
								<span>Car for Rent</span>
								<span>Car Low to hide</span>
							</div>
							<div>
								<strong>Quick Links</strong>
								<span>Terms of Use</span>
								<span>Privacy Policy</span>
								<span>Pricing Plans</span>
								<span>Our Services</span>
								<span>Contact Support</span>
								<span>FAQs</span>
							</div>
							<div>
								<strong>Discover</strong>
								<span>Seoul</span>
								<span>Gyeongido</span>
								<span>Busan</span>
								<span>Jejudo</span>
							</div>
						</Box>
					</Stack>
				</Stack>
				<Stack className={'second'}>
					<span>© Car Sale On - All rights reserved. CarSaleon {moment().year()}</span>
					<span>Privacy · Terms · Sitemap</span>
				</Stack>
			</Stack>
		);
	}
};

export default Footer;
