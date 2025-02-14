import { NotificationGroup, NotificationStatus, NotificationType } from "../../enums/notification.enum";




export interface NotificationUpdate {
    _id?: string;
    notificationType?: NotificationType;
    notificationStatus?: NotificationStatus;
    notificationGroup?: NotificationGroup;
    authorId?: string;
    receiverId?: string;
    carId?: string;
    articleId?: string;
    commentId?: string;
}