import { NotificationGroup, NotificationStatus, NotificationType } from "../../enums/notification.enum";
import { Direction } from "../../enums/common.enum";




export interface NotificationInput {
    notificationType: NotificationType;
    notificationGroup: NotificationGroup;
    authorId: string;
    receiverId?: string;
    carId?: string;
    articleId?: string;
    commentId?: string;
}

export interface ToggleNotificate {
    notificationType: NotificationType;
    notificationGroup: NotificationGroup;
    carId?: string;
    articleId?: string;
    comentId?: string;
    authorId?: string;
    receiverId?: string;
}

export interface NotificationInquiry {
    page: number;
    limit: number;
    sort?: string;
    direction?: Direction;
    notificationStatus?: NotificationStatus;
}