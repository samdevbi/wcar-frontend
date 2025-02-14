import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const UPDATE_MEMBER_BY_ADMIN = gql`
mutation UpdateMemberByAdmin($input: MemberUpdate!) {
    updateMemberByAdmin(input: $input) {
        _id
        type
        status
        authType
        titleNick
        fullName
        image
        viewImage
        address
        shortDesc
        longDesc
        phone
        phone2
        email
        kakaoTalk
        youtube
        instagram
        facebook
        tikTok
        naverBlog
        xcom
        followers
        followings
        likes
        views
        comments
        warnings
        articles
        blocks
        memberCars
        usedCars
        newCars
        rank
        points
        sellerProducts
        dealerFinancing
        dealerCarService
        dealerTradeIn
        dealerCustomization
        dealerWarranties
        dealerParts
        dealerAccessories
        dealerCarDetailing
        dealerCarWash
        dealerCarTestDrive
        dealerCarDelivery
        carOilChange
        carAlignment
        carTireChange
        carBrakeCheck
        carBatteryCheck
        carTireBalance
        carSuspension
        carAirCondition
        carTransmissionCheck
        carEngineDiagnostic
        carExhaust
        carDetailing
        carWindshield
        carTimingBelt
        carChainReplacement
        comfort
        performance
        exterior
        interior
        reliability
        fast
        openAt
        closeAt
        openSunday
        closeSunday
        openSaturday
        closeSaturday
        publicHolidays
        deletedAt
        createdAt
        updatedAt
        accessToken
    }
}
`;

/**************************
 *        PROPERTY        *
 *************************/

export const UPDATE_CAR_BY_ADMIN = gql`
mutation UpdateCarByAdmin($input: CarUpdate!) {
    updateCarByAdmin(input: $input) {
        _id
        carType
        carTitle
        carBody
        carStatus
        carGroup
        carMadeIn
        carBrand
        carModel
        carPrice
        carImages
        carVideo
        carLocation
        carAddress
        carDesc
        carBarter
        carRent
        carYear
        carMileage
        carFuelType
        carDriveType
        carTransmission
        carEngineSize
        carColor
        carFullFuel
        carMpgHw
        carMpgCity
        carDoor
        carCylinders
        carMaxSpeed
        carHundredSpeed
        carHorsePower
        carTorque
        carLength
        carHeigth
        carWidth
        carSeatsUp
        carWeigth
        carLoadWeight
        carTireSize
        carWheelBase
        carAutoBrake
        carCruiseControl
        carESC
        carAutonomuosDrive
        carExteriorLight
        carPanoramicSunroof
        carHeatedSeats
        carCooledSeats
        carTouchscreenDisplay
        carAutoHeadLight
        carStarStop
        carNoiseCancellation
        carRemoteKeyless
        carLaneDW
        carBlindSpotMonitoring
        carRearCrossTrafficAlert
        carApplePlay
        carAndroidAuto
        carVoiceControl
        carBluetoothConnectivity
        carWirelessCharging
        carParkingAssist
        carSurroundViewCamera
        carFrontSensors
        carRearSensors
        carFrontRecordCamera
        carRearRecordCamera
        carHeadsUpDisplay
        carClimateControl
        carAdjustableSeats
        carMemorySeats
        carPowerTrain
        carRegenerativeBraking
        carTractionControl
        carStabilityControl
        carHillStartAssist
        carTirePressureSystem
        carPushButton
        carCrush
        carRepair
        carFrontBumper
        carBackBumper
        carBonnet
        carTailgate
        carRightFrontWing
        carLeftFrontWing
        carRightBackWing
        carLeftBackWing
        carRoof
        carRightFrontDoor
        carLeftFrontDoor
        carRightBackDoor
        carLeftBackDoor
        carViews
        carLikes
        carSave
        carComments
        carRank
        memberId
        soldAt
        deletedAt
        createdAt
        updatedAt
    }
}
`;

export const REMOVE_CAR_BY_ADMIN = gql`
mutation RemoveCarByAdmin($input: String!) {
    removeCarByAdmin(carId: $input) {
        _id
        carType
        carTitle
        carBody
        carStatus
        carGroup
        carMadeIn
        carBrand
        carModel
        carPrice
        carImages
        carVideo
        carLocation
        carAddress
        carDesc
        carBarter
        carRent
        carYear
        carMileage
        carFuelType
        carDriveType
        carTransmission
        carEngineSize
        carColor
        carFullFuel
        carMpgHw
        carMpgCity
        carDoor
        carCylinders
        carMaxSpeed
        carHundredSpeed
        carHorsePower
        carTorque
        carLength
        carHeigth
        carWidth
        carSeatsUp
        carWeigth
        carLoadWeight
        carTireSize
        carWheelBase
        carAutoBrake
        carCruiseControl
        carESC
        carAutonomuosDrive
        carExteriorLight
        carPanoramicSunroof
        carHeatedSeats
        carCooledSeats
        carTouchscreenDisplay
        carAutoHeadLight
        carStarStop
        carNoiseCancellation
        carRemoteKeyless
        carLaneDW
        carBlindSpotMonitoring
        carRearCrossTrafficAlert
        carApplePlay
        carAndroidAuto
        carVoiceControl
        carBluetoothConnectivity
        carWirelessCharging
        carParkingAssist
        carSurroundViewCamera
        carFrontSensors
        carRearSensors
        carFrontRecordCamera
        carRearRecordCamera
        carHeadsUpDisplay
        carClimateControl
        carAdjustableSeats
        carMemorySeats
        carPowerTrain
        carRegenerativeBraking
        carTractionControl
        carStabilityControl
        carHillStartAssist
        carTirePressureSystem
        carPushButton
        carCrush
        carRepair
        carFrontBumper
        carBackBumper
        carBonnet
        carTailgate
        carRightFrontWing
        carLeftFrontWing
        carRightBackWing
        carLeftBackWing
        carRoof
        carRightFrontDoor
        carLeftFrontDoor
        carRightBackDoor
        carLeftBackDoor
        carViews
        carLikes
        carSave
        carComments
        carRank
        memberId
        soldAt
        deletedAt
        createdAt
        updatedAt
    }
}
`;

export const UPDATE_PRODUCT_BY_ADMIN = gql`
mutation UpdateProductByAdmin($input: ProductUpdate!) {
    updateProductByAdmin(input: $input) {
        _id
        productType
        productStatus
        productTitle
        productPrice
        productQuantity
        productImages
        productShortDesc
        productDesc
        productViews
        productLikes
        productSave
        productComments
        productRank
        memberId
        deletedAt
        createdAt
        updatedAt
    }
}
`;

export const REMOVE_PRODUCT_BY_ADMIN = gql`
mutation RemoveProductByAdmin($input: String!) {
    removeProductByAdmin(productId: $input) {
        _id
        productType
        productStatus
        productTitle
        productPrice
        productQuantity
        productImages
        productShortDesc
        productDesc
        productViews
        productLikes
        productSave
        productComments
        productRank
        memberId
        deletedAt
        createdAt
        updatedAt
    }
}
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const UPDATE_BOARD_ARTICLE_BY_ADMIN = gql`
	mutation UpdateBoardArticleByAdmin($input: BoardArticleUpdate!) {
		updateBoardArticleByAdmin(input: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const REMOVE_BOARD_ARTICLE_BY_ADMIN = gql`
	mutation RemoveBoardArticleByAdmin($input: String!) {
		removeBoardArticleByAdmin(articleId: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			memberId
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *         COMMENT        *
 *************************/

export const REMOVE_COMMENT_BY_ADMIN = gql`
	mutation RemoveCommentByAdmin($input: String!) {
		removeCommentByAdmin(commentId: $input) {
			_id
			commentStatus
			commentGroup
			commentContent
			commentRefId
			memberId
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *         NOTICE        *
 *************************/

export const CREATE_NOTICE = gql`
mutation CreateNotice($input: NoticeInput!) {
    createNotice(input: $input) {
        _id
        noticeCategory
        noticeStatus
        noticeGroup
        noticeTitle
        noticeContent
        memberId
    }
}`;

export const UPDATE_NOTICE = gql`
mutation UpdateNotice($input: NoticeUpdate!) {
    updateNotice(input: $input) {
        _id
        noticeCategory
        noticeStatus
        noticeGroup
        noticeTitle
        noticeContent
        memberId
    }
}
`;
