import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { CarInput } from '../../types/car/car.input';
import { CarBody, CarBrand, CarColor, CarDriveType, CarFuelType, CarGroup, CarLocation, CarMadeIn, CarTransmission, CarType } from '../../enums/car.enum';
import { getJwtToken } from '../../auth';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { CREATE_CAR, UPDATE_CAR } from '../../../apollo/user/mutation';
import { GET_CAR } from '../../../apollo/user/query';
import { sweetErrorHandling, sweetMixinErrorAlert, sweetMixinSuccessAlert } from '../../sweetAlert';
import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';
import { useTranslation } from 'next-i18next';

const AddCar = ({ initialValues, ...props }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const { t, i18n } = useTranslation('common');
	const inputRef = useRef<any>(null);
	const [insertCarData, setInsertCarData] = useState<CarInput>(initialValues);
	const [carType, setCarType] = useState<CarType[]>(Object.values(CarType));
	const [carColor, setCarColor] = useState<CarColor[]>(Object.values(CarColor));
	const [carFuelType, setCarFuelType] = useState<CarFuelType[]>(Object.values(CarFuelType));
	const [carTransmission, setCarTransmission] = useState<CarTransmission[]>(Object.values(CarTransmission));
	const [carDriveType, setCarDriveType] = useState<CarDriveType[]>(Object.values(CarDriveType));
	const [carBody, setCarBody] = useState<CarBody[]>(Object.values(CarBody));
	const [carMadeIn, setCarMadeIn] = useState<CarMadeIn[]>(Object.values(CarMadeIn));
	const [carGroup, setCarGroup] = useState<CarGroup[]>(Object.values(CarGroup));
	const [carBrand, setCarBrand] = useState<CarBrand[]>(Object.values(CarBrand));
	const [carLocation, setCarLocation] = useState<CarLocation[]>(Object.values(CarLocation));
	const token = getJwtToken();
	const user = useReactiveVar(userVar);

	/** APOLLO REQUESTS **/
	const [createCar] = useMutation(CREATE_CAR);
	const [updateCar] = useMutation(UPDATE_CAR);

	const {
		loading: getCarLoading,
		data: getCarData,
		error: getCarError,
		refetch: getCarRefetch,
	} = useQuery(GET_CAR, {
		fetchPolicy: 'network-only',
		variables: {
			input: router.query.carId,
		},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		setInsertCarData({
			...insertCarData,
			carType: getCarData?.getCar ? getCarData?.getCar?.carType : "",
			carTitle: getCarData?.getCar ? getCarData?.getCar?.carTitle : "",
			carBody: getCarData?.getCar ? getCarData?.getCar?.carBody : "",
			carGroup: getCarData?.getCar ? getCarData?.getCar?.carGroup : "",
			carMadeIn: getCarData?.getCar ? getCarData?.getCar?.carMadeIn : "",
			carBrand: getCarData?.getCar ? getCarData?.getCar?.carBrand : "",
			carModel: getCarData?.getCar ? getCarData?.getCar?.carModel : "",
			carPrice: getCarData?.getCar ? getCarData?.getCar?.carPrice : 0,
			carImages: getCarData?.getCar ? getCarData?.getCar?.carImages : [],
			carVideo: getCarData?.getCar ? getCarData?.getCar?.carVideo : "",
			carLocation: getCarData?.getCar ? getCarData?.getCar?.carLocation : "",
			carAddress: getCarData?.getCar ? getCarData?.getCar?.carAddress : "",
			carDesc: getCarData?.getCar ? getCarData?.getCar?.carDesc : "",
			carBarter: getCarData?.getCar ? getCarData?.getCar?.carBarter : false,
			carRent: getCarData?.getCar ? getCarData?.getCar?.carRent : false,
			carYear: getCarData?.getCar ? getCarData?.getCar?.carYear : 0,
			carMileage: getCarData?.getCar ? getCarData?.getCar?.carMileage : 0,
			carFuelType: getCarData?.getCar ? getCarData?.getCar?.carFuelType : "",
			carDriveType: getCarData?.getCar ? getCarData?.getCar?.carDriveType : "",
			carTransmission: getCarData?.getCar ? getCarData?.getCar?.carTransmission : "",
			carEngineSize: getCarData?.getCar ? getCarData?.getCar?.carEngineSize : "",
			carColor: getCarData?.getCar ? getCarData?.getCar?.carColor : "",
			carFullFuel: getCarData?.getCar ? getCarData?.getCar?.carFullFuel : "",
			carMpgHw: getCarData?.getCar ? getCarData?.getCar?.carMpgHw : 0,
			carMpgCity: getCarData?.getCar ? getCarData?.getCar?.carMpgCity : 0,
			carDoor: getCarData?.getCar ? getCarData?.getCar?.carDoor : "",
			carCylinders: getCarData?.getCar ? getCarData?.getCar?.carCylinders : "",
			carMaxSpeed: getCarData?.getCar ? getCarData?.getCar?.carMaxSpeed : "",
			carHundredSpeed: getCarData?.getCar ? getCarData?.getCar?.carHundredSpeed : "",
			carHorsePower: getCarData?.getCar ? getCarData?.getCar?.carHorsePower : "",
			carTorque: getCarData?.getCar ? getCarData?.getCar?.carTorque : "",
			carLength: getCarData?.getCar ? getCarData?.getCar?.carLength : "",
			carHeigth: getCarData?.getCar ? getCarData?.getCar?.carHeigth : "",
			carWidth: getCarData?.getCar ? getCarData?.getCar?.carWidth : "",
			carSeatsUp: getCarData?.getCar ? getCarData?.getCar?.carSeatsUp : "",
			carWeigth: getCarData?.getCar ? getCarData?.getCar?.carWeigth : "",
			carLoadWeight: getCarData?.getCar ? getCarData?.getCar?.carLoadWeight : "",
			carTireSize: getCarData?.getCar ? getCarData?.getCar?.carTireSize : "",
			carWheelBase: getCarData?.getCar ? getCarData?.getCar?.carWheelBase : "",
			carAutoBrake: getCarData?.getCar ? getCarData?.getCar?.carAutoBrake : false,
			carCruiseControl: getCarData?.getCar ? getCarData?.getCar?.carCruiseControl : false,
			carESC: getCarData?.getCar ? getCarData?.getCar?.carESC : false,
			carAutonomuosDrive: getCarData?.getCar ? getCarData?.getCar?.carAutonomuosDrive : false,
			carExteriorLight: getCarData?.getCar ? getCarData?.getCar?.carExteriorLight : false,
			carPanoramicSunroof: getCarData?.getCar ? getCarData?.getCar?.carPanoramicSunroof : false,
			carHeatedSeats: getCarData?.getCar ? getCarData?.getCar?.carHeatedSeats : false,
			carCooledSeats: getCarData?.getCar ? getCarData?.getCar?.carCooledSeats : false,
			carTouchscreenDisplay: getCarData?.getCar ? getCarData?.getCar?.carTouchscreenDisplay : false,
			carAutoHeadLight: getCarData?.getCar ? getCarData?.getCar?.carAutoHeadLight : false,
			carStarStop: getCarData?.getCar ? getCarData?.getCar?.carStarStop : false,
			carNoiseCancellation: getCarData?.getCar ? getCarData?.getCar?.carNoiseCancellation : false,
			carRemoteKeyless: getCarData?.getCar ? getCarData?.getCar?.carRemoteKeyless : false,
			carLaneDW: getCarData?.getCar ? getCarData?.getCar?.carLaneDW : false,
			carBlindSpotMonitoring: getCarData?.getCar ? getCarData?.getCar?.carBlindSpotMonitoring : false,
			carRearCrossTrafficAlert: getCarData?.getCar ? getCarData?.getCar?.carRearCrossTrafficAlert : false,
			carApplePlay: getCarData?.getCar ? getCarData?.getCar?.carApplePlay : false,
			carAndroidAuto: getCarData?.getCar ? getCarData?.getCar?.carAndroidAuto : false,
			carVoiceControl: getCarData?.getCar ? getCarData?.getCar?.carVoiceControl : false,
			carBluetoothConnectivity: getCarData?.getCar ? getCarData?.getCar?.carBluetoothConnectivity : false,
			carWirelessCharging: getCarData?.getCar ? getCarData?.getCar?.carWirelessCharging : false,
			carParkingAssist: getCarData?.getCar ? getCarData?.getCar?.carParkingAssist : false,
			carSurroundViewCamera: getCarData?.getCar ? getCarData?.getCar?.carSurroundViewCamera : false,
			carFrontSensors: getCarData?.getCar ? getCarData?.getCar?.carFrontSensors : false,
			carRearSensors: getCarData?.getCar ? getCarData?.getCar?.carRearSensors : false,
			carFrontRecordCamera: getCarData?.getCar ? getCarData?.getCar?.carFrontRecordCamera : false,
			carRearRecordCamera: getCarData?.getCar ? getCarData?.getCar?.carRearRecordCamera : false,
			carHeadsUpDisplay: getCarData?.getCar ? getCarData?.getCar?.carHeadsUpDisplay : false,
			carClimateControl: getCarData?.getCar ? getCarData?.getCar?.carClimateControl : false,
			carAdjustableSeats: getCarData?.getCar ? getCarData?.getCar?.carAdjustableSeats : false,
			carMemorySeats: getCarData?.getCar ? getCarData?.getCar?.carMemorySeats : false,
			carPowerTrain: getCarData?.getCar ? getCarData?.getCar?.carPowerTrain : false,
			carRegenerativeBraking: getCarData?.getCar ? getCarData?.getCar?.carRegenerativeBraking : false,
			carTractionControl: getCarData?.getCar ? getCarData?.getCar?.carTractionControl : false,
			carStabilityControl: getCarData?.getCar ? getCarData?.getCar?.carStabilityControl : false,
			carHillStartAssist: getCarData?.getCar ? getCarData?.getCar?.carHillStartAssist : false,
			carTirePressureSystem: getCarData?.getCar ? getCarData?.getCar?.carTirePressureSystem : false,
			carPushButton: getCarData?.getCar ? getCarData?.getCar?.carPushButton : false,
			carCrush: getCarData?.getCar ? getCarData?.getCar?.carCrush : 0,
			carRepair: getCarData?.getCar ? getCarData?.getCar?.carRepair : 0,
			carFrontBumper: getCarData?.getCar ? getCarData?.getCar?.carFrontBumper : false,
			carBackBumper: getCarData?.getCar ? getCarData?.getCar?.carBackBumper : false,
			carBonnet: getCarData?.getCar ? getCarData?.getCar?.carBonnet : false,
			carTailgate: getCarData?.getCar ? getCarData?.getCar?.carTailgate : false,
			carRightFrontWing: getCarData?.getCar ? getCarData?.getCar?.carRightFrontWing : false,
			carLeftFrontWing: getCarData?.getCar ? getCarData?.getCar?.carLeftFrontWing : false,
			carRightBackWing: getCarData?.getCar ? getCarData?.getCar?.carRightBackWing : false,
			carLeftBackWing: getCarData?.getCar ? getCarData?.getCar?.carLeftBackWing : false,
			carRoof: getCarData?.getCar ? getCarData?.getCar?.carRoof : false,
			carRightFrontDoor: getCarData?.getCar ? getCarData?.getCar?.carRightFrontDoor : false,
			carLeftFrontDoor: getCarData?.getCar ? getCarData?.getCar?.carLeftFrontDoor : false,
			carRightBackDoor: getCarData?.getCar ? getCarData?.getCar?.carRightBackDoor : false,
			carLeftBackDoor: getCarData?.getCar ? getCarData?.getCar?.carLeftBackDoor : false,
		});
	}, [getCarLoading, getCarData]);

	/** HANDLERS **/
	async function uploadImages() {
		try {
			const formData = new FormData();
			const selectedFiles = inputRef.current.files;

			if (selectedFiles.length == 0) return false;
			if (selectedFiles.length > 5) throw new Error('Cannot upload more than 5 images!');

			formData.append(
				'operations',
				JSON.stringify({
					query: `mutation ImagesUploader($files: [Upload!]!, $target: String!) { 
						imagesUploader(files: $files, target: $target)
				  }`,
					variables: {
						files: [null, null, null, null, null],
						target: 'car',
					},
				}),
			);
			formData.append(
				'map',
				JSON.stringify({
					'0': ['variables.files.0'],
					'1': ['variables.files.1'],
					'2': ['variables.files.2'],
					'3': ['variables.files.3'],
					'4': ['variables.files.4'],
				}),
			);
			for (const key in selectedFiles) {
				if (/^\d+$/.test(key)) formData.append(`${key}`, selectedFiles[key]);
			}

			const response = await axios.post(`${process.env.REACT_APP_API_GRAPHQL_URL}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'apollo-require-preflight': true,
					Authorization: `Bearer ${token}`,
				},
			});

			const responseImages = response.data.data.imagesUploader;

			console.log('+responseImages: ', responseImages);
			setInsertCarData({ ...insertCarData, carImages: responseImages });
		} catch (err: any) {
			console.log('err: ', err.message);
			await sweetMixinErrorAlert(err.message);
		}
	}

	const doDisabledCheck = () => {
		if (
			insertCarData.carTitle === '' || // @ts-ignore
			insertCarData.carType === '' || // @ts-ignore
			insertCarData.carModel === '' || // @ts-ignore
			insertCarData.carBody === '' || // @ts-ignore
			insertCarData.carGroup === '' || // @ts-ignore
			insertCarData.carMadeIn === '' ||
			insertCarData.carPrice === 0 ||
			insertCarData.carMileage === 0 ||
			insertCarData.carYear === 0 ||
			insertCarData.carImages.length === 0 || // @ts-ignore
			insertCarData.carLocation === '' ||
			insertCarData.carAddress === '' || // @ts-ignore
			insertCarData.carFuelType === '' || // @ts-ignore
			insertCarData.carDriveType === '' || // @ts-ignore
			insertCarData.carTransmission === '' || // @ts-ignore
			insertCarData.carColor === '' ||
			insertCarData.carFullFuel === '' ||
			insertCarData.carMpgCity === 0 ||
			insertCarData.carMpgHw === 0 ||
			insertCarData.carEngineSize === ''
		) {
			return true;
		}
	};

	const insertCarHandler = useCallback(async () => {
		try {
			const result = await createCar({
				variables: {
					input: insertCarData,
				},
			});

			await sweetMixinSuccessAlert('This car has been created sucessfully');
			await router.push({
				pathname: '/mypage',
				query: {
					category: 'myCars',
				},
			});
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	}, [insertCarData]);

	const updateCarHandler = useCallback(async () => {
		try {
			// @ts-ignore
			insertCarData._id = getCarData?.getCar?._id;
			const result = await updateCar({
				variables: {
					input: insertCarData,
				},
			});

			await sweetMixinSuccessAlert('This car has been updated sucessfully');
			await router.push({
				pathname: '/mypage',
				query: {
					category: 'myCars',
				},
			});
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	}, [insertCarData]);

	if (user?.type !== 'AGENT' && user?.type !== 'DEALER') {
		router.back();
	}


	if (device === 'mobile') {
		return <div>ADD NEW CAR MOBILE PAGE</div>;
	} else {
		return (
			<div id="add-property-page">
				<Stack className="main-title-box">
					<Typography className="main-title">{t('Add')} {t('New')} {t('Cars')}</Typography>
				</Stack>

				<div>
					<Stack className="config">
						<Stack className="description-box">
							<Stack className="config-column">
								<Typography className="title">{t('Title')}</Typography>
								<input
									type="text"
									className="description-input"
									placeholder={'Car Title'}
									value={insertCarData.carTitle}
									onChange={({ target: { value } }) =>
										setInsertCarData({ ...insertCarData, carTitle: value })
									}
								/>
							</Stack>
							<Stack className="config-column">
								<Typography className="title">{t('Model')}</Typography>
								<input
									type="text"
									className="description-input"
									placeholder={'Model'}
									value={insertCarData.carModel}
									onChange={({ target: { value } }) =>
										setInsertCarData({ ...insertCarData, carModel: value })
									}
								/>
							</Stack>

							<Stack className="config-row">
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Year')}</Typography>
									<input
										type="number"
										className="description-input"
										placeholder={'Year'}
										value={insertCarData.carYear}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carYear: parseInt(value) })
										}
									/>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Mileage')}</Typography>
									<input
										type="number"
										className="description-input"
										placeholder={'Mileage'}
										value={insertCarData.carMileage}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carMileage: parseInt(value) })
										}
									/>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Price')}</Typography>
									<input
										type="number"
										className="description-input"
										placeholder={'Price'}
										value={insertCarData.carPrice}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carPrice: parseInt(value) })
										}
									/>
								</Stack>
							</Stack>
							<Stack className="config-row">
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Condition')}</Typography>
									<select
										className={'select-description'}
										defaultValue={insertCarData?.carType || 'select'}
										value={insertCarData.carType || 'select'}
										onChange={({ target: { value } }) =>
											// @ts-ignore
											setInsertCarData({ ...insertCarData, carType: value })
										}
									>
										<>
											<option selected={true} disabled={true} value={'select'}>
												{t('Select')}
											</option>
											{carType.length > 0 &&
												carType.map((type: any) => (
													<option value={`${type}`} key={type}>
														{type}
													</option>
												))}
										</>
									</select>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Made In')}</Typography>
									<select
										className={'select-description'}
										defaultValue={insertCarData.carMadeIn || 'select'}
										value={insertCarData?.carMadeIn || 'select'}
										onChange={({ target: { value } }) =>
											// @ts-ignore
											setInsertCarData({ ...insertCarData, carMadeIn: value })
										}
									>
										<>
											<option selected={true} disabled={true} value={'select'}>
												{t('Select')}
											</option>
											{carMadeIn.length > 0 &&
												carMadeIn.map((madeIn: any) => (
													<option value={`${madeIn}`} key={madeIn}>
														{madeIn}
													</option>
												))}
										</>
									</select>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Brand')}</Typography>
									<select
										className={'select-description'}
										defaultValue={insertCarData.carBrand || 'select'}
										value={insertCarData.carBrand || 'select'}
										onChange={({ target: { value } }) =>
											// @ts-ignore
											setInsertCarData({ ...insertCarData, carBrand: value })
										}
									>
										<>
											<option selected={true} disabled={true} value={'select'}>
												{t('Select')}
											</option>
											{carBrand.length > 0 &&
												carBrand.map((location: any) => (
													<option value={`${location}`} key={location}>
														{location}
													</option>
												))}
										</>
									</select>
								</Stack>
							</Stack>

							<Stack className="config-row">
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Group')}</Typography>
									<select
										className={'select-description'}
										defaultValue={insertCarData.carGroup || 'select'}
										value={insertCarData.carGroup || 'select'}
										onChange={({ target: { value } }) =>
											// @ts-ignore
											setInsertCarData({ ...insertCarData, carGroup: value })
										}
									>
										<>
											<option selected={true} disabled={true} value={'select'}>
												{t('Select')}
											</option>
											{carGroup.length > 0 &&
												carGroup.map((group: any) => (
													<option value={`${group}`} key={group}>
														{group}
													</option>
												))}
										</>
									</select>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Body')}</Typography>
									<select
										className={'select-description'}
										defaultValue={insertCarData.carBody || 'select'}
										value={insertCarData.carBody || 'select'}
										onChange={({ target: { value } }) =>
											// @ts-ignore
											setInsertCarData({ ...insertCarData, carBody: value })
										}
									>
										<>
											<option selected={true} disabled={true} value={'select'}>
												{t('Select')}
											</option>
											{carBody.length > 0 &&
												carBody.map((body: any) => (
													<option value={`${body}`} key={body}>
														{body}
													</option>
												))}
										</>
									</select>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Fuel')}</Typography>
									<select
										className={'select-description'}
										defaultValue={insertCarData.carFuelType || 'select'}
										value={insertCarData.carFuelType || 'select'}
										onChange={({ target: { value } }) =>
											// @ts-ignore
											setInsertCarData({ ...insertCarData, carFuelType: value })
										}
									>
										<>
											<option selected={true} disabled={true} value={'select'}>
												{t('Select')}
											</option>
											{carFuelType.length > 0 &&
												carFuelType.map((fuel: any) => (
													<option value={`${fuel}`} key={fuel}>
														{fuel}
													</option>
												))}
										</>
									</select>
								</Stack>
							</Stack>

							<Stack className="config-row">
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Color')}</Typography>
									<select
										className={'select-description'}
										defaultValue={insertCarData.carColor || 'select'}
										value={insertCarData.carColor || 'select'}
										onChange={({ target: { value } }) =>
											// @ts-ignore
											setInsertCarData({ ...insertCarData, carColor: value })
										}
									>
										<>
											<option selected={true} disabled={true} value={'select'}>
												{t('Select')}
											</option>
											{carColor.length > 0 &&
												carColor.map((color: any) => (
													<option value={`${color}`} key={color}>
														{color}
													</option>
												))}
										</>
									</select>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Drive Type')}</Typography>
									<select
										className={'select-description'}
										defaultValue={insertCarData.carDriveType || 'select'}
										value={insertCarData.carDriveType || 'select'}
										onChange={({ target: { value } }) =>
											// @ts-ignore
											setInsertCarData({ ...insertCarData, carDriveType: value })
										}
									>
										<>
											<option selected={true} disabled={true} value={'select'}>
												{t('Select')}
											</option>
											{carDriveType.length > 0 &&
												carDriveType.map((drive: any) => (
													<option value={`${drive}`} key={drive}>
														{drive}
													</option>
												))}
										</>
									</select>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Transmission')}</Typography>
									<select
										className={'select-description'}
										defaultValue={insertCarData.carTransmission || 'select'}
										value={insertCarData.carTransmission || 'select'}
										onChange={({ target: { value } }) =>
											// @ts-ignore
											setInsertCarData({ ...insertCarData, carTransmission: value })
										}
									>
										<>
											<option selected={true} disabled={true} value={'select'}>
												{t('Select')}
											</option>
											{carTransmission.length > 0 &&
												carTransmission.map((transmission: any) => (
													<option value={`${transmission}`} key={transmission}>
														{transmission}
													</option>
												))}
										</>
									</select>
								</Stack>
							</Stack>

							<Stack className="config-row">
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Barter')}</Typography>
									<select
										className={'select-description'}
										value={insertCarData.carBarter ? 'yes' : 'no'}
										defaultValue={insertCarData.carBarter ? 'yes' : 'no'}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carBarter: value === 'yes' })
										}
									>
										<option disabled={true} selected={true}>
											{t('Select')}
										</option>
										<option value={'yes'}>{t('Yes')}</option>
										<option value={'no'}>{t('No')}</option>
									</select>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Rent')}</Typography>
									<select
										className={'select-description'}
										value={insertCarData.carRent ? 'yes' : 'no'}
										defaultValue={insertCarData.carRent ? 'yes' : 'no'}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carRent: value === 'yes' })
										}
									>
										<option disabled={true} selected={true}>
											{t('Select')}
										</option>
										<option value={'yes'}>{t('Yes')}</option>
										<option value={'no'}>{t('No')}</option>
									</select>
								</Stack>
							</Stack>
							<Stack className="config-row">
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Location')}</Typography>
									<select
										className={'select-description'}
										defaultValue={insertCarData.carLocation || 'select'}
										value={insertCarData.carLocation || 'select'}
										onChange={({ target: { value } }) =>
											// @ts-ignore
											setInsertCarData({ ...insertCarData, carLocation: value })
										}
									>
										<>
											<option selected={true} disabled={true} value={'select'}>
												{t('Select')}
											</option>
											{carLocation.length > 0 &&
												carLocation.map((location: any) => (
													<option value={`${location}`} key={location}>
														{location}
													</option>
												))}
										</>
									</select>
								</Stack>

								<Stack className="price-year-after-price">
									<Typography className="title">{t('Address')}</Typography>
									<input
										type="text"
										className="description-input"
										placeholder={'Address'}
										value={insertCarData.carAddress}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carAddress: value })
										}
									/>
								</Stack>
							</Stack>
							<Stack className="config-column">
								<Typography className="title">{t('Description')}</Typography>
								<textarea
									name=""
									id=""
									className="description-text"
									value={insertCarData.carDesc}
									onChange={({ target: { value } }) =>
										setInsertCarData({ ...insertCarData, carDesc: value })
									}
								></textarea>
							</Stack>

							<Stack className="config-row">
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Engine Size')}</Typography>
									<input
										type="text"
										className="description-input"
										placeholder={'Engine Size'}
										value={insertCarData.carEngineSize}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carEngineSize: value })
										}
									/>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Full Feul')}</Typography>
									<input
										type="text"
										className="description-input"
										placeholder={'Full Fuel'}
										value={insertCarData.carFullFuel}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carFullFuel: value })

										}
									/>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('MpgCity')}</Typography>
									<input
										type="number"
										className="description-input"
										placeholder={'Mpg City'}
										value={insertCarData.carMpgCity}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carMpgCity: parseInt(value) })
										}
									/>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('MpgHw')}</Typography>
									<input
										type="number"
										className="description-input"
										placeholder={'Mpg Hw'}
										value={insertCarData.carMpgHw}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carMpgHw: parseInt(value) })
										}
									/>
								</Stack>
							</Stack>
							<Stack className="config-row">
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Doors')}</Typography>
									<input
										type="text"
										className="description-input"
										placeholder={'Doors'}
										value={insertCarData.carDoor}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carDoor: value })
										}
									/>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Cylinders')}</Typography>
									<input
										type="text"
										className="description-input"
										placeholder={'Cylinders'}
										value={insertCarData.carCylinders}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carCylinders: value })
										}
									/>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Max Speed')}</Typography>
									<input
										type="text"
										className="description-input"
										placeholder={'Max Speed'}
										value={insertCarData.carMaxSpeed}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carMaxSpeed: value })
										}
									/>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Hundred Speed')}</Typography>
									<input
										type="text"
										className="description-input"
										placeholder={'Hundred Speed'}
										value={insertCarData.carHundredSpeed}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carHundredSpeed: value })
										}
									/>
								</Stack>
							</Stack>

							<Stack className="config-row">
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Horse Power')}</Typography>
									<input
										type="text"
										className="description-input"
										placeholder={'Horse Power'}
										value={insertCarData.carHorsePower}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carHorsePower: value })
										}
									/>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Torque')}</Typography>
									<input
										type="text"
										className="description-input"
										placeholder={'Torque'}
										value={insertCarData.carTorque}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carTorque: value })
										}
									/>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Wheel Base')}</Typography>
									<input
										type="text"
										className="description-input"
										placeholder={'Wheel Base'}
										value={insertCarData.carWheelBase}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carWheelBase: value })
										}
									/>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Tire Size')}</Typography>
									<input
										type="text"
										className="description-input"
										placeholder={'Tire Size'}
										value={insertCarData.carTireSize}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carTireSize: value })
										}
									/>
								</Stack>
							</Stack>

							<Stack className="config-row">
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Length')}</Typography>
									<input
										type="text"
										className="description-input"
										placeholder={'Length'}
										value={insertCarData.carLength}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carLength: value })
										}
									/>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Width')}</Typography>
									<input
										type="text"
										className="description-input"
										placeholder={'Width'}
										value={insertCarData.carWidth}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carWidth: value })
										}
									/>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Height')}</Typography>
									<input
										type="text"
										className="description-input"
										placeholder={'Height'}
										value={insertCarData.carHeigth}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carHeigth: value })
										}
									/>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Weigth')}</Typography>
									<input
										type="text"
										className="description-input"
										placeholder={'Weigth'}
										value={insertCarData.carWeigth}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carWeigth: value })
										}
									/>
								</Stack>
							</Stack>
							<Stack className="config-row">
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Load Weight')}</Typography>
									<input
										type="text"
										className="description-input"
										placeholder={'Load Weight'}
										value={insertCarData.carLoadWeight}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carLoadWeight: value })
										}
									/>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Seats Up')}</Typography>
									<input
										type="text"
										className="description-input"
										placeholder={'Seats Up'}
										value={insertCarData.carSeatsUp}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carSeatsUp: value })
										}
									/>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Car Crush')}</Typography>
									<input
										type="number"
										className="description-input"
										placeholder={'Crushes'}
										value={insertCarData.carCrush}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carCrush: parseInt(value) })
										}
									/>
								</Stack>
								<Stack className="price-year-after-price">
									<Typography className="title">{t('Repair')}</Typography>
									<input
										type="number"
										className="description-input"
										placeholder={'Repairs'}
										value={insertCarData.carRepair}
										onChange={({ target: { value } }) =>
											setInsertCarData({ ...insertCarData, carRepair: parseInt(value) })
										}
									/>
								</Stack>
							</Stack>

							<Typography className={'key-features'}>{t('Key Features')}</Typography>
							<Stack className="config-checkbox">
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carAutoBrake}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carAutoBrake: checked })
										}
									/>
									<Typography className="title">{t('Auto Brake')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carCruiseControl}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carCruiseControl: checked })
										}
									/>
									<Typography className="title">{t('Cruise Control')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carESC}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carESC: checked })
										}
									/>
									<Typography className="title">{t('ESC System')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carAutonomuosDrive}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carAutonomuosDrive: checked })
										}
									/>
									<Typography className="title">{t('Auto Drive')}</Typography>
								</Stack>

								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carExteriorLight}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carExteriorLight: checked })
										}
									/>
									<Typography className="title">{t('Exterior Light')}</Typography>
								</Stack>

								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carPanoramicSunroof}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carPanoramicSunroof: checked })
										}
									/>
									<Typography className="title">{t('Panoramic Sunroof')}</Typography>
								</Stack>
							</Stack>
							<Stack className="config-checkbox">
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carHeatedSeats}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carHeatedSeats: checked })
										}
									/>
									<Typography className="title">{t('Hot Seats')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carCooledSeats}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carCooledSeats: checked })
										}
									/>
									<Typography className="title">{t('Cool Seats')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carTouchscreenDisplay}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carTouchscreenDisplay: checked })
										}
									/>
									<Typography className="title">{t('Display')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carAutoHeadLight}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carAutoHeadLight: checked })
										}
									/>
									<Typography className="title">{t('Auto Head Light')}</Typography>
								</Stack>

								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carStarStop}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carStarStop: checked })
										}
									/>
									<Typography className="title">{t('Star Stop')}</Typography>
								</Stack>

								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carNoiseCancellation}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carNoiseCancellation: checked })
										}
									/>
									<Typography className="title">{t('Noise Cancellation')}</Typography>
								</Stack>
							</Stack>
							<Stack className="config-checkbox">
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carRemoteKeyless}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carRemoteKeyless: checked })
										}
									/>
									<Typography className="title">{t('Remote Keyless')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carLaneDW}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carLaneDW: checked })
										}
									/>
									<Typography className="title">{t('Lane DW system')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carBlindSpotMonitoring}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carBlindSpotMonitoring: checked })
										}
									/>
									<Typography className="title">{t('BSM System')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carRearCrossTrafficAlert}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carRearCrossTrafficAlert: checked })
										}
									/>
									<Typography className="title">{t('RCTA System')}</Typography>
								</Stack>

								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carApplePlay}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carApplePlay: checked })
										}
									/>
									<Typography className="title">{t('Apple Play')}</Typography>
								</Stack>

								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carAndroidAuto}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carAndroidAuto: checked })
										}
									/>
									<Typography className="title">{t('Android Auto')}</Typography>
								</Stack>
							</Stack>
							<Stack className="config-checkbox">
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carVoiceControl}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carVoiceControl: checked })
										}
									/>
									<Typography className="title">{t('Voice Control')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carBluetoothConnectivity}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carBluetoothConnectivity: checked })
										}
									/>
									<Typography className="title">{t('Bluetooth')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carWirelessCharging}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carWirelessCharging: checked })
										}
									/>
									<Typography className="title">{t('Wireless Charging')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carParkingAssist}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carParkingAssist: checked })
										}
									/>
									<Typography className="title">{t('Parking Assist')}</Typography>
								</Stack>

								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carSurroundViewCamera}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carSurroundViewCamera: checked })
										}
									/>
									<Typography className="title">{t('360 Camera')}</Typography>
								</Stack>

								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carFrontSensors}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carFrontSensors: checked })
										}
									/>
									<Typography className="title">{t('Front Sensors')}</Typography>
								</Stack>
							</Stack>
							<Stack className="config-checkbox">
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carRearSensors}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carRearSensors: checked })
										}
									/>
									<Typography className="title">{t('Rear Sensors')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carFrontRecordCamera}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carFrontRecordCamera: checked })
										}
									/>
									<Typography className="title">{t('Front Recording')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carRearRecordCamera}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carRearRecordCamera: checked })
										}
									/>
									<Typography className="title">{t('Rear Recording')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carHeadsUpDisplay}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carHeadsUpDisplay: checked })
										}
									/>
									<Typography className="title">{t('HeadsUp Display')}</Typography>
								</Stack>

								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carClimateControl}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carClimateControl: checked })
										}
									/>
									<Typography className="title">{t('Climate Control')}</Typography>
								</Stack>

								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carAdjustableSeats}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carAdjustableSeats: checked })
										}
									/>
									<Typography className="title">{t('Adjustable Seats')}</Typography>
								</Stack>
							</Stack>
							<Stack className="config-checkbox">
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carMemorySeats}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carMemorySeats: checked })
										}
									/>
									<Typography className="title">{t('Memory Seats')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carPowerTrain}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carPowerTrain: checked })
										}
									/>
									<Typography className="title">{t('Power Train')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carRegenerativeBraking}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carRegenerativeBraking: checked })
										}
									/>
									<Typography className="title">{t('Regenerative Brake')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carTractionControl}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carTractionControl: checked })
										}
									/>
									<Typography className="title">{t('Traction Control')}</Typography>
								</Stack>

								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carStabilityControl}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carStabilityControl: checked })
										}
									/>
									<Typography className="title">{t('Stability Control')}</Typography>
								</Stack>

								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carHillStartAssist}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carHillStartAssist: checked })
										}
									/>
									<Typography className="title">{t('Hill Start Assist')}</Typography>
								</Stack>
							</Stack>
							<Stack className="config-checkbox">
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carTirePressureSystem}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carTirePressureSystem: checked })
										}
									/>
									<Typography className="title">{t('Tire Pressure System')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carPushButton}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carPushButton: checked })
										}
									/>
									<Typography className="title">{t('Push Button')}</Typography>
								</Stack>
							</Stack>
							<Typography className={'key-features'}>{t('Car Crush Parts')}</Typography>
							<Stack className="config-checkbox">
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carFrontBumper}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carFrontBumper: checked })
										}
									/>
									<Typography className="title">{t('Front Bumper')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carBackBumper}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carBackBumper: checked })
										}
									/>
									<Typography className="title">{t('Back Bumper')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carBonnet}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carBonnet: checked })
										}
									/>
									<Typography className="title">{t('Bonnet')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carTailgate}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carTailgate: checked })
										}
									/>
									<Typography className="title">{t('Tailgate')}</Typography>
								</Stack>

								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carRoof}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carRoof: checked })
										}
									/>
									<Typography className="title">{t('Roof')}</Typography>
								</Stack>
							</Stack>
							<Stack className="config-checkbox">
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carRightFrontWing}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carRightFrontWing: checked })
										}
									/>
									<Typography className="title">{t('Right Front Wing')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carLeftFrontWing}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carLeftFrontWing: checked })
										}
									/>
									<Typography className="title">{t('Left Front Wing')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carRightBackWing}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carRightBackWing: checked })
										}
									/>
									<Typography className="title">{t('Right Back Wing')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carLeftBackWing}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carLeftBackWing: checked })
										}
									/>
									<Typography className="title">{t('Left Back Wing')}</Typography>
								</Stack>
							</Stack>
							<Stack className="config-checkbox">
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carRightFrontDoor}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carRightFrontDoor: checked })
										}
									/>
									<Typography className="title">{t('Right Front Door')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carLeftFrontDoor}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carLeftFrontDoor: checked })
										}
									/>
									<Typography className="title">{t('Left Front Door')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carRightBackDoor}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carRightBackDoor: checked })
										}
									/>
									<Typography className="title">{t('Right Back Door')}</Typography>
								</Stack>
								<Stack className="price-year-after-price">
									<input
										type="checkbox"
										className="description-input"
										checked={!!insertCarData.carLeftBackDoor}
										onChange={({ target: { checked } }) =>
											setInsertCarData({ ...insertCarData, carLeftBackDoor: checked })
										}
									/>
									<Typography className="title">{t('Left Back Door')}</Typography>
								</Stack>
							</Stack>

						</Stack>

						<Typography className="upload-title">{t('Upload photos of your Car')}</Typography>
						<Stack className="images-box">
							<Stack className="upload-box">
								<svg xmlns="http://www.w3.org/2000/svg" width="121" height="120" viewBox="0 0 121 120" fill="none">
									<g clipPath="url(#clip0_7037_5336)">
										<path
											d="M68.9453 52.0141H52.9703C52.4133 52.0681 51.8511 52.005 51.32 51.8289C50.7888 51.6528 50.3004 51.3675 49.886 50.9914C49.4716 50.6153 49.1405 50.1567 48.9139 49.645C48.6874 49.1333 48.5703 48.5799 48.5703 48.0203C48.5703 47.4607 48.6874 46.9073 48.9139 46.3956C49.1405 45.884 49.4716 45.4253 49.886 45.0492C50.3004 44.6731 50.7888 44.3878 51.32 44.2117C51.8511 44.0356 52.4133 43.9725 52.9703 44.0266H68.9828C69.5397 43.9725 70.1019 44.0356 70.633 44.2117C71.1642 44.3878 71.6527 44.6731 72.067 45.0492C72.4814 45.4253 72.8125 45.884 73.0391 46.3956C73.2657 46.9073 73.3827 47.4607 73.3827 48.0203C73.3827 48.5799 73.2657 49.1333 73.0391 49.645C72.8125 50.1567 72.4814 50.6153 72.067 50.9914C71.6527 51.3675 71.1642 51.6528 70.633 51.8289C70.1019 52.005 69.5397 52.0681 68.9828 52.0141H68.9453Z"
											fill="#DDDDDD"
										/>
										<path
											d="M72.4361 65.0288L63.6236 57.0413C62.8704 56.3994 61.9132 56.0469 60.9236 56.0469C59.934 56.0469 58.9768 56.3994 58.2236 57.0413L49.4111 65.0288C48.6807 65.7585 48.2597 66.7415 48.2355 67.7736C48.2113 68.8057 48.5859 69.8074 49.2813 70.5704C49.9767 71.3335 50.9394 71.7991 51.9693 71.8705C52.9992 71.9419 54.017 71.6136 54.8111 70.9538L56.9111 69.0413V88.0163C57.0074 89.0088 57.4697 89.9298 58.208 90.6C58.9464 91.2701 59.9077 91.6414 60.9048 91.6414C61.9019 91.6414 62.8633 91.2701 63.6016 90.6C64.34 89.9298 64.8023 89.0088 64.8986 88.0163V69.0413L66.9986 70.9538C67.3823 71.3372 67.8398 71.6387 68.3434 71.8403C68.8469 72.0418 69.3861 72.1392 69.9284 72.1265C70.4706 72.1138 71.0046 71.9913 71.4982 71.7664C71.9918 71.5415 72.4346 71.2188 72.8 70.8179C73.1653 70.417 73.4456 69.9463 73.6239 69.434C73.8022 68.9217 73.8748 68.3786 73.8373 67.8375C73.7997 67.2965 73.6529 66.7686 73.4056 66.2858C73.1584 65.8031 72.8158 65.3755 72.3986 65.0288H72.4361Z"
											fill="#DDDDDD"
										/>
										<path
											d="M100.975 120.003C100.418 120.057 99.8558 119.994 99.3247 119.818C98.7935 119.642 98.3051 119.357 97.8907 118.98C97.4763 118.604 97.1452 118.146 96.9186 117.634C96.6921 117.122 96.575 116.569 96.575 116.009C96.575 115.45 96.6921 114.896 96.9186 114.385C97.1452 113.873 97.4763 113.414 97.8907 113.038C98.3051 112.662 98.7935 112.377 99.3247 112.201C99.8558 112.025 100.418 111.962 100.975 112.016C104.158 112.016 107.21 110.751 109.46 108.501C111.711 106.25 112.975 103.198 112.975 100.016V19.9906C112.975 16.808 111.711 13.7558 109.46 11.5053C107.21 9.25491 104.158 7.99063 100.975 7.99063H36.9624C36.4055 8.04466 35.8433 7.98159 35.3122 7.80547C34.781 7.62935 34.2926 7.34408 33.8782 6.96797C33.4638 6.59186 33.1327 6.13324 32.9061 5.62156C32.6796 5.10989 32.5625 4.55648 32.5625 3.99688C32.5625 3.43728 32.6796 2.88386 32.9061 2.37219C33.1327 1.86051 33.4638 1.40189 33.8782 1.02578C34.2926 0.649674 34.781 0.364397 35.3122 0.188277C35.8433 0.0121578 36.4055 -0.05091 36.9624 0.00312538H100.975C106.273 0.0130374 111.351 2.12204 115.097 5.86828C118.844 9.61451 120.953 14.6927 120.962 19.9906V100.016C120.953 105.314 118.844 110.392 115.097 114.138C111.351 117.884 106.273 119.993 100.975 120.003Z"
											fill="#DDDDDD"
										/>
										<path
											d="M84.9609 120.003H20.9484C15.6505 119.993 10.5723 117.884 6.82609 114.138C3.07985 110.392 0.97085 105.314 0.960938 100.016L0.960938 19.9906C0.97085 14.6927 3.07985 9.61451 6.82609 5.86828C10.5723 2.12204 15.6505 0.0130374 20.9484 0.00312538C21.5054 -0.05091 22.0676 0.0121578 22.5987 0.188277C23.1299 0.364397 23.6183 0.649674 24.0327 1.02578C24.4471 1.40189 24.7782 1.86051 25.0047 2.37219C25.2313 2.88386 25.3484 3.43728 25.3484 3.99688C25.3484 4.55648 25.2313 5.10989 25.0047 5.62156C24.7782 6.13324 24.4471 6.59186 24.0327 6.96797C23.6183 7.34408 23.1299 7.62935 22.5987 7.80547C22.0676 7.98159 21.5054 8.04466 20.9484 7.99063C17.7658 7.99063 14.7136 9.25491 12.4632 11.5053C10.2127 13.7558 8.94844 16.808 8.94844 19.9906V100.016C8.94844 103.198 10.2127 106.25 12.4632 108.501C14.7136 110.751 17.7658 112.016 20.9484 112.016H84.9609C85.5179 111.962 86.08 112.025 86.6112 112.201C87.1424 112.377 87.6308 112.662 88.0452 113.038C88.4595 113.414 88.7907 113.873 89.0172 114.385C89.2438 114.896 89.3609 115.45 89.3609 116.009C89.3609 116.569 89.2438 117.122 89.0172 117.634C88.7907 118.146 88.4595 118.604 88.0452 118.98C87.6308 119.357 87.1424 119.642 86.6112 119.818C86.08 119.994 85.5179 120.057 84.9609 120.003Z"
											fill="#DDDDDD"
										/>
										<path
											d="M28.9704 24.0031H20.9454C19.9529 23.9068 19.0319 23.4445 18.3617 22.7062C17.6916 21.9679 17.3203 21.0065 17.3203 20.0094C17.3203 19.0123 17.6916 18.0509 18.3617 17.3126C19.0319 16.5743 19.9529 16.1119 20.9454 16.0156H28.9704C29.9628 16.1119 30.8839 16.5743 31.554 17.3126C32.2242 18.0509 32.5954 19.0123 32.5954 20.0094C32.5954 21.0065 32.2242 21.9679 31.554 22.7062C30.8839 23.4445 29.9628 23.9068 28.9704 24.0031Z"
											fill="#DDDDDD"
										/>
										<path
											d="M76.9736 24.0016C76.4485 24.0065 75.9275 23.9074 75.4409 23.7098C74.9543 23.5123 74.5117 23.2203 74.1386 22.8507C73.7655 22.481 73.4693 22.0412 73.2672 21.5564C73.0651 21.0717 72.9611 20.5517 72.9611 20.0266C72.9537 19.2314 73.1827 18.452 73.619 17.7872C74.0554 17.1224 74.6794 16.6023 75.4119 16.2929C76.1444 15.9834 76.9524 15.8986 77.7332 16.0491C78.514 16.1997 79.2324 16.5789 79.7973 17.1385C80.3623 17.6981 80.7482 18.413 80.906 19.1924C81.0639 19.9717 80.9867 20.7804 80.6841 21.5158C80.3816 22.2512 79.8673 22.8801 79.2067 23.3226C78.546 23.7652 77.7688 24.0015 76.9736 24.0016Z"
											fill="#DDDDDD"
										/>
										<path
											d="M88.9736 24.0016C88.4485 24.0065 87.9275 23.9074 87.4409 23.7098C86.9543 23.5123 86.5117 23.2203 86.1386 22.8507C85.7655 22.481 85.4693 22.0412 85.2672 21.5564C85.0651 21.0717 84.9611 20.5517 84.9611 20.0266C84.9537 19.2314 85.1827 18.452 85.619 17.7872C86.0554 17.1224 86.6794 16.6023 87.4119 16.2929C88.1444 15.9834 88.9524 15.8986 89.7332 16.0491C90.514 16.1997 91.2324 16.5789 91.7974 17.1385C92.3623 17.6981 92.7482 18.413 92.9061 19.1924C93.0639 19.9717 92.9867 20.7804 92.6841 21.5158C92.3816 22.2512 91.8673 22.8801 91.2067 23.3226C90.5461 23.7652 89.7688 24.0015 88.9736 24.0016Z"
											fill="#DDDDDD"
										/>
										<path
											d="M100.974 24.0016C100.448 24.0065 99.9275 23.9074 99.4409 23.7098C98.9543 23.5123 98.5117 23.2203 98.1386 22.8507C97.7655 22.481 97.4693 22.0412 97.2672 21.5564C97.0651 21.0717 96.9611 20.5517 96.9611 20.0266C96.9537 19.2314 97.1827 18.452 97.619 17.7872C98.0554 17.1224 98.6794 16.6023 99.4119 16.2929C100.144 15.9834 100.952 15.8986 101.733 16.0491C102.514 16.1997 103.232 16.5789 103.797 17.1385C104.362 17.6981 104.748 18.413 104.906 19.1924C105.064 19.9717 104.987 20.7804 104.684 21.5158C104.382 22.2512 103.867 22.8801 103.207 23.3226C102.546 23.7652 101.769 24.0015 100.974 24.0016Z"
											fill="#DDDDDD"
										/>
									</g>
									<defs>
										<clipPath id="clip0_7037_5336">
											<rect width="120" height="120" fill="white" transform="translate(0.960938)" />
										</clipPath>
									</defs>
								</svg>
								<Stack className="text-box">
									<Typography className="drag-title">{t('Drag and drop images here')}</Typography>
									<Typography className="format-title">{t('Photos must be JPEG or PNG format and least 2048x768')}</Typography>
								</Stack>
								<Button
									className="browse-button"
									onClick={() => {
										inputRef.current.click();
									}}
								>
									<Typography className="browse-button-text">{t('Browse Files')}</Typography>
									<input
										ref={inputRef}
										type="file"
										hidden={true}
										onChange={uploadImages}
										multiple={true}
										accept="image/jpg, image/jpeg, image/png"
									/>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
										<g clipPath="url(#clip0_7309_3249)">
											<path
												d="M15.5556 0H5.7778C5.53214 0 5.33334 0.198792 5.33334 0.444458C5.33334 0.690125 5.53214 0.888917 5.7778 0.888917H14.4827L0.130219 15.2413C-0.0434062 15.415 -0.0434062 15.6962 0.130219 15.8698C0.21701 15.9566 0.33076 16 0.444469 16C0.558177 16 0.671885 15.9566 0.758719 15.8698L15.1111 1.51737V10.2222C15.1111 10.4679 15.3099 10.6667 15.5556 10.6667C15.8013 10.6667 16.0001 10.4679 16.0001 10.2222V0.444458C16 0.198792 15.8012 0 15.5556 0Z"
												fill="#181A20"
											/>
										</g>
										<defs>
											<clipPath id="clip0_7309_3249">
												<rect width="16" height="16" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</Button>
							</Stack>
							<Stack className="gallery-box">
								{insertCarData.carImages.map((image: string) => {
									const imagePath: string = `${REACT_APP_API_URL}/${image}`;
									return (
										<Stack className="image-box">
											<img src={imagePath} alt="" />
										</Stack>
									);
								})}
							</Stack>
						</Stack>
						<Stack className="buttons-row">
							{router?.query?.carId ? (
								<Button className="next-button" onClick={updateCarHandler}>
									<Typography className="next-button-text">{t('Save')}</Typography>
								</Button>
							) : (
								<Button className="next-button" onClick={insertCarHandler}>
									<Typography className="next-button-text">{t('Save')}</Typography>
								</Button>
							)}
						</Stack>
					</Stack>
				</div>
			</div>
		);
	}
};

AddCar.defaultProps = {
	initialValues: {
		carType: '',
		carTitle: '',
		carModel: '',
		carBody: '',
		carGroup: '',
		carMadeIn: '',
		carBrand: '',
		carPrice: 0,
		carMileage: 0,
		carYear: 0,
		carImages: [],
		carLocation: '',
		carAddress: '',
		carFuelType: '',
		carDriveType: '',
		carTransmission: '',
		carColor: '',
		carFullFuel: '',
		carMpgCity: 0,
		carMpgHw: 0,
		carEngineSize: '',
	},
};

export default AddCar;
