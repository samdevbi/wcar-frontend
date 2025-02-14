import { Direction } from "../../enums/common.enum";
import { NoticeCategory, NoticeGroup, NoticeStatus } from "../../enums/notice.enum";



export interface NoticeInput {
    noticeCategory?: NoticeCategory;
    noticeStatus?: NoticeStatus;
    noticeGroup?: NoticeGroup;
    noticeTitle?: string;
    noticeContent?: string;

    memberId?: string;
}

interface NISearch {
    noticeCategory?: NoticeCategory;
    noticeStatus?: NoticeStatus;
    noticeGroup?: NoticeGroup;
}

export interface NoticesInquiry {
    page: number;
    limit: number;
    sort?: string;
    direction?: Direction;
    search: NISearch;
}