import React, { useCallback, useEffect, useState } from 'react';
import {
	Stack,
	Typography,
	Checkbox,
	OutlinedInput,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Tooltip,
	IconButton,
	Button,
	Modal,
	Box,
} from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import RefreshIcon from '@mui/icons-material/Refresh';
import { CarsInquiry } from '../../types/car/car.input';
import { CarBody, CarBrand, CarColor, CarDriveType, CarFuelType, CarGroup, CarLocation, CarMadeIn, CarTransmission, CarType } from '../../enums/car.enum';
import { useTranslation } from 'next-i18next';

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: '200px',
		},
	},
};

interface FilterType {
	searchFilter: CarsInquiry;
	setSearchFilter: any;
	initialInput: CarsInquiry;
}

const Filter = (props: FilterType) => {
	const { searchFilter, setSearchFilter, initialInput } = props;
	const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common');
	const router = useRouter();
	const [carLocation, setCarLocation] = useState<CarLocation[]>(Object.values(CarLocation));
	const [carType, setCarType] = useState<CarType[]>(Object.values(CarType));
	const [carBody, setCarBody] = useState<CarBody[]>(Object.values(CarBody));
	const [carGroup, setCarGroup] = useState<CarGroup[]>(Object.values(CarGroup));
	const [carMadeIn, setCarMadeIn] = useState<CarMadeIn[]>(Object.values(CarMadeIn));
	const [carBrand, setCarBrand] = useState<CarBrand[]>(Object.values(CarBrand));
	const [carFuel, setCarFuel] = useState<CarFuelType[]>(Object.values(CarFuelType));
	const [carDrive, setCarDrive] = useState<CarDriveType[]>(Object.values(CarDriveType));
	const [carTrans, setCarTrans] = useState<CarTransmission[]>(Object.values(CarTransmission));
	const [carColor, setCarColor] = useState<CarColor[]>(Object.values(CarColor));
	const [searchText, setSearchText] = useState<string>('');
	const [showMore, setShowMore] = useState<boolean>(false);
	const [selectedValue, setSelectedValue] = useState<string>('');

	/** LIFECYCLES **/
	useEffect(() => {
		if (searchFilter?.search?.locationList?.length == 0) {
			delete searchFilter.search.locationList;
			setShowMore(false);
			router.push(`/cars?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search,
				},
			})}`, `/cars?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search,
				},
			})}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.typeList?.length == 0) {
			delete searchFilter.search.typeList;
			router.push(`/cars?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search,
				},
			})}`, `/cars?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search,
				},
			})}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.bodyList?.length == 0) {
			delete searchFilter.search.bodyList;
			router.push(`/cars?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search,
				},
			})}`, `/cars?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search,
				},
			})}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.madeInList?.length == 0) {
			delete searchFilter.search.madeInList;
			router.push(`/cars?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search,
				},
			})}`, `/cars?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search,
				},
			})}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.brandList?.length == 0) {
			delete searchFilter.search.brandList;
			router.push(`/cars?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search,
				},
			})}`, `/cars?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search,
				},
			})}`, { scroll: false }).then();
		}


		if (searchFilter?.search?.driveTypeList?.length == 0) {
			delete searchFilter.search.driveTypeList;
			router.push(`/cars?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search,
				},
			})}`, `/cars?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search,
				},
			})}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.transmissionList?.length == 0) {
			delete searchFilter.search.transmissionList;
			router.push(`/cars?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search,
				},
			})}`, `/cars?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search,
				},
			})}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.options?.length == 0) {
			delete searchFilter.search.options;
			router.push(`/cars?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search,
				},
			})}`, `/cars?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search,
				},
			})}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.locationList) setShowMore(true);
	}, [searchFilter]);

	/** HANDLERS **/

	const carBrandSelectHandler = useCallback(
		async (e: any) => {
			const value = e.target.value;
			const brandList = value ? [value] : [];
			await router.push(
				`/cars?input=${JSON.stringify({
					...searchFilter,
					search: {
						...searchFilter.search,         // <<-- BU MUHIM!
						brandList,                      // Faqat brandList yangilanadi
					},
				})}`,
				undefined,
				{ scroll: false }
			);
		},
		[searchFilter, router]
	);

	const carLocationSelectHandler = useCallback(
		async (e: any) => {
			const value = e.target.value;
			const locationList = value ? [value] : [];
			await router.push(
				`/cars?input=${JSON.stringify({
					...searchFilter,
					search: {
						...searchFilter.search,         // <<-- BU MUHIM!
						locationList,                   // Faqat locationList yangilanadi
					},
				})}`,
				undefined,
				{ scroll: false }
			);
		},
		[searchFilter, router]
	);

	const carBodySelectHandler = useCallback(
		async (e: any) => {
			const value = e.target.value;
			const bodyList = value ? [value] : [];
			await router.push(
				`/cars?input=${JSON.stringify({
					...searchFilter,
					search: {
						...searchFilter.search,
						bodyList,
					},
				})}`,
				undefined,
				{ scroll: false }
			);
		},
		[searchFilter, router]
	);

	const carTypeSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.typeList?.includes(value)) {
					await router.push(
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('propertyTypeSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, propertyTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);


	const carMadeInSelectHandler = useCallback(
		async (e: any) => {
			try {
				const value = e.target.value;
				const madeInList = value ? [value] : [];

				await router.push(
					`/cars?input=${JSON.stringify({
						...searchFilter,
						search: { ...searchFilter.search, madeInList },
					})}`,
					undefined,
					{ scroll: false }
				);

			} catch (err) {
				console.log("ERROR, carMadeInSelectHandler:", err);
			}
		},
		[searchFilter, router]
	);


	const carDriveSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, driveTypeList: [...(searchFilter?.search?.driveTypeList || []), value] },
						})}`,
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, driveTypeList: [...(searchFilter?.search?.driveTypeList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.driveTypeList?.includes(value)) {
					await router.push(
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								driveTypeList: searchFilter?.search?.driveTypeList?.filter((item: string) => item !== value),
							},
						})}`,
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								driveTypeList: searchFilter?.search?.driveTypeList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.driveTypeList?.length == 0) {
					alert('error');
				}

				console.log('propertyTypeSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, propertyTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const carTransSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, transmissionList: [...(searchFilter?.search?.transmissionList || []), value] },
						})}`,
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, transmissionList: [...(searchFilter?.search?.transmissionList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.transmissionList?.includes(value)) {
					await router.push(
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								transmissionList: searchFilter?.search?.transmissionList?.filter((item: string) => item !== value),
							},
						})}`,
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								transmissionList: searchFilter?.search?.transmissionList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.transmissionList?.length == 0) {
					alert('error');
				}

				console.log('propertyTypeSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, propertyTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const carOptionSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, options: [...(searchFilter?.search?.options || []), value] },
						})}`,
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, options: [...(searchFilter?.search?.options || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.options?.includes(value)) {
					await router.push(
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								options: searchFilter?.search?.options?.filter((item: string) => item !== value),
							},
						})}`,
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								options: searchFilter?.search?.options?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				console.log('propertyOptionSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, propertyOptionSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const carPriceHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'min') {
				await router.push(
					`/cars?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							priceRange: { ...searchFilter.search.priceRange, min: value * 1 },
						},
					})}`,
					`/cars?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							priceRange: { ...searchFilter.search.priceRange, min: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/cars?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							priceRange: { ...searchFilter.search.priceRange, max: value * 1 },
						},
					})}`,
					`/cars?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							priceRange: { ...searchFilter.search.priceRange, max: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);
	const carYearHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'start') {
				await router.push(
					`/cars?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							yearRange: { ...searchFilter.search.yearRange, start: value * 1 },
						},
					})}`,
					`/cars?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							yearRange: { ...searchFilter.search.yearRange, start: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/cars?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							yearRange: { ...searchFilter.search.yearRange, end: value * 1 },
						},
					})}`,
					`/cars?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							yearRange: { ...searchFilter.search.yearRange, end: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);

	const carMileageHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'min') {
				await router.push(
					`/cars?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							mileageRange: { ...searchFilter.search.mileageRange, min: value * 1 },
						},
					})}`,
					`/cars?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							mileageRange: { ...searchFilter.search.mileageRange, min: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/cars?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							mileageRange: { ...searchFilter.search.mileageRange, max: value * 1 },
						},
					})}`,
					`/cars?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							mileageRange: { ...searchFilter.search.mileageRange, max: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);

	const refreshHandler = async () => {
		try {
			setSearchText('');
			await router.push(
				`/cars?input=${JSON.stringify(initialInput)}`,
				`/cars?input=${JSON.stringify(initialInput)}`,
				{ scroll: false },
			);
		} catch (err: any) {
			console.log('ERROR, refreshHandler:', err);
		}
	};

	if (device === 'mobile') {
		return <div>CARS FILTER</div>;
	} else {
		return (
			<Stack className={'filter-main'}>
				<Stack className={'find-your-home'} mb={'40px'}>
					<Stack className={'input-box'}>
						<OutlinedInput
							value={searchText}
							type={'text'}
							className={'search-input'}
							placeholder={'Typing ...'}
							onChange={(e: any) => setSearchText(e.target.value)}
							onKeyDown={(event: any) => {
								if (event.key == 'Enter') {
									setSearchFilter({
										...searchFilter,
										search: { ...searchFilter.search, text: searchText },
									});
								}
							}}
							endAdornment={
								<>
									<CancelRoundedIcon
										onClick={() => {
											setSearchText('');
											setSearchFilter({
												...searchFilter,
												search: { ...searchFilter.search, text: '' },
											});
										}}
									/>
								</>
							}
						/>
						<img src={'/img/icons/search_icon.png'} alt={''} />
						<Tooltip title="Reset">
							<IconButton onClick={refreshHandler}>
								<RefreshIcon />
							</IconButton>
						</Tooltip>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>{t('Car Condition')}</Typography>
					{carType.map((type: string) => (
						<Stack className={'input-box'} key={type}>
							<Checkbox
								id={type}
								className="property-checkbox"
								color="default"
								size="small"
								value={type}
								onChange={carTypeSelectHandler}
								checked={(searchFilter?.search?.typeList || []).includes(type as CarType)}
							/>
							<label style={{ cursor: 'pointer' }}>
								<Typography className="property_type">{type}</Typography>
							</label>
						</Stack>
					))}
				</Stack>
				<div className={'divider'}></div>
				<Stack className={'find-your-home'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						{t('Car Made In')}
					</p>
					<FormControl fullWidth variant="outlined" sx={{ minWidth: 220 }}>
						<Select
							value={searchFilter?.search?.madeInList?.[0] || ""}
							onChange={(e) => {
								carMadeInSelectHandler(e);
							}}
							sx={{
								borderRadius: '2rem',
								bgcolor: '#FDFFF5',
								fontWeight: 400,
								fontSize: 16,
							}}
							displayEmpty
						>
							<MenuItem value="">
								<em>{t('All Country')}</em>
							</MenuItem>
							{carMadeIn.map((made) => (
								<MenuItem key={made} value={made}>
									<Typography className="property-type" sx={{ ml: 1 }}>
										{made}
									</Typography>
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Stack>
				<div className={'divider'}></div>
				<Stack className={'find-your-home'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						{t('Car Brand')}
					</p>
					<FormControl fullWidth variant="outlined" sx={{ minWidth: 220 }}>
						<Select
							labelId="brand-select-label"
							value={searchFilter?.search?.brandList?.[0] || ""}
							onChange={(e) => {
								carBrandSelectHandler(e);
							}}
							sx={{
								borderRadius: '2rem',
								bgcolor: '#FDFFF5',
								fontWeight: 400,
								fontSize: 16,
							}}
							displayEmpty
						>
							<MenuItem value="">
								<em>{t('All Brand')}</em>
							</MenuItem>
							{carBrand.map((brand) => (
								<MenuItem key={brand} value={brand}>
									<Typography className="property-type" sx={{ ml: 1 }}>
										{brand}
									</Typography>
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Stack>

				<div className={'divider'}></div>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>{t('Drive Type')}</Typography>
					{carDrive.map((drive: string) => (
						<Stack className={'input-box'} key={drive}>
							<Checkbox
								id={drive}
								className="property-checkbox"
								color="default"
								size="small"
								value={drive}
								onChange={carDriveSelectHandler}
								checked={(searchFilter?.search?.driveTypeList || []).includes(drive as CarDriveType)}
							/>
							<label style={{ cursor: 'pointer' }}>
								<Typography className="property_type">{drive}</Typography>
							</label>
						</Stack>
					))}
				</Stack>
				<div className={'divider'}></div>
				<Stack className={'find-your-home'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						{t('Car Body')}
					</p>
					<FormControl fullWidth variant="outlined" sx={{ minWidth: 220 }}>
						<Select
							labelId="body-select-label"
							value={searchFilter?.search?.bodyList?.[0] || ""}
							onChange={(e) => {
								carBodySelectHandler(e);
							}}
							sx={{
								borderRadius: '2rem',
								bgcolor: '#FDFFF5',
								fontWeight: 400,
								fontSize: 16,
							}}
							displayEmpty
						>
							<MenuItem value="">
								<em>{t('All Body')}</em>
							</MenuItem>
							{carBody.map((body) => (
								<MenuItem key={body} value={body}>
									<Typography className="property-type" sx={{ ml: 1 }}>
										{body}
									</Typography>
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Stack>
				<div className={'divider'}></div>
				<Stack className={'find-your-home'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						{t('Location')}
					</p>
					<FormControl fullWidth variant="outlined" sx={{ minWidth: 220 }}>
						<Select
							labelId="location-select-label"
							value={searchFilter?.search?.locationList?.[0] || ""}
							onChange={(e) => {
								carLocationSelectHandler(e);
							}}
							sx={{
								borderRadius: '2rem',
								bgcolor: '#FDFFF5',
								fontWeight: 400,
								fontSize: 16,
							}}
							displayEmpty
						>
							<MenuItem value="">
								<em>{t('All Location')}</em>
							</MenuItem>
							{carLocation.map((location) => (
								<MenuItem key={location} value={location}>
									<Typography className="property-type" sx={{ ml: 1 }}>
										{location}
									</Typography>
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Stack>
				<div className={'divider'}></div>
				<Stack>
					<Stack className={'find-your-home'} mb={'30px'}>
						<Typography className={'title'}>{t('Transmission')}</Typography>
						{carTrans.map((trans: string) => (
							<Stack className={'input-box'} key={trans}>
								<Checkbox
									id={trans}
									className="property-checkbox"
									color="default"
									size="small"
									value={trans}
									onChange={carTransSelectHandler}
									checked={(searchFilter?.search?.transmissionList || []).includes(trans as CarTransmission)}
								/>
								<label style={{ cursor: 'pointer' }}>
									<Typography className="property_type">{trans}</Typography>
								</label>
							</Stack>
						))}
					</Stack>
					<div className={'divider'}></div>
					<Stack className={'find-your-home'} mb={'30px'}>
						<Typography className={'title'}>{t('Options')}</Typography>
						<Stack className={'input-box'}>
							<Checkbox
								id={'Barter'}
								className="property-checkbox"
								color="default"
								size="small"
								value={'carBarter'}
								checked={(searchFilter?.search?.options || []).includes('carBarter')}
								onChange={carOptionSelectHandler}
							/>
							<label htmlFor={'Barter'} style={{ cursor: 'pointer' }}>
								<Typography className="propert-type">{t('Barter')}</Typography>
							</label>
						</Stack>
						<Stack className={'input-box'}>
							<Checkbox
								id={'Rent'}
								className="property-checkbox"
								color="default"
								size="small"
								value={'carRent'}
								checked={(searchFilter?.search?.options || []).includes('carRent')}
								onChange={carOptionSelectHandler}
							/>
							<label htmlFor={'Rent'} style={{ cursor: 'pointer' }}>
								<Typography className="propert-type">{t('Rent')}</Typography>
							</label>
						</Stack>
					</Stack>
				</Stack>
				<div className={'divider'}></div>
				<Stack className={'find-your-home'}>
					<Typography className={'title'}>{t('Year')}</Typography>
					<Stack className="square-year-input">
						<input
							type="number"
							placeholder="$ min"
							value={searchFilter?.search?.yearRange?.start ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									carYearHandler(e.target.value, 'start');
								}
							}}
						/>
						<div className="central-divider"></div>
						<input
							type="number"
							placeholder="$ max"
							value={searchFilter?.search?.yearRange?.end ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									carYearHandler(e.target.value, 'end');
								}
							}}
						/>
					</Stack>
				</Stack>
				<div className={'divider'}></div>
				<Stack className={'find-your-home'}>
					<Typography className={'title'}>{t('Mileage')}</Typography>
					<Stack className="square-year-input">
						<input
							type="number"
							placeholder="$ min"
							value={searchFilter?.search?.mileageRange?.min ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									carMileageHandler(e.target.value, 'min');
								}
							}}
						/>
						<div className="central-divider"></div>
						<input
							type="number"
							placeholder="$ max"
							value={searchFilter?.search?.mileageRange?.max ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									carMileageHandler(e.target.value, 'max');
								}
							}}
						/>
					</Stack>
				</Stack>
				<div className={'divider'}></div>
				<Stack className={'find-your-home'}>
					<Typography className={'title'}>{t('Price')}</Typography>
					<Stack className="square-year-input">
						<input
							type="number"
							placeholder="$ min"
							value={searchFilter?.search?.priceRange?.min ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									carPriceHandler(e.target.value, 'min');
								}
							}}
						/>
						<div className="central-divider"></div>
						<input
							type="number"
							placeholder="$ max"
							value={searchFilter?.search?.priceRange?.max ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									carPriceHandler(e.target.value, 'max');
								}
							}}
						/>
					</Stack>
				</Stack>
			</Stack >
		);
	}
};

export default Filter;
