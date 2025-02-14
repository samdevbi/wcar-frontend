import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
	TableCell,
	TableHead,
	TableBody,
	TableRow,
	Table,
	TableContainer,
	Button,
	Menu,
	Fade,
	MenuItem,
	Box,
	Checkbox,
	Toolbar,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { IconButton, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { NotePencil } from 'phosphor-react';
import { NoticeStatus } from '../../../enums/notice.enum';

type Order = 'asc' | 'desc';

interface Data {
	category: string;
	title: string;
	group: string;
	content: string;
	status: string;
	id?: string;
}
interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: 'category',
		numeric: true,
		disablePadding: false,
		label: 'CATEGORY',
	},
	{
		id: 'group',
		numeric: true,
		disablePadding: false,
		label: 'Group',
	},

	{
		id: 'title',
		numeric: true,
		disablePadding: false,
		label: 'Title',
	},
	{
		id: 'content',
		numeric: true,
		disablePadding: false,
		label: 'Content',
	},
	{
		id: 'status',
		numeric: false,
		disablePadding: false,
		label: 'STATUS',
	},
];

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

interface EnhancedTableToolbarProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
	const [select, setSelect] = useState('');
	const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'left' : 'center'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

interface NoticeListType {
	notices?: any;
	dense?: boolean;
	membersData?: any;
	searchMembers?: any;
	anchorEl?: any;
	handleMenuIconClick?: any;
	handleMenuIconClose?: any;
	generateMentorTypeHandle?: any;
	updateNoticeHandler?: any;
	removeNoticeHandler?: any;
}

export const NoticeList = (props: NoticeListType) => {
	const {
		updateNoticeHandler,
		removeNoticeHandler,
		notices,
		dense,
		membersData,
		searchMembers,
		anchorEl,
		handleMenuIconClick,
		handleMenuIconClose,
		generateMentorTypeHandle,
	} = props;
	const router = useRouter();

	/** APOLLO REQUESTS **/
	/** LIFECYCLES **/
	/** HANDLERS **/

	return (
		<Stack>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
					{/*@ts-ignore*/}
					<EnhancedTableToolbar />
					<TableBody>
						{notices?.map((notice: any) => {
							return (
								<TableRow hover key={'member._id'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell align="left">{notice?.noticeCategory}</TableCell>
									<TableCell align="left">{notice?.noticeGroup}</TableCell>
									<TableCell align="left" className={'name'}>
										<Stack direction={'row'}>
											<div
												style={{
													maxWidth: "200px",
													whiteSpace: "nowrap",
													overflow: "hidden",
													textOverflow: "ellipsis",
												}}
											>
												{notice?.noticeTitle}
											</div>

										</Stack>
									</TableCell>
									<TableCell align="left"
										style={{
											maxWidth: "200px",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "ellipsis",
										}}>{notice?.noticeContent}</TableCell>
									<TableCell align="center">
										{notice?.noticeStatus !== NoticeStatus.ACTIVE ? (
											<Button onClick={(e: any) => updateNoticeHandler(notice?._id)} className={'badge success'}>
												{notice?.noticeStatus}
											</Button>
										) : (
											<Button className={'badge success'} onClick={(e: any) => removeNoticeHandler(notice?._id)} >
												{notice?.noticeStatus}
											</Button>
										)}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};
