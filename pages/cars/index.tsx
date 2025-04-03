import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Box, Button, Divider, FormControl, Menu, MenuItem, Modal, Pagination, Select, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import Filter from '../../libs/components/car/Filter';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Direction, Message } from '../../libs/enums/common.enum';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CARS } from '../../apollo/user/query';
import { T } from '../../libs/types/common';
import { sweetMixinErrorAlert } from '../../libs/sweetAlert';
import { Car } from '../../libs/types/car/car';
import { CarsInquiry } from '../../libs/types/car/car.input';
import MainCarCard from '../../libs/components/car/MainCarCard';
import { CREATE_NOTIFICATION, LIKE_CAR, SAVE_CAR } from '../../apollo/user/mutation';
import { useTranslation } from 'next-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

const CarList: NextPage = ({ initialInput, ...props }: any) => {
    const device = useDeviceDetect();
    const router = useRouter();
    const { t, i18n } = useTranslation('common');
    const [searchFilter, setSearchFilter] = useState<CarsInquiry>(
        router?.query?.input ? JSON.parse(router?.query?.input as string) : initialInput,
    );
    const [cars, setCars] = useState<Car[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [sortingOpen, setSortingOpen] = useState(false);
    const [filterSortName, setFilterSortName] = useState('New');
    const [openAdvancedFilter, setOpenAdvancedFilter] = useState(false);
    const [openLocation, setOpenLocation] = useState(false);
    const [openType, setOpenType] = useState(false);
    const [openRooms, setOpenRooms] = useState(false);
    const [optionCheck, setOptionCheck] = useState('all');


    /** APOLLO REQUESTS **/
    const [likeTargetCar] = useMutation(LIKE_CAR);
    const [saveTargetCar] = useMutation(SAVE_CAR);
    const [notificate] = useMutation(CREATE_NOTIFICATION);

    const {
        loading: getCarsLoading,
        data: getCarsData,
        error: getCarsError,
        refetch: getCarsRefetch
    } = useQuery(GET_CARS, {
        fetchPolicy: 'network-only',
        variables: { input: searchFilter },
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            console.log("data", data);

            setCars(data?.getCars?.list);
            setTotal(data?.getCars?.metaCounter[0]?.total);
        },
    });

    /** LIFECYCLES **/
    useEffect(() => {
        if (router.query.input) {
            const inputObj = JSON.parse(router?.query?.input as string);
            setSearchFilter(inputObj);
        }

        setCurrentPage(searchFilter.page === undefined ? 1 : searchFilter.page);
    }, [router]);

    useEffect(() => {

    }, [searchFilter]);

    /** HANDLERS **/
    const handlePaginationChange = async (event: ChangeEvent<unknown>, value: number) => {
        searchFilter.page = value;
        await router.push(
            `/cars?input=${JSON.stringify(searchFilter)}`,
            `/cars?input=${JSON.stringify(searchFilter)}`,
            {
                scroll: false,
            },
        );
        setCurrentPage(value);
    };

    const likeCarHandler = async (user: T, id: string, creatorId: string) => {
        try {
            if (!id) return;
            if (!user._id) throw new Error(Message.SOMETHING_WENT_WRONG);

            await likeTargetCar({
                variables: { input: id },
            });
            await notificate({
                variables: {
                    input: {
                        carId: id,
                        authorId: user._id,
                        notificationType: 'LIKE',
                        notificationGroup: 'CAR',
                        receiverId: creatorId,
                    }
                }
            });
            await getCarsRefetch({ input: initialInput });
        } catch (err: any) {
            sweetMixinErrorAlert(err.message).then();
        }
    }

    const saveCarHandler = async (user: T, id: string) => {
        try {
            if (!id) return;
            if (!user._id) throw new Error(Message.SOMETHING_WENT_WRONG);

            await saveTargetCar({
                variables: { input: id },
            });
            await getCarsRefetch({ input: initialInput });
        } catch (err: any) {
            sweetMixinErrorAlert(err.message).then();
        }
    }

    const sortingClickHandler = (e: MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
        setSortingOpen(true);
    };

    const sortingCloseHandler = () => {
        setSortingOpen(false);
        setAnchorEl(null);
    };

    const sortingHandler = (e: React.MouseEvent<HTMLLIElement>) => {
        switch (e.currentTarget.id) {
            case 'new':
                setSearchFilter({ ...searchFilter, sort: 'createdAt', direction: Direction.ASC });
                setFilterSortName('New');
                break;
            case 'lowest':
                setSearchFilter({ ...searchFilter, sort: 'carPrice', direction: Direction.ASC });
                setFilterSortName('Lowest Price');
                break;
            case 'highest':
                setSearchFilter({ ...searchFilter, sort: 'carPrice', direction: Direction.DESC });
                setFilterSortName('Highest Price');
        }
        setSortingOpen(false);
        setAnchorEl(null);
    };

    /** HANDLERS **/
    const advancedFilterHandler = (status: boolean) => {
        setOpenLocation(false);
        setOpenRooms(false);
        setOpenType(false);
        setOpenAdvancedFilter(status);
    };

    const locationStateChangeHandler = () => {
        setOpenLocation((prev) => !prev);
        setOpenRooms(false);
        setOpenType(false);
    };

    const typeStateChangeHandler = () => {
        setOpenType((prev) => !prev);
        setOpenLocation(false);
        setOpenRooms(false);
    };

    const roomStateChangeHandler = () => {
        setOpenRooms((prev) => !prev);
        setOpenType(false);
        setOpenLocation(false);
    };

    const disableAllStateHandler = () => {
        setOpenRooms(false);
        setOpenType(false);
        setOpenLocation(false);
    };


    if (device === 'mobile') {
        return <h1>CARS MOBILE</h1>;
    } else {
        return (
            <div id="property-list-page" style={{ position: 'relative' }}>
                <div className="container">
                    <Box component={'div'} className={'right'}>
                        <span>{t('Sort by')}</span>
                        <div>
                            <Button onClick={sortingClickHandler} endIcon={<KeyboardArrowDownRoundedIcon />}>
                                {filterSortName}
                            </Button>
                            <Menu anchorEl={anchorEl} open={sortingOpen} onClose={sortingCloseHandler} sx={{ paddingTop: '5px' }}>
                                <MenuItem
                                    onClick={sortingHandler}
                                    id={'new'}
                                    disableRipple
                                    sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
                                >
                                    {t('New')}
                                </MenuItem>
                                <MenuItem
                                    onClick={sortingHandler}
                                    id={'lowest'}
                                    disableRipple
                                    sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
                                >
                                    {t('Lowest Price')}
                                </MenuItem>
                                <MenuItem
                                    onClick={sortingHandler}
                                    id={'highest'}
                                    disableRipple
                                    sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
                                >
                                    {t('Highest Price')}
                                </MenuItem>
                            </Menu>
                        </div>
                    </Box>
                    <Stack className={'property-page'}>
                        <Stack className={'filter-config'}>
                            {/* @ts-ignore */}
                            <Filter searchFilter={searchFilter} setSearchFilter={setSearchFilter} initialInput={initialInput} />
                        </Stack>
                        <Stack className="main-config" mb={'76px'}>
                            <Stack className={'list-config'}>
                                {cars?.length === 0 ? (
                                    <div className={'no-data'}>
                                        <img src="/img/icons/icoAlert.svg" alt="" />
                                        <p>{t('No Cars found!')}</p>
                                    </div>
                                ) : (
                                    cars?.map((car: Car) => {
                                        return <MainCarCard car={car} key={car?._id} likeCarHandler={likeCarHandler} saveCarHandler={saveCarHandler} />;
                                    })
                                )}
                            </Stack>
                            <Stack className="pagination-config">
                                {cars?.length !== 0 && (
                                    <Stack className="pagination-box">
                                        <Pagination
                                            page={currentPage}
                                            count={Math.ceil(total / searchFilter.limit)}
                                            onChange={handlePaginationChange}
                                            shape="rounded"
                                            color="secondary"
                                        />
                                    </Stack>
                                )}

                                {cars?.length !== 0 && (
                                    <Stack className="total-result">
                                        <Typography>
                                            {t('Total')} {total} {t('car')}{total > 1 ? 's' : ''} {t('available')}
                                        </Typography>
                                    </Stack>
                                )}
                            </Stack>
                        </Stack>
                    </Stack>
                </div>
            </div >
        );
    }
};

CarList.defaultProps = {
    initialInput: {
        page: 1,
        limit: 10,
        sort: 'createdAt',
        direction: 'DESC',
        search: {
        },
    },
};

export default withLayoutBasic(CarList);
