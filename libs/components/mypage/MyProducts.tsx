import React, { useState } from 'react';
import { NextPage } from 'next';
import { Pagination, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { T } from '../../types/common';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import { sweetConfirmAlert, sweetErrorHandling } from '../../sweetAlert';
import { UPDATE_PRODUCT } from '../../../apollo/user/mutation';
import { SellerProductsInquiry } from '../../types/product/product.input';
import { Product } from '../../types/product/product';
import { ProductStatus } from '../../enums/product.enum';
import { GET_PRODUCTS, GET_SELLER_PRODUCTS } from '../../../apollo/user/query';
import ProductCard from '../shop/ProductCard';
import { MyProductCard } from '../common/ProductCard';
import { useTranslation } from 'next-i18next';

const MyProducts: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common');
	const [searchFilter, setSearchFilter] = useState<SellerProductsInquiry>(initialInput);
	const [products, setProducts] = useState<Product[]>([]);
	const [total, setTotal] = useState<number>(0);
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** APOLLO REQUESTS **/
	const [updateProduct] = useMutation(UPDATE_PRODUCT);

	const {
		loading: getSellerProductsLoading,
		data: getSellerProductsData,
		error: getSellerProductsError,
		refetch: getSellerProductsRefetch,
	} = useQuery(GET_SELLER_PRODUCTS, {
		fetchPolicy: 'network-only',
		variables: { input: searchFilter },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			console.log("data", data);

			setProducts(data?.getSellerProducts?.list);
			setTotal(data?.getSellerProducts?.metaCounter?.[0]?.total ?? 0);
		}
	});

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFilter({ ...searchFilter, page: value });
	};

	const changeStatusHandler = (value: ProductStatus) => {
		setSearchFilter({ ...searchFilter, search: { productStatus: value } });
	};

	const deleteProductHandler = async (id: string) => {
		try {
			if (await sweetConfirmAlert('Are you sure to delete this product?')) {
				await updateProduct({
					variables: {
						input: {
							_id: id,
							productStatus: "DELETE",
						},
					},
				});

				await getSellerProductsRefetch({ input: searchFilter });
			}
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};

	const updateProductHandler = async (status: string, id: string) => {
		try {
			if (await sweetConfirmAlert(`Are you sure change to ${status} status?`)) {
				await updateProduct({
					variables: {
						input: {
							_id: id,
							productStatus: status,
						},
					},
				});

				await getSellerProductsRefetch({ input: searchFilter });
			}
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};

	if (user?.type !== 'SELLER') {
		router.back();
	}

	if (device === 'mobile') {
		return <div>WCAR PRODUCTS MOBILE</div>;
	} else {
		return (
			<div id="my-property-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">{t('My')} {t('Products')}</Typography>
					</Stack>
				</Stack>
				<Stack className="property-list-box">
					<Stack className="tab-name-box">
						<Typography
							onClick={() => changeStatusHandler(ProductStatus.ACTIVE)}
							className={searchFilter.search.productStatus === 'ACTIVE' ? 'active-tab-name' : 'tab-name'}
						>
							{t('On Sale')}
						</Typography>
						<Typography
							onClick={() => changeStatusHandler(ProductStatus.SOLD)}
							className={searchFilter.search.productStatus === 'SOLD' ? 'active-tab-name' : 'tab-name'}
						>
							{t('On Sold')}
						</Typography>
					</Stack>
					<Stack className="list-box">
						<Stack className="listing-title-box">
							<Typography className="title-text">{t('Title')}</Typography>
							<Typography className="title-text">{t('Date')}</Typography>
							<Typography className="title-text">{t('Status')}</Typography>
							<Typography className="title-text">{t('Quantity')}</Typography>
							{searchFilter?.search?.productStatus === 'ACTIVE' && <Typography className="title-text">{t('Action')}</Typography>}
						</Stack>

						{products?.length === 0 ? (
							<div className={'no-data'}>
								<img src="/img/icons/icoAlert.svg" alt="" />
								<p>{t('No')} {t('Products')} {t('found!')}</p>
							</div>
						) : (
							products?.map((product: Product) => {
								return (
									<MyProductCard
										product={product}
										deleteProductHandler={deleteProductHandler}
										updateProductHandler={updateProductHandler}
									/>
								);
							})
						)}

						{products?.length !== 0 && (
							<Stack className="pagination-config">
								<Stack className="pagination-box">
									<Pagination
										count={Math.ceil(total / searchFilter.limit)}
										page={searchFilter.page}
										shape="rounded"
										color="secondary"
										onChange={paginationHandler}
									/>
								</Stack>
								<Stack className="total-result">
									<Typography>{total} product {t('available')}</Typography>
								</Stack>
							</Stack>
						)}
					</Stack>
				</Stack>
			</div>
		);
	}
};

MyProducts.defaultProps = {
	initialInput: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		search: {
			productStatus: 'ACTIVE',
		},
	},
};

export default MyProducts;
