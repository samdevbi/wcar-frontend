import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Link from 'next/link';
import { formatterStr } from '../../utils';
import { REACT_APP_API_URL } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Product } from '../../types/product/product';
import { useTranslation } from 'next-i18next';

interface PropertyCardType {
	product: Product;
}

const ProductCard = (props: PropertyCardType) => {
	const { product } = props;
	const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common');
	const user = useReactiveVar(userVar);
	const imagePath: string = product?.productImages?.[0]
		? `${REACT_APP_API_URL}/${product?.productImages?.[0]}`
		: '/img/banner/header1.svg';

	if (device === 'mobile') {
		return <div>PRODUCT CARD</div>;
	} else {
		return (
			<Stack className="shop-card-config">
				<Stack className="top">
					<Link
						href={{
							pathname: '/shop/detail',
							query: { id: product?._id },
						}}
					>
						<img src={imagePath} alt="" />
					</Link>
					<Box component={'div'} className={'price-box'}>
						<Typography>${formatterStr(product?.productPrice)}</Typography>
					</Box>
				</Stack>
				<Stack className="bottom">
					<Stack className="name-address">
						<Stack className="name">
							<Link
								href={{
									pathname: '/shop/detail',
									query: { id: product?._id },
								}}
							>
								<Typography>{product?.productTitle}</Typography>
							</Link>
						</Stack>
						<Stack className="address">
							<Typography>
								Category: <strong>{product?.productType}</strong>
							</Typography>
							<Stack className="divider"></Stack>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default ProductCard;
