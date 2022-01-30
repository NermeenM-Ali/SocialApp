import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import colors from '../../../assets/colors'
import Fonts from '../../../assets/Fonts'
import { moderateScale, scale, verticalScale } from '../../../utils/Scaling'
import moment from 'moment'
import PogressiveImage from '../../../components/PogressiveImage'
import { BottomTabStacks } from '../../../navigation/navConfigrations'
import { Navigation } from 'react-native-navigation'
import { changeUsersSliceProps } from '../../../redux/slices/UsersSlice'


interface IPost {
    id: any
    userName: string,
    userId: any
    userImg: string
    postTime: any,
    post: string
    postImg: string | null,
    likes: any,
    comments: any,
    liked: boolean
}
interface PostItemProps {
    item: IPost
    currentUserID: string
    isInProfile?: boolean
    getPostId: (postId: string) => any
}
const PostItem = (props: PostItemProps) => {
    const dispatch = useDispatch()
    let { item, getPostId, isInProfile = false, currentUserID } = props
    let { id, userName, userImg, post, postImg, postTime, userId } = item

    const handlePress = () => {
        if (!isInProfile) {
            dispatch(changeUsersSliceProps({ props: 'isUserProfileLoading', value: true }))
            Navigation.push(BottomTabStacks.POSTS_STACK, { component: { name: 'ProfileScreen', passProps: { userId } } })
        }
    }

    return (
        <View style={styles.postConatiner}>
            <TouchableOpacity activeOpacity={isInProfile ? 1 : 0.8} onPress={handlePress} style={styles.userContainer}>
                <View style={styles.imgContainer}>
                    <Image source={userImg ? { uri: userImg } : require('../../../assets/images/noImg.png')} resizeMode='stretch' style={styles.img} />
                </View>
                <View style={{ marginLeft: scale(15) }}>
                    <Text style={styles.userName}>{userName ? userName : 'userName'}</Text>
                    <Text style={styles.postTime}>{moment(postTime.toDate()).fromNow()}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.separator} />
            <View style={styles.postDataConatiner}>
                <Text style={styles.postTxt}>{post}</Text>
            </View>
            {postImg ? (<PogressiveImage defaultImageSource={require('../../../assets/images/noImg.png')} imageSource={postImg} style={styles.postImgContainer} />) : (<View style={{ width: 0, height: 0 }} />)}
            {
                (currentUserID === userId) && (
                    <TouchableOpacity activeOpacity={0.8} style={styles.deleteBtn} onPress={() => getPostId(id)}>
                        <EvilIcons name='trash' style={styles.deleteIcon} />
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

export default React.memo(PostItem)

const styles = StyleSheet.create({
    postConatiner: {
        width: scale(380),
        marginTop: verticalScale(15),
        paddingTop: verticalScale(10),
        backgroundColor: colors.WHITE_COLOR,
        alignSelf: 'center',
        borderRadius: moderateScale(2),
        elevation: 1,
        marginVertical: verticalScale(1),
        borderColor: colors.SECONDARY_COLOR,
        borderWidth: scale(0.3),
        overflow: 'hidden'
    },
    userContainer: {
        width: '100%',
        paddingVertical: verticalScale(5),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: scale(20)
    },
    img: {
        width: '100%',
        height: '100%',
    },
    imgContainer: {
        width: scale(40),
        height: scale(40),
        borderRadius: scale(40) / 2,
        borderColor: colors.SECONDARY_COLOR,
        borderWidth: scale(1),
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    userName: {
        fontSize: moderateScale(16),
        fontFamily: Fonts.BOLD_FONT,
    },
    postTime: {
        fontSize: moderateScale(11),
        fontFamily: Fonts.REGULAR_FONT,
        color: colors.GRAY_COLOR,
        marginTop: verticalScale(5)
    },
    separator: {
        width: '90%',
        height: verticalScale(1.5),
        backgroundColor: colors.LIGHTGRAY_COLOR,
        alignSelf: 'center',
    },
    postDataConatiner: {
        width: '93%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: verticalScale(15)
    },
    postTxt: {
        fontSize: moderateScale(15),
        fontFamily: Fonts.REGULAR_FONT,
        textAlign: 'left'
    },
    postImgContainer: {
        width: '100%',
        height: verticalScale(200),
        overflow: 'hidden',
    },
    deleteBtn: {
        position: 'absolute',
        top: verticalScale(5),
        right: scale(5),
        width: scale(30),
        height: verticalScale(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteIcon: {
        fontSize: moderateScale(28),
        color: colors.RED_COLOR
    }
})
