import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import { NextPage } from 'next';
import Review from '../../libs/components/car/Review';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import { REACT_APP_API_URL } from '../../libs/config';
import { userVar } from '../../apollo/store';
import { CommentInput, CommentsInquiry } from '../../libs/types/comment/comment.input';
import { Comment } from '../../libs/types/comment/comment';
import { CommentGroup } from '../../libs/enums/comment.enum';
import { Pagination as MuiPagination } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import 'swiper/css';
import 'swiper/css/pagination';
import { GET_COMMENTS, GET_PRODUCT, GET_PRODUCTS } from '../../apollo/user/query';
import { CREATE_COMMENT } from '../../apollo/user/mutation';
import { T } from '../../libs/types/common';
import { Direction, Message } from '../../libs/enums/common.enum';
import { sweetErrorHandling } from '../../libs/sweetAlert';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Product } from '../../libs/types/product/product';
import ProductCard from '../../libs/components/shop/ProductCard';
import { useTranslation } from 'next-i18next';





SwiperCore.use([Autoplay, Navigation, Pagination]);

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

const ProductDetail: NextPage = ({ initialComment, ...props }: any) => {
    const device = useDeviceDetect();
    const router = useRouter();
    const { t, i18n } = useTranslation('common');
    const user = useReactiveVar(userVar);
    const [productId, setProductId] = useState<string | null>(null);
    const [product, setProduct] = useState<Product | null>(null);
    const [slideImage, setSlideImage] = useState<string>('');
    const [destinationProducts, setDestinationProducts] = useState<Product[]>([]);
    const [commentInquiry, setCommentInquiry] = useState<CommentsInquiry>(initialComment);
    const [productComments, setProductComments] = useState<Comment[]>([]);
    const [commentTotal, setCommentTotal] = useState<number>(0);
    const [insertCommentData, setInsertCommentData] = useState<CommentInput>({
        commentGroup: CommentGroup.PRODUCT,
        commentContent: '',
        commentRefId: '',
    });

    /** APOLLO REQUESTS **/
    const [createComment] = useMutation(CREATE_COMMENT);
    const {
        loading: getProductLoading,
        data: getProductData,
        error: getProductError,
        refetch: getProductRefetch
    } = useQuery(GET_PRODUCT, {
        fetchPolicy: 'network-only',
        variables: { input: productId },
        skip: !productId,
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            console.log("data", data);

            if (data?.getProduct) setProduct(data?.getProduct);
            if (data?.getProduct) setSlideImage(data?.getProduct?.productImages?.[0]);
        },
    });

    const {
        loading: getProductsLoading,
        data: getProductsData,
        error: getProductsError,
        refetch: getProductsRefetch
    } = useQuery(GET_PRODUCTS, {
        fetchPolicy: 'cache-and-network',
        variables: {
            input: {
                page: 1,
                limit: 4,
                sort: 'createdAt',
                direction: Direction.DESC,
                search: {
                    typeList: product?.productType ? [product?.productType] : [],
                }
            }
        },
        skip: !productId && !product,
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            if (data?.getProducts) setDestinationProducts(data?.getProducts?.list);
        },
    });

    const {
        loading: getCommentsLoading,
        data: getCommentsData,
        error: getCommentsError,
        refetch: getCommentsRefetch
    } = useQuery(GET_COMMENTS, {
        fetchPolicy: 'cache-and-network',
        variables: { input: initialComment },
        skip: !commentInquiry.search.commentRefId,
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            if (data?.getComments?.list) setProductComments(data?.getComments?.list);
            setCommentTotal(data?.getComments?.metaCounter[0]?.total ?? 0);
        },
    });

    /** LIFECYCLES **/
    useEffect(() => {
        if (router.query.id) {
            setProductId(router.query.id as string);
            setCommentInquiry({
                ...commentInquiry,
                search: {
                    commentRefId: router.query.id as string,
                },
            });
            setInsertCommentData({
                ...insertCommentData,
                commentRefId: router.query.id as string,
            });
        }
    }, [router]);

    useEffect(() => {
        if (commentInquiry.search.commentRefId) {
            getCommentsRefetch({ input: commentInquiry });
        }
    }, [commentInquiry]);

    /** HANDLERS **/
    const changeImageHandler = (image: string) => {
        setSlideImage(image);
    };

    const commentPaginationChangeHandler = async (event: ChangeEvent<unknown>, value: number) => {
        commentInquiry.page = value;
        setCommentInquiry({ ...commentInquiry });
    };

    const createCommentHandler = async () => {
        try {
            if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
            await createComment({ variables: { input: insertCommentData } });

            setInsertCommentData({ ...insertCommentData, commentContent: '' });

            await getCommentsRefetch({ input: commentInquiry });
        } catch (err: any) {
            await sweetErrorHandling(err);
        }
    };


    if (getProductLoading) {
        return (
            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '1080px' }}>
                <CircularProgress size={'4rem'} />
            </Stack>
        );
    };

    if (device === 'mobile') {
        return <div>PRODUCT DETAIL PAGE</div>;
    } else {
        return (
            <div id={'shop-detail-page'}>
                <div className={'container'}>
                    <Stack className={'property-detail-config'}>
                        <Stack className={'property-info-config'}>
                            <Stack className={'images'}>
                                <Stack className={'main-image'}>
                                    <Stack className={'sub-images'}>
                                        {Array.isArray(product?.productImages) && product?.productImages?.map((subImg: string) => {
                                            const imagePath: string = `${REACT_APP_API_URL}/${subImg}`;
                                            return (
                                                <Stack className={'sub-img-box'} onClick={() => changeImageHandler(subImg)} key={subImg}>
                                                    <img src={imagePath} alt={'sub-image'} />
                                                </Stack>
                                            );
                                        })}
                                    </Stack>
                                    <Stack className={'main'}>
                                        <img
                                            src={slideImage ? `${REACT_APP_API_URL}/${product?.productImages?.[0]}` : ''}
                                            alt={'main-image'}
                                        />
                                    </Stack>
                                </Stack>
                                <Stack className={'right-frame'}>
                                    <Stack className={'right-config'}>
                                        <Stack className={'text'}>
                                            <Typography className={'main-title'}>{t('Title')}: {product?.productTitle}</Typography>
                                        </Stack>
                                        <Stack className={'info-box'}>
                                            <Typography className={'title'}>{t('Price')}: ${product?.productPrice}</Typography>
                                        </Stack>
                                        <Stack className={'info-box'}>
                                            <Typography className={'title'}>{t('Catergory')}: {product?.productType}</Typography>
                                        </Stack>
                                        <Stack className={'info-box'}>
                                            <Typography className={'sub-title'}>
                                                {product?.productShortDesc}
                                            </Typography>
                                        </Stack>
                                        <Stack className={'info'}>
                                            <Box className={'box'}>
                                                {product?.productQuantity}
                                            </Box>
                                            <Button className={'add'}>
                                                <ShoppingCartOutlinedIcon className={'icon'} />
                                                {t('Add To Card')}
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack className={'property-desc-config'}>
                            <Stack className={'right-frame'}>
                                <Box className={'top'}>
                                    <Typography className={'main'}>{t('Description')}</Typography>
                                    <div className={'div-m'}></div>
                                    <Typography className={'second'}>{t('Reviews')}</Typography>
                                    <div></div>
                                </Box>
                                <Box className={'top'}>
                                    <Typography className={'second'}>{t('Description')}</Typography>
                                    <div ></div>
                                    <Typography className={'main'}>{t('Reviews')}</Typography>
                                    <div className={'div-m'}></div>
                                </Box>
                            </Stack>
                            <Stack className={'left-config'}>
                                <Stack className={'prop-desc-config'}>
                                    <Stack className={'top'}>
                                        <Typography className={'title'}>{t('Product Description')}</Typography>
                                    </Stack>
                                    <Stack className={'bottom'}>
                                        <Typography className={'data'}>
                                            {product?.productDesc}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                {commentTotal !== 0 && (
                                    <Stack className={'reviews-config'}>
                                        <Stack className={'filter-box'}>
                                            <Stack className={'review-cnt'}>
                                                <Typography className={'reviews'}>{commentTotal} {t('Comments')}</Typography>
                                            </Stack>
                                        </Stack>
                                        <Stack className={'review-list'}>
                                            {productComments?.map((comment: Comment) => {
                                                return <Review comment={comment} key={comment?._id} />;
                                            })}
                                            <Box component={'div'} className={'pagination-box'}>
                                                <MuiPagination
                                                    page={commentInquiry.page}
                                                    count={Math.ceil(commentTotal / commentInquiry.limit)}
                                                    onChange={commentPaginationChangeHandler}
                                                    shape="rounded"
                                                    color="secondary"
                                                />
                                            </Box>
                                        </Stack>
                                    </Stack>
                                )}
                                <Stack className={'leave-review-config'}>
                                    <Typography className={'main-title'}>{t('Leave A Review')}</Typography>
                                    <Typography className={'review-title'}>{t('Review')}</Typography>
                                    <textarea
                                        onChange={({ target: { value } }: any) => {
                                            setInsertCommentData({ ...insertCommentData, commentContent: value });
                                        }}
                                        value={insertCommentData.commentContent}
                                    ></textarea>
                                    <Box className={'submit-btn'} component={'div'}>
                                        <Button
                                            className={'submit-review'}
                                            disabled={insertCommentData.commentContent === '' || user?._id === ''}
                                            onClick={createCommentHandler}
                                        >
                                            <Typography className={'title'}>{t('Comment Post')}</Typography>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                <g clipPath="url(#clip0_6975_3642)">
                                                    <path
                                                        d="M16.1571 0.5H6.37936C6.1337 0.5 5.93491 0.698792 5.93491 0.944458C5.93491 1.19012 6.1337 1.38892 6.37936 1.38892H15.0842L0.731781 15.7413C0.558156 15.915 0.558156 16.1962 0.731781 16.3698C0.818573 16.4566 0.932323 16.5 1.04603 16.5C1.15974 16.5 1.27345 16.4566 1.36028 16.3698L15.7127 2.01737V10.7222C15.7127 10.9679 15.9115 11.1667 16.1572 11.1667C16.4028 11.1667 16.6016 10.9679 16.6016 10.7222V0.944458C16.6016 0.698792 16.4028 0.5 16.1571 0.5Z"
                                                        fill="#181A20"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_6975_3642">
                                                        <rect width="16" height="16" fill="white" transform="translate(0.601562 0.5)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </Button>
                                    </Box>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </div>
            </div>
        );
    }
};

ProductDetail.defaultProps = {
    initialComment: {
        page: 1,
        limit: 5,
        sort: 'createdAt',
        direction: 'DESC',
        search: {
            commentRefId: '',
        },
    },
};

export default withLayoutBasic(ProductDetail);