import React, { useCallback, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Navigation } from 'react-native-navigation'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import colors from '../../assets/colors'
import Fonts from '../../assets/Fonts'
import Strings from '../../assets/strings'
import PostUISkeleton from '../../components/PostUISkeleton'
import { BottomTabStacks } from '../../navigation/navConfigrations'
import { getUserById } from '../../redux/actions/UsersAction'
import { moderateScale, scale, verticalScale } from '../../utils/Scaling'
import PostItem from '../Posts/PostsComponents/PostItem'
import { PostSelectorFunc, userProfileLoadingFunc, userSelectorFunc } from '../../redux/slices/UsersSlice'
import ProfileUISkeleton from '../../components/ProfileUISkeleton'
import HeaderIconButton from './ProfileComponents/HeaderIconButton'

interface ProfileScreenProps {
    componentId: string,
    userId: string
    fromBottomTab?: boolean
}


const ProfileScreen = (props: ProfileScreenProps) => {
    const { componentId, userId, fromBottomTab = false } = props
    const dispatch = useDispatch()
    const setIsInProfile = useState(false)[1]
    const postSlice = useSelector(PostSelectorFunc, shallowEqual)
    const userProfileData: any = useSelector(userSelectorFunc, shallowEqual)
    const isUserProfileLoading = useSelector(userProfileLoadingFunc)

    useEffect(() => {
        dispatch(getUserById({ userId, fromBottomTab }))
        const listener = {
            componentDidAppear: () => dispatch(getUserById({ userId, fromBottomTab })),
            componentDidDisappear: () => setIsInProfile(false)
        };
        const unsubscribe = Navigation.events().registerComponentListener(listener, componentId);
        return () => { unsubscribe.remove() };
    }, [userId])

    const renderCovermagesSection = () => {
        return (
            <View style={styles.coverImageContainer}>
                {userProfileData?.userCoverImg ?
                    <Image source={{ uri: userProfileData?.userCoverImg }} resizeMode='stretch' style={styles.img} /> :
                    <Image source={require('../../assets/images/noImg.png')} resizeMode='stretch' style={styles.img} />}
                {(!userId) && (<HeaderIconButton onPress={handleUpdateBtn} >
                    <FontAwesome5 name='user-edit' style={styles.editProfileIcon} />
                </HeaderIconButton>)}

                {(userId) && (<HeaderIconButton isBackBtn={true} onPress={handleBackBtn}>
                    <AntDesign name='left' style={styles.backIcon} />
                </HeaderIconButton>)}
            </View>
        )
    }

    const handleBackBtn = useCallback(() => Navigation.pop(componentId), [])
    const handleUpdateBtn = useCallback(() => Navigation.push(BottomTabStacks.PROFILE_STACK, { component: { name: 'UpdateProfileScreen' } }), [])

    const renderProfileImagesSection = () => {
        return (
            <View style={styles.profileImgWrapper}>
                <View style={styles.profileImageContainer}>
                    {userProfileData?.userImg ?
                        <Image source={{ uri: userProfileData?.userImg }} resizeMode='cover' style={styles.img} /> :
                        <Image source={require('../../assets/images/noImg.png')} resizeMode='cover' style={styles.img} />}
                </View>
            </View>
        )
    }


    const renderEmptyView = () => {
        return (
            <View style={styles.emptyView}>
                <Text style={styles.emptyTxt}>{Strings.noPostsYet}</Text>
            </View>
        )
    }

    const renderUserPosts = () => {
        let { postsByUserId, isFetchPostsByUserIDLoading } = postSlice
        return (
            <View style={styles.listStyle}>
                {
                    isFetchPostsByUserIDLoading || isUserProfileLoading ? <PostUISkeleton /> :
                        !postsByUserId.length && !isFetchPostsByUserIDLoading ? renderEmptyView() :
                            postsByUserId?.map((item, index) => (
                                <PostItem key={index.toString()} getPostId={() => { }} currentUserID={userId} isInProfile={true} item={item} />
                            ))
                }
            </View>
        )
    }

    const renderUserNameAndBioSection = () => {
        return (
            <View style={styles.infoSection}>
                <Text style={styles.userName}>{userProfileData?.userName ? userProfileData.userName : Strings.userName}</Text>
                <Text style={styles.userBio}>{userProfileData?.userBio ? userProfileData.userBio : Strings.userBio}</Text>
            </View>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            {isUserProfileLoading ?
                <ProfileUISkeleton /> :
                <>
                    {renderCovermagesSection()}
                    {renderProfileImagesSection()}
                    {renderUserNameAndBioSection()}
                </>
            }
            {renderUserPosts()}
        </ScrollView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE_COLOR
    },
    listStyle: {
        flexGrow: 1,
        zIndex: -10,
        marginTop: verticalScale(20),
        marginBottom: verticalScale(20)
    },
    coverImageContainer: {
        width: '100%',
        alignSelf: 'center',
        height: verticalScale(300),
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: '100%',
        height: '100%',
    },
    editProfileIcon: {
        fontSize: moderateScale(18),
        color: colors.WHITE_COLOR,
        alignSelf: 'center',
        marginLeft: scale(5)
    },
    editProfileContainer: {
        position: 'absolute',
        top: verticalScale(10),
        right: scale(10),
        width: scale(50),
        height: scale(50),
        backgroundColor: colors.MAIN_COLOR,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(50) / 2,
        borderWidth: scale(1),
        borderColor: colors.SHADOW_COLOR
    },
    profileImageContainer: {
        width: scale(200),
        height: scale(200),
        borderRadius: scale(200) / 2,
        overflow: 'hidden',
        borderColor: colors.SHADOW_COLOR,
        borderWidth: scale(4),
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImgWrapper: {
        position: 'absolute',
        top: verticalScale(180),
        right: scale(50),
        width: '60%',
    },
    emptyView: {
        width: '100%',
        height: verticalScale(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyTxt: {
        fontSize: moderateScale(20),
        fontFamily: Fonts.BOLD_FONT,
        color: colors.LIGHTGRAY_COLOR
    },
    infoSection: {
        width: '90%',
        paddingVertical: verticalScale(10),
        alignSelf: 'center',
        zIndex: -10,
        marginTop: 90,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(5),
    },
    userName: {
        fontFamily: Fonts.BOLD_FONT,
        fontSize: moderateScale(24)
    },
    userBio: {
        marginTop: verticalScale(10),
        fontSize: moderateScale(15),
        fontFamily: Fonts.REGULAR_FONT,
        color: colors.GRAY_COLOR
    },
    backIcon: {
        fontSize: moderateScale(18),
        color: colors.SHADOW_COLOR,
        marginRight: scale(3)
    }
})
