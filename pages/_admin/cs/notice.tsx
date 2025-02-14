import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { Box, Button, InputAdornment, InputBase, Stack } from '@mui/material';
import { List, ListItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TabContext } from '@mui/lab';
import OutlinedInput from '@mui/material/OutlinedInput';
import TablePagination from '@mui/material/TablePagination';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { NoticeList } from '../../../libs/components/admin/cs/NoticeList';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import { NoticeCategory, NoticeGroup, NoticeStatus } from '../../../libs/enums/notice.enum';
import { CREATE_NOTICE, UPDATE_NOTICE } from '../../../apollo/admin/mutation';
import { GET_NOTICE, GET_NOTICES } from '../../../apollo/admin/query';
import { NoticeInput } from '../../../libs/types/notice/notice.input';
import { sweetErrorHandling, sweetMixinSuccessAlert } from '../../../libs/sweetAlert';
import { Notice } from '../../../libs/types/notice/notice';

const AdminNotice: NextPage = (props: any) => {
	const router = useRouter();
	const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
	const [notices, setNotices] = useState<Notice[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [insertNotice, setInsertNotice] = useState<NoticeInput>()
	const [noticeStatus, setNoticeStatus] = useState<NoticeStatus[]>(Object.values(NoticeStatus));
	const [noticeGroup, setNoticeGroup] = useState<NoticeGroup[]>(Object.values(NoticeGroup));

	const [createNotice] = useMutation(CREATE_NOTICE);
	const [updateNotice] = useMutation(UPDATE_NOTICE);

	/** APOLLO REQUESTS **/
	const {
		loading: getNoticeLoading,
		data: getNoticeData,
		error: getNoticeError,
		refetch: getNoticeRefetch,
	} = useQuery(GET_NOTICE, {
		fetchPolicy: 'network-only',
		variables: {
			input: router.query.noticeId,
		},
	});

	const {
		loading: getNoticesLoading,
		data: getNoticesData,
		error: getNoticesError,
		refetch: getNoticesRefetch,
	} = useQuery(GET_NOTICES, {
		fetchPolicy: 'network-only',
		variables: {
			input: {
				page: 1,
				limit: 100,
				search: {
					noticeCategory: NoticeCategory.EVENT,
				}
			}
		},
		onCompleted: (data) => {
			console.log("dataNotice", data);

			setNotices(data?.getNotices?.list);
			setTotal(data?.getNotices?.metaCounter[0]?.total);
		},
	});
	/** LIFECYCLES **/
	useEffect(() => {
		setInsertNotice({
			...insertNotice,
			noticeCategory: NoticeCategory.EVENT,
			noticeStatus: NoticeStatus.HOLD,
			noticeGroup: NoticeGroup.EVENT,
			noticeTitle: getNoticeData?.getNotice ? getNoticeData?.getNotice?.noticeTitle : '',
			noticeContent: getNoticeData?.getNotice ? getNoticeData?.getNotice?.noticeContent : '',
		});
	}, [getNoticeLoading, getNoticeData]);
	/** HANDLERS **/

	const insertNoticeHandler = useCallback(async () => {
		try {
			const result = await createNotice({
				variables: {
					input: insertNotice,
				},
			});

			await sweetMixinSuccessAlert('This notice has been created sucessfully');
			await router.reload();
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	}, [insertNotice]);


	const updateNoticeHandler = useCallback(async (noticeId: string) => {
		try {
			// @ts-ignore
			const result = await updateNotice({
				variables: {
					input: {
						_id: noticeId,
						noticeStatus: NoticeStatus.ACTIVE
					},
				},
			});

			await sweetMixinSuccessAlert('This notice has been updated sucessfully');
			await router.reload();
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	}, [insertNotice]);


	const removeNoticeHandler = useCallback(async (noticeId: string) => {
		try {
			// @ts-ignore
			const result = await updateNotice({
				variables: {
					input: {
						_id: noticeId,
						noticeStatus: NoticeStatus.HOLD
					},
				},
			});

			await sweetMixinSuccessAlert('This notice has been updated sucessfully');
			await router.reload();
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	}, [insertNotice]);

	return (
		// @ts-ignore
		<Box component={'div'} className={'content'}>
			<Box component={'div'} className={'add-notice'}>
				<Box component={'div'} className={'title flex_space'}>
					<Typography variant={'h2'}>NOTICE</Typography>
					<Button
						className="btn_add"
						variant={'contained'}
						size={'medium'}
						onClick={insertNoticeHandler}
					>
						<AddRoundedIcon sx={{ mr: '8px' }} />
						ADD
					</Button>
				</Box>
				<Box className={'title-box'}>
					<Typography >Title</Typography>
					<InputBase
						type="text"
						className={'input'}
						placeholder={'Writing...'}
						value={insertNotice?.noticeTitle}
						onChange={({ target: { value } }) =>
							setInsertNotice({ ...insertNotice, noticeTitle: value })
						} />
					<Typography>Content</Typography>
					<textarea
						className={'input-answer'}
						placeholder={'Writing...'}
						value={insertNotice?.noticeContent}
						onChange={({ target: { value } }) =>
							setInsertNotice({ ...insertNotice, noticeContent: value })
						}
					/>
				</Box>
			</Box>
			<Box component={'div'} className={'table-wrap'}>
				<Box component={'div'} sx={{ width: '100%', typography: 'body1' }}>
					<TabContext value={'value'}>
						<Box component={'div'}>
							<List className={'tab-menu'}>
								<ListItem
									// onClick={(e) => handleTabChange(e, 'all')}
									value="all"
									className={'all' === 'all' ? 'li on' : 'li'}
								>
									All (0)
								</ListItem>
								<ListItem
									// onClick={(e) => handleTabChange(e, 'active')}
									value="active"
									className={'all' === 'all' ? 'li on' : 'li'}
								>
									Active (0)
								</ListItem>
								<ListItem
									// onClick={(e) => handleTabChange(e, 'blocked')}
									value="blocked"
									className={'all' === 'all' ? 'li on' : 'li'}
								>
									Blocked (0)
								</ListItem>
								<ListItem
									// onClick={(e) => handleTabChange(e, 'deleted')}
									value="deleted"
									className={'all' === 'all' ? 'li on' : 'li'}
								>
									Deleted (0)
								</ListItem>
							</List>
							<Divider />
							<Stack className={'search-area'} sx={{ m: '24px' }}>
								<Select sx={{ width: '160px', mr: '20px' }} value={'searchCategory'}>
									<MenuItem value={'mb_nick'}>mb_nick</MenuItem>
									<MenuItem value={'mb_id'}>mb_id</MenuItem>
								</Select>

								<OutlinedInput
									value={'searchInput'}
									// onChange={(e) => handleInput(e.target.value)}
									sx={{ width: '100%' }}
									className={'search'}
									placeholder="Search user name"
									onKeyDown={(event) => {
										// if (event.key == 'Enter') searchTargetHandler().then();
									}}
									endAdornment={
										<>
											{true && <CancelRoundedIcon onClick={() => { }} />}
											<InputAdornment position="end" onClick={() => { }}>
												<img src="/img/icons/search_icon.png" alt={'searchIcon'} />
											</InputAdornment>
										</>
									}
								/>
							</Stack>
							<Divider />
						</Box>
						<NoticeList
							notices={notices}
							updateNoticeHandler={updateNoticeHandler}
							removeNoticeHandler={removeNoticeHandler}
							// dense={dense}
							// membersData={membersData}
							// searchMembers={searchMembers}
							anchorEl={anchorEl}
						// handleMenuIconClick={handleMenuIconClick}
						// handleMenuIconClose={handleMenuIconClose}
						// generateMentorTypeHandle={generateMentorTypeHandle}
						/>

						<TablePagination
							rowsPerPageOptions={[20, 40, 60]}
							component="div"
							count={4}
							rowsPerPage={10}
							page={1}
							onPageChange={() => { }}
							onRowsPerPageChange={() => { }}
						/>
					</TabContext>
				</Box>
			</Box>
		</Box>
	);
};

export default withAdminLayout(AdminNotice);
