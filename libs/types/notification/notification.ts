import { NotificationGroup, NotificationStatus, NotificationType } from "../../enums/notification.enum";
import { Member, TotalCounter } from "../member/member";
import { Car } from "../car/car";
import { Article } from "../article/article";



export interface Notificate {
    _id: string;
    notificationType: NotificationType;
    notificationStatus: NotificationStatus;
    notificationGroup: NotificationGroup;
    authorId: string;
    receiverId?: string;
    carId?: string;
    articleId?: string;
    commentId?: string;
    creatorData?: Member;
    carData?: Car;
    articleData?: Article;
    commentData?: Comment;
    createdAt: Date;
    updatedAt: Date;
};

export interface Notificates {
    list: Notification[];
    metaCounter: TotalCounter[];
}