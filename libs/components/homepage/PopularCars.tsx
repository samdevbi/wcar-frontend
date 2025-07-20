import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import Link from 'next/link';
import { GET_CARS, GET_PRODUCTS } from '../../../apollo/user/query';
import { useQuery } from '@apollo/client';
import { T } from '../../types/common';
import { CarsInquiry } from '../../types/car/car.input';
import { Car } from '../../types/car/car';
import PopularCarCard from './PopularCarCard';
import { ProductsInquiry } from '../../types/product/product.input';
import { Product } from '../../types/product/product';
import ProductCard from '../shop/ProductCard';
import { t } from 'i18next';
import { useTranslation } from 'next-i18next';
import { formatterStr } from '../../utils';
import { REACT_APP_API_URL } from '../../config';

interface PopularProductsProps {
	initialInput: ProductsInquiry;
}

const PopularCars = (props: PopularProductsProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common');
	const [popularProducts, setPopularProducts] = useState<Product[]>([]);

	/** APOLLO REQUESTS **/
	const {
		loading: getProductsLoading,
		data: getProductsData,
		error: getProductsError,
		refetch: getProductsRefetch
	} = useQuery(GET_PRODUCTS, {
		fetchPolicy: 'network-only',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setPopularProducts(data?.getProducts?.list);
		},
	});
	/** HANDLERS **/

	const main = popularProducts?.[1];
	if (!popularProducts) return null;

	if (device === 'mobile') {
		return <div>WCAR POPULAR CARS MOBILE</div>;
	} else {
		return (
			<Stack className={'popular-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'right'}>
							<div className={'more-box'}>
								<Link href={'/shop'}>
									<span>{t('See All Products')}</span>
								</Link>
								<img src="/img/icons/rightup.svg" alt="" />
							</div>
						</Box>
					</Stack>
					<Stack className={'main-product'}>
						<Stack className="shop-card">
							<Stack className="top">
								<Link
									href={{
										pathname: '/shop/detail',
										query: { id: main?._id },
									}}
								>
									<img src={`${REACT_APP_API_URL}/${main?.productImages?.[0]}`} alt="" />
								</Link>
							</Stack>
							<Stack className="bottom">
								<Stack className="name-address">
									<Stack className="name">
										<Link
											href={{
												pathname: '/shop/detail',
												query: { id: main?._id },
											}}
										>
											<Typography>{main?.productTitle}</Typography>
										</Link>
									</Stack>
									<Stack className="desc">
										<Typography>
											{main?.productShortDesc}
										</Typography>
									</Stack>
									<Stack className="address">
										<Typography>
											{t('Category')}: <strong>{main?.productType}</strong>
										</Typography>
										<Typography>
											{t('Price')}: <strong>${main?.productPrice}</strong>
										</Typography>
									</Stack>
								</Stack>
								<Stack className="type-buttons">
									<Stack className="type">
										<Link
											className={'p'}
											href={{
												pathname: '/shop/detail',
												query: { id: main?._id },
											}}>
											{t('View Detail')}
										</Link>
									</Stack>
								</Stack>
							</Stack>
						</Stack>
					</Stack>
					<Stack className={'card-box'}>
						{popularProducts.map((product: Product) => {
							return (
								<ProductCard product={product} key={product?._id} />
							);
						})}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

PopularCars.defaultProps = {
	initialInput: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		direction: 'DESC',
		search: {},
	},
};

export default PopularCars;
