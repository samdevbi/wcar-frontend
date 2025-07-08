import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Stack, Typography } from '@mui/material';

const Advertisement = () => {
	const device = useDeviceDetect();

	if (device == 'mobile') {
		return <div>WCAR ADVERTISEMENT MOBILE</div>;
	} else {
		return (
			<Stack className={'video-frame'}>
				<video
					autoPlay
					muted
					loop
					playsInline
					preload="auto"
					style={{ width: '100%', height: '100%', objectFit: 'cover' }}
				>
					<source src="/video/videocar.mov" type="video/mp4" />
				</video>
				<Typography>
					Buy. Sell. Trade. Rent.
				</Typography>
				<span>
					All in one Place
				</span>
			</Stack>
		);
	}
};

export default Advertisement;
