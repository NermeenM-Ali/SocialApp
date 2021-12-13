import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { useDispatch } from 'react-redux'
import colors from '../../../assets/colors'
import Fonts from '../../../assets/Fonts'
import { getChatMessages } from '../../../redux/actions/ChatAction'
import { moderateScale, scale, verticalScale } from '../../../utils/Scaling'

export interface IChatItem {
    userBio: string,
    userCoverImg: string,
    userId: string,
    userImg: string,
    userName: string
    lastMsg?: string
    lastMsgSendAt?: string
}
interface ChatItemProps {
    item: IChatItem
    componentId: string
}
const ChatItem = (props: ChatItemProps) => {
    const dispatch = useDispatch()
    const { componentId, item } = props
    const { userImg, userName, userId, lastMsg, lastMsgSendAt } = item
    return (
        <TouchableOpacity activeOpacity={0.9} style={styles.container} onPress={() => {
            dispatch(getChatMessages(userId))
            Navigation.push(componentId, { component: { name: 'ChatMessagesScreen', passProps: { SelectedChatItem: item }, options: { bottomTabs: { visible: false } } } })
        }}>
            <View style={styles.imgContainer}>
                <Image source={userImg ? { uri: userImg } : require('../../../assets/images/noImg.png')} resizeMode='stretch' style={styles.img} />
            </View>
            <View style={styles.infoContainer}>
                <Text numberOfLines={1} style={styles.userName}>{userName ? userName : 'userName'}</Text>
                {lastMsg ? <Text numberOfLines={1} style={styles.lastMsg}>{lastMsg}</Text> : null}

            </View>
            <View style={styles.arrowContainer}  >
                {/* <AntDesign name='right' size={15} color={colors.MAIN_COLOR} /> */}
                {lastMsgSendAt ? <Text style={styles.msgTime}>{lastMsgSendAt}</Text> : null}
            </View>
        </TouchableOpacity>
    )
}

export default ChatItem

const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: verticalScale(90),
        alignSelf: 'center',
        backgroundColor: colors.WHITE_COLOR,
        borderBottomWidth: scale(2),
        borderBottomColor: colors.SHADOW_COLOR,
        marginVertical: verticalScale(5),
        borderRadius: moderateScale(5),
        alignItems: 'center',
        paddingHorizontal: scale(15),
        flexDirection: 'row',
    },
    imgContainer: {
        width: scale(50),
        height: scale(50),
        borderRadius: scale(50) / 2,
        borderColor: colors.SECONDARY_COLOR,
        borderWidth: scale(1),
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    img: {
        width: '100%',
        height: '100%',
    },
    userName: {
        fontSize: moderateScale(16),
        fontFamily: Fonts.BOLD_FONT,
        maxWidth: scale(200)
    },
    lastMsg: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.REGULAR_FONT,
        maxWidth: scale(200),
        marginTop: verticalScale(10),
        color: colors.GRAY_COLOR,
    },
    infoContainer: {
        paddingLeft: scale(10)
    },
    arrowContainer: {
        position: 'absolute',
        right: scale(0),
        alignSelf: 'center',
        top: verticalScale(35),
        justifyContent: 'center',
        alignItems: 'center'
    },
    msgTime: {
        fontSize: moderateScale(10),
        fontFamily: Fonts.BOLD_FONT,
        color: colors.MAIN_COLOR,
        marginTop: verticalScale(10),
        marginRight: scale(12)
    },
})
