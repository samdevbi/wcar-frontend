import { NoticeCategory, NoticeGroup, NoticeStatus } from "../../enums/notice.enum";


export interface NoticeUpdate {
    _id: string;
    noticeCategory?: NoticeCategory;
    noticeStatus?: NoticeStatus;
    noticeGroup?: NoticeGroup;
    noticeTitle?: string;
    noticeContent?: string;
}