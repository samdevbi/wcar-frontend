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
} from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { propertySquare } from '../../config';
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

		if (searchFilter?.search?.groupList?.length == 0) {
			delete searchFilter.search.groupList;
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

		if (searchFilter?.search?.fuelTypeList?.length == 0) {
			delete searchFilter.search.fuelTypeList;
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

		if (searchFilter?.search?.colorList?.length == 0) {
			delete searchFilter.search.colorList;
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
	const carLocationSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.locationList?.includes(value)) {
					await router.push(
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('propertyLocationSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, propertyLocationSelectHandler:', err);
			}
		},
		[searchFilter],
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

	const carBodySelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, bodyList: [...(searchFilter?.search?.bodyList || []), value] },
						})}`,
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, bodyList: [...(searchFilter?.search?.bodyList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.bodyList?.includes(value)) {
					await router.push(
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								bodyList: searchFilter?.search?.bodyList?.filter((item: string) => item !== value),
							},
						})}`,
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								bodyList: searchFilter?.search?.bodyList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.bodyList?.length == 0) {
					alert('error');
				}

				console.log('propertyTypeSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, propertyTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const carGroupSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, groupList: [...(searchFilter?.search?.groupList || []), value] },
						})}`,
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, groupList: [...(searchFilter?.search?.groupList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.groupList?.includes(value)) {
					await router.push(
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								groupList: searchFilter?.search?.groupList?.filter((item: string) => item !== value),
							},
						})}`,
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								groupList: searchFilter?.search?.groupList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.groupList?.length == 0) {
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
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, madeInList: [...(searchFilter?.search?.madeInList || []), value] },
						})}`,
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, madeInList: [...(searchFilter?.search?.madeInList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.madeInList?.includes(value)) {
					await router.push(
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								madeInList: searchFilter?.search?.madeInList?.filter((item: string) => item !== value),
							},
						})}`,
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								madeInList: searchFilter?.search?.madeInList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.madeInList?.length == 0) {
					alert('error');
				}

				console.log('propertyTypeSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, propertyTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);


	const carBrandSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, brandList: [...(searchFilter?.search?.brandList || []), value] },
						})}`,
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, brandList: [...(searchFilter?.search?.brandList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.brandList?.includes(value)) {
					await router.push(
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								brandList: searchFilter?.search?.brandList?.filter((item: string) => item !== value),
							},
						})}`,
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								brandList: searchFilter?.search?.brandList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.brandList?.length == 0) {
					alert('error');
				}

				console.log('propertyTypeSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, propertyTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const carFuelSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, fuelTypeList: [...(searchFilter?.search?.fuelTypeList || []), value] },
						})}`,
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, fuelTypeList: [...(searchFilter?.search?.fuelTypeList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.fuelTypeList?.includes(value)) {
					await router.push(
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								fuelTypeList: searchFilter?.search?.fuelTypeList?.filter((item: string) => item !== value),
							},
						})}`,
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								fuelTypeList: searchFilter?.search?.fuelTypeList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.fuelTypeList?.length == 0) {
					alert('error');
				}

				console.log('propertyTypeSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, propertyTypeSelectHandler:', err);
			}
		},
		[searchFilter],
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

	const carColorSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, colorList: [...(searchFilter?.search?.colorList || []), value] },
						})}`,
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, colorList: [...(searchFilter?.search?.colorList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.colorList?.includes(value)) {
					await router.push(
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								colorList: searchFilter?.search?.colorList?.filter((item: string) => item !== value),
							},
						})}`,
						`/cars?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								colorList: searchFilter?.search?.colorList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.colorList?.length == 0) {
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
					<Stack className={`property-made`}>
						{carMadeIn.map((made: any) => {
							return (
								<Stack className={'input-box'} key={made}>
									<Checkbox
										id={made}
										className="property-checkbox"
										color="default"
										size="small"
										value={made}
										checked={(searchFilter?.search?.madeInList || []).includes(made as CarMadeIn)}
										onChange={carMadeInSelectHandler}
									/>
									<label htmlFor={made} style={{ cursor: 'pointer' }}>
										<Typography className="property-type">{made}</Typography>
									</label>
								</Stack>
							);
						})}
					</Stack>
				</Stack>
				<div className={'divider'}></div>
				<Stack className={'find-your-home'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						{t('Car Brand')}
					</p>
					<Stack className={`property-brand`}>
						{carBrand.map((brand: any) => {
							return (
								<Stack className={'input-box'} key={brand}>
									<Checkbox
										id={brand}
										className="property-checkbox"
										color="default"
										size="small"
										value={brand}
										checked={(searchFilter?.search?.brandList || []).includes(brand as CarBrand)}
										onChange={carBrandSelectHandler}
									/>
									<label htmlFor={brand} style={{ cursor: 'pointer' }}>
										<Typography className="property-type">{brand}</Typography>
									</label>
								</Stack>
							);
						})}
					</Stack>
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
					<Stack className={`property-body`}>
						{carBody.map((body: any) => {
							return (
								<Stack className={'input-box'} key={body}>
									<Checkbox
										id={body}
										className="property-checkbox"
										color="default"
										size="small"
										value={body}
										checked={(searchFilter?.search?.bodyList || []).includes(body as CarBody)}
										onChange={carBodySelectHandler}
									/>
									<label htmlFor={body} style={{ cursor: 'pointer' }}>
										<Typography className="property-type">{body}</Typography>
									</label>
								</Stack>
							);
						})}
					</Stack>
				</Stack>
				<div className={'divider'}></div>
				<Stack className={'find-your-home'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						{t('Car Group')}
					</p>
					<Stack className={`property-group`}>
						{carGroup.map((group: any) => {
							return (
								<Stack className={'input-box'} key={group}>
									<Checkbox
										id={group}
										className="property-checkbox"
										color="default"
										size="small"
										value={group}
										checked={(searchFilter?.search?.groupList || []).includes(group as CarGroup)}
										onChange={carGroupSelectHandler}
									/>
									<label htmlFor={group} style={{ cursor: 'pointer' }}>
										<Typography className="property-type">{group}</Typography>
									</label>
								</Stack>
							);
						})}
					</Stack>
				</Stack>
				<div className={'divider'}></div>
				<Stack className={'find-your-home'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						{t('Location')}
					</p>
					<Stack className={`property-location`}>
						{carLocation.map((location: any) => {
							return (
								<Stack className={'input-box'} key={location}>
									<Checkbox
										id={location}
										className="property-checkbox"
										color="default"
										size="small"
										value={location}
										checked={(searchFilter?.search?.locationList || []).includes(location as CarLocation)}
										onChange={carLocationSelectHandler}
									/>
									<label htmlFor={location} style={{ cursor: 'pointer' }}>
										<Typography className="property-type">{location}</Typography>
									</label>
								</Stack>
							);
						})}
					</Stack>
				</Stack>
				<div className={'divider'}></div>
				<Stack className={'find-your-home'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						{t('Car Fuel Type')}
					</p>
					<Stack className={`property-fuel`}>
						{carFuel.map((fuel: any) => {
							return (
								<Stack className={'input-box'} key={fuel}>
									<Checkbox
										id={fuel}
										className="property-checkbox"
										color="default"
										size="small"
										value={fuel}
										checked={(searchFilter?.search?.fuelTypeList || []).includes(fuel as CarFuelType)}
										onChange={carFuelSelectHandler}
									/>
									<label htmlFor={fuel} style={{ cursor: 'pointer' }}>
										<Typography className="property-type">{fuel}</Typography>
									</label>
								</Stack>
							);
						})}
					</Stack>
				</Stack>
				<div className={'divider'}></div>
				<Stack className={'find-your-home'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						{t('Car Color')}
					</p>
					<Stack className={`property-color`}>
						{carColor.map((color: any) => {
							return (
								<Stack className={'input-box'} key={color}>
									<Checkbox
										id={color}
										className="property-checkbox"
										color="default"
										size="small"
										value={color}
										checked={(searchFilter?.search?.colorList || []).includes(color as CarColor)}
										onChange={carColorSelectHandler}
									/>
									<label htmlFor={color} style={{ cursor: 'pointer' }}>
										<Typography className="property-type">{color}</Typography>
									</label>
								</Stack>
							);
						})}
					</Stack>
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
					<Typography className={'title'}>{t('Year Range')}</Typography>
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
					<Typography className={'title'}>{t('Mileage Range')}</Typography>
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
					<Typography className={'title'}>{t('Price Range')}</Typography>
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
