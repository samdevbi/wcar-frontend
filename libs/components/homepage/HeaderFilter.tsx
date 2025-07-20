import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { CarsInquiry } from '../../types/car/car.input';
import { CarBrand, CarLocation, CarMadeIn } from '../../enums/car.enum';

const HeaderFilter = () => {
	const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common');
	const [searchFilter, setSearchFilter] = useState<CarsInquiry>({
		page: 1,
		limit: 10,
		search: {
		}
	},);
	const locationRef: any = useRef();
	const brandRef: any = useRef();
	const madeInRef: any = useRef();
	const router = useRouter();
	const [openLocation, setOpenLocation] = useState(false);
	const [openBrand, setOpenBrand] = useState(false);
	const [openMadeIn, setOpenMadeIn] = useState(false);
	const [carLocation, setCarLocation] = useState<CarLocation[]>(Object.values(CarLocation));
	const [carBrand, setCarBrand] = useState<CarBrand[]>(Object.values(CarBrand));
	const [carMadeIn, setCarMadeIn] = useState<CarMadeIn[]>(Object.values(CarMadeIn));

	/** LIFECYCLES **/
	useEffect(() => {
		const clickHandler = (event: MouseEvent) => {
			if (!locationRef?.current?.contains(event.target)) {
				setOpenLocation(false);
			}

			if (!madeInRef?.current?.contains(event.target)) {
				setOpenMadeIn(false);
			}

			if (!brandRef?.current?.contains(event.target)) {
				setOpenBrand(false);
			}
		};

		document.addEventListener('mousedown', clickHandler);

		return () => {
			document.removeEventListener('mousedown', clickHandler);
		};
	}, []);

	/** HANDLERS **/

	const locationStateChangeHandler = () => {
		setOpenLocation((prev) => !prev);
		setOpenBrand(false);
		setOpenMadeIn(false);
	};

	const brandStateChangeHandler = () => {
		setOpenBrand((prev) => !prev);
		setOpenMadeIn(false);
		setOpenLocation(false);
	};

	const madeInStateChangeHandler = () => {
		setOpenMadeIn((prev) => !prev);
		setOpenBrand(false);
		setOpenLocation(false);
	};

	const carLocationSelectHandler = useCallback(
		async (value: any) => {
			try {
				setSearchFilter({
					...searchFilter,
					search: {
						...searchFilter.search,
						locationList: [value],
					},
				});
				locationStateChangeHandler();
			} catch (err: any) {
				console.log('ERROR, propertyLocationSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const carBrandSelectHandler = useCallback(
		async (value: any) => {
			try {
				setSearchFilter({
					...searchFilter,
					search: {
						...searchFilter.search,
						brandList: [value],
					},
				});
				brandStateChangeHandler();
			} catch (err: any) {
				console.log('ERROR, propertyTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const carMadeInSelectHandler = useCallback(
		async (value: any) => {
			try {
				setSearchFilter({
					...searchFilter,
					search: {
						...searchFilter.search,
						madeInList: [value],
					},
				});
				madeInStateChangeHandler();
			} catch (err: any) {
				console.log('ERROR, propertyTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const pushSearchHandler = async () => {
		try {
			if (searchFilter?.search?.locationList?.length == 0) {
				delete searchFilter.search.locationList;
			}

			if (searchFilter?.search?.madeInList?.length == 0) {
				delete searchFilter.search.madeInList;
			}

			if (searchFilter?.search?.brandList?.length == 0) {
				delete searchFilter.search.brandList;
			}

			await router.push(
				`/cars?input=${JSON.stringify(searchFilter)}`,
				`/cars?input=${JSON.stringify(searchFilter)}`,
			);
		} catch (err: any) {
			console.log('ERROR, pushSearchHandler:', err);
		}
	};

	if (device === 'mobile') {
		return <div>HEADER FILTER MOBILE</div>;
	} else {
		return (
			<>
				<Stack className={'search-box'}>
					<Stack className={'select-box'}>
						<div className={`box ${openLocation ? 'on' : ''}`} onClick={locationStateChangeHandler}>
							<span>{searchFilter?.search?.locationList ? searchFilter?.search?.locationList[0] : t('Location')} </span>
							<ExpandMoreIcon />
						</div>
						<div className={`box ${openMadeIn ? 'on' : ''}`} onClick={madeInStateChangeHandler}>
							<span> {searchFilter?.search?.madeInList ? searchFilter?.search?.madeInList[0] : t('Made In')} </span>
							<ExpandMoreIcon />
						</div>
						<div className={`box ${openBrand ? 'on' : ''}`} onClick={brandStateChangeHandler}>
							<span>
								{searchFilter?.search?.brandList ? `${searchFilter?.search?.brandList[0]} ` : t('Brand')}
							</span>
							<ExpandMoreIcon />
						</div>
					</Stack>
					<Stack className={'search-box-other'}>
						<Typography>{t('Search...')}</Typography>
						<div className={'search-btn'} onClick={pushSearchHandler}>
							<img src="/img/icons/search_white.svg" alt="" />
						</div>
					</Stack>

					{/*MENU */}
					<div className={`filter-location ${openLocation ? 'on' : ''}`} ref={locationRef}>
						{carLocation.map((location: string) => {
							return (
								<div onClick={() => carLocationSelectHandler(location)} key={location}>
									<span>{location}</span>
								</div>
							);
						})}
					</div>

					<div className={`filter-location ${openBrand ? 'on' : ''}`} ref={brandRef}>
						{carBrand.map((brand: string) => {
							return (
								<div
									style={{ backgroundImage: `url(/img/banner/types/${brand.toLowerCase()}.webp)` }}
									onClick={() => carBrandSelectHandler(brand)}
									key={brand}
								>
									<span>{brand}</span>
								</div>
							);
						})}
					</div>

					<div className={`filter-location ${openMadeIn ? 'on' : ''}`} ref={madeInRef}>
						{carMadeIn.map((made: string) => {
							return (
								<div
									style={{ backgroundImage: `url(/img/banner/types/${made.toLowerCase()}.webp)` }}
									onClick={() => carMadeInSelectHandler(made)}
									key={made}
								>
									<span>{made}</span>
								</div>
							);
						})}
					</div>
				</Stack>
			</>
		);
	}
};

export default HeaderFilter;
