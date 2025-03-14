import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const GET_ALL_MEMBERS_BY_ADMIN = gql`
query GetAllMembersByAdmin($input: MembersInquiry!) {
    getAllMembersByAdmin(input: $input) {
        metaCounter {
            total
        }
        list {
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
}
`;

/**************************
 *        PROPERTY        *
 *************************/

export const GET_ALL_CARS_BY_ADMIN = gql`
query GetAllCarsByAdmin($input: AllCarsInquiry!) {
    getAllCarsByAdmin(input: $input) {
        metaCounter {
            total
        }
        list {
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
}
`;

export const GET_ALL_PRODUCTS_BY_ADMIN = gql`
query GetAllProductsByAdmin($input: AllProductsInquiry!) {
    getAllProductsByAdmin(input: $input) {
        metaCounter {
            total
        }
        list {
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
            creatorData {
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
    }
}
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const GET_ALL_BOARD_ARTICLES_BY_ADMIN = gql`
	query GetAllArticlesByAdmin($input: AllArticlesInquiry!) {
    getAllArticlesByAdmin(input: $input) {
        list {
            _id
            articleCategory
            articleStatus
            articleTitle
            articleContent
            articleImage
            articleViews
            articleLikes
            articleComments
            memberId
            createdAt
            updatedAt
        }
        metaCounter {
            total
        }
    }
}
`;

/**************************
 *         COMMENT        *
 *************************/

export const GET_COMMENTS = gql`
	query GetComments($input: CommentsInquiry!) {
		getComments(input: $input) {
			list {
				_id
				commentStatus
				commentGroup
				commentContent
				commentRefId
				memberId
				createdAt
				updatedAt
				memberData {
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
			metaCounter {
				total
			}
		}
	}
`;

/**************************
 *         NOTICE        *
 *************************/


export const GET_NOTICE = gql`
query GetNotice($input: String!) {
    getNotice(input: $input) {
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

export const GET_NOTICES = gql`
query GetNotices($input: NoticesInquiry!) {
    getNotices(input: $input) {
        metaCounter {
            total
        }
        list {
            _id
            noticeCategory
            noticeStatus
            noticeGroup
            noticeTitle
            noticeContent
            memberId
        }
    }
}
`;
