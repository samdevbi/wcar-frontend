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
import { FaqArticlesPanelList } from '../../../libs/components/admin/cs/FaqList';
import { useRouter } from 'next/router';
import { NoticeInput, NoticesInquiry } from '../../../libs/types/notice/notice.input';
import { GET_NOTICE, GET_NOTICES } from '../../../apollo/admin/query';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_NOTICE, UPDATE_NOTICE } from '../../../apollo/admin/mutation';
import { sweetErrorHandling, sweetMixinSuccessAlert } from '../../../libs/sweetAlert';
import { NoticeCategory, NoticeGroup, NoticeStatus } from '../../../libs/enums/notice.enum';
import { NoticeType } from '../../../libs/types/notice/notice';
import { NoticeUpdate } from '../../../libs/types/notice/notice.update';

const FaqArticles: NextPage = (initialInput, ...props: any) => {
	const router = useRouter();
	const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
	const [searchFilter, setSearchFilter] = useState<NoticesInquiry>(
		router?.query?.input ? JSON.parse(router?.query?.input as string) : initialInput,
	);
	const [insertNotice, setInsertNotice] = useState<NoticeInput>()
	const [noticeCategory, setNoticeCategory] = useState<NoticeCategory[]>(Object.values(NoticeCategory));
	const [noticeStatus, setNoticeStatus] = useState<NoticeStatus[]>(Object.values(NoticeStatus));
	const [noticeGroup, setNoticeGroup] = useState<NoticeGroup[]>(Object.values(NoticeGroup));
	const [notices, setNotices] = useState<NoticeType[]>([]);
	const [total, setTotal] = useState<number>(0);

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
					noticeCategory: NoticeCategory.FAQ,
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
			noticeCategory: NoticeCategory.FAQ,
			noticeStatus: NoticeStatus.HOLD,
			noticeGroup: getNoticeData?.getNotice ? getNoticeData?.getNotice?.noticeGroup : '',
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
			await getNoticesRefetch();
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
		<Stack component={'div'} className={'content'}>
			<Stack component={'div'} className={'add-notice'}>
				<Stack component={'div'} className={'title flex_space'}>
					<Typography variant={'h2'}>FAQ</Typography>
					<Button
						className="btn_add"
						variant={'contained'}
						size={'medium'}
						onClick={insertNoticeHandler}
					>
						<AddRoundedIcon sx={{ mr: '8px' }} />
						ADD
					</Button>
				</Stack>
				<Stack className={'title-box'}>
					<Typography className="title">Select Group</Typography>
					<select
						className={'select-description'}
						defaultValue={insertNotice?.noticeGroup || 'select'}
						value={insertNotice?.noticeGroup || 'select'}
						onChange={({ target: { value } }) =>
							// @ts-ignore
							setInsertNotice({ ...insertNotice, noticeGroup: value })
						}
					>
						<>
							<option selected={true} disabled={true} value={'select'}>
								Select
							</option>
							{noticeGroup?.map((group: any) => (
								<option value={`${group}`} key={group}>
									{group}
								</option>
							))}
						</>
					</select>
					<Typography >Question</Typography>
					<InputBase
						type="text"
						className={'input'}
						placeholder={'Writing...'}
						value={insertNotice?.noticeTitle}
						onChange={({ target: { value } }) =>
							setInsertNotice({ ...insertNotice, noticeTitle: value })
						} />
					<Typography>Answer</Typography>
					<textarea
						className={'input-answer'}
						placeholder={'Writing...'}
						value={insertNotice?.noticeContent}
						onChange={({ target: { value } }) =>
							setInsertNotice({ ...insertNotice, noticeContent: value })
						}
					/>
				</Stack>
			</Stack>
			<Stack component={'div'} className={'table-wrap'}>
				<Stack component={'div'} sx={{ width: '100%', typography: 'body1' }}>
					<TabContext value={'value'}>
						<Stack component={'div'}>
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
						</Stack>
						<FaqArticlesPanelList
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
				</Stack>
			</Stack>
		</Stack>
	);
};

FaqArticles.defaultProps = {
	initialInput: {
		page: 1,
		limit: 10,
		sort: 'createdAt',
		direction: 'DESC',
		search: {
		},
	},
};

export default withAdminLayout(FaqArticles);
