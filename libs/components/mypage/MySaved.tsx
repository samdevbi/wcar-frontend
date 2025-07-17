import React, { useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Pagination, Stack, Typography } from '@mui/material';
import { T } from '../../types/common';
import { useMutation, useQuery } from '@apollo/client';
import { sweetMixinErrorAlert } from '../../sweetAlert';
import { Messages } from '../../config';
import { LIKE_CAR, SAVE_CAR } from '../../../apollo/user/mutation';
import { Car } from '../../types/car/car';
import FindingCarCard from '../homepage/FindingCarCard';
import { GET_SAVED } from '../../../apollo/user/query';
import SavedCarCard from '../common/SavedCarCard';
import { useTranslation } from 'next-i18next';

const MySaved: NextPage = () => {
	const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common');
	const [mySaved, setMySaved] = useState<Car[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [searchSaved, setSearchSaved] = useState<T>({ page: 1, limit: 6 });

	/** APOLLO REQUESTS **/
	const [saveTargetCar] = useMutation(SAVE_CAR);

	const {
		loading: getSavedLoading,
		data: getSavedData,
		error: getSavedError,
		refetch: getSavedRefetch,
	} = useQuery(GET_SAVED, {
		fetchPolicy: 'network-only',
		variables: { input: searchSaved },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			console.log("data", data);

			setMySaved(data?.getSaved?.list);
			setTotal(data?.getSaved?.metaCounter?.[0]?.total ?? 0);
		},
	});


	/** HANDLERS **/
	const saveCarHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Messages.error2);

			await saveTargetCar({
				variables: { input: id },
			});

			getSavedRefetch({ input: searchSaved });
		} catch (err: any) {
			sweetMixinErrorAlert(err.message).then();
		}
	};


	const paginationHandler = (e: T, value: number) => {
		setSearchSaved({ ...searchSaved, page: value });
	};

	if (device === 'mobile') {
		return <div>WCAR MY SAVED MOBILE</div>;
	} else {
		return (
			<div id="my-favorites-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">{t('My')} {t('Saved')}</Typography>
					</Stack>
				</Stack>
				<Stack className="favorites-list-box">
					{mySaved?.length ? (
						mySaved?.map((car: Car) => {
							return <SavedCarCard car={car} saveCarHandler={saveCarHandler} />;
						})
					) : (
						<div className={'no-data'}>
							<img src="/img/icons/icoAlert.svg" alt="" />
							<p>{t('No')} {t('Saved')} {t('found!')}</p>
						</div>
					)}
				</Stack>
				{mySaved?.length ? (
					<Stack className="pagination-config">
						<Stack className="pagination-box">
							<Pagination
								count={Math.ceil(total / searchSaved.limit)}
								page={searchSaved.page}
								shape="rounded"
								color="secondary"
								onChange={paginationHandler}
							/>
						</Stack>
						<Stack className="total-result">
							<Typography>
								{t('Total')} {total} {t('Saved')} car{total > 1 ? 's' : ''}
							</Typography>
						</Stack>
					</Stack>
				) : null}
			</div>
		);
	}
};

export default MySaved;
