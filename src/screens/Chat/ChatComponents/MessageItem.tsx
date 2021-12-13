import React from 'react'
import { I18nManager, Image, StyleSheet, Text, View } from 'react-native'
import colors from '../../../assets/colors'
import Fonts from '../../../assets/Fonts'
import { moderateScale, scale, verticalScale } from '../../../utils/Scaling'

interface IMsg {
    userId: string
    userName: string
    userImg: string
    lastMsg: string
    createdAt: string
}

interface MessageItemProps {
    item: IMsg
    currentUserID: string
}
const MessageItem = (props: MessageItemProps) => {
    let { currentUserID, item } = props
    let { lastMsg, userId, userImg, createdAt } = item
    let isMyMsg: boolean = userId === currentUserID
    return (
        <View style={isMyMsg ? { flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse' } : { flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }}>
            <Image source={userImg ? { uri: userImg } : require('../../../assets/images/noImg.png')} style={styles.msgUserImage} />

            <View style={[styles.msg, isMyMsg ? styles.send : styles.receive]}>
                <Text style={[styles.msgTxt, { color: isMyMsg ? colors.MAIN_COLOR : colors.SHADOW_COLOR }]}>{lastMsg}</Text>
                <Text style={[styles.msgTime, isMyMsg ? { textAlign: I18nManager.isRTL ? 'left' : 'right' } :
                    { textAlign: I18nManager.isRTL ? 'right' : 'left' }]}>{createdAt}</Text>
            </View>


        </View>
    )
}

export default MessageItem

const styles = StyleSheet.create({
    msg: {
        marginVertical: verticalScale(15),
        borderBottomEndRadius: scale(5),
        borderBottomStartRadius: scale(5),
        maxWidth: '80%',
        alignSelf: 'baseline',
        paddingVertical: verticalScale(5),
        paddingHorizontal: scale(5),
    },
    receive: {
        borderTopEndRadius: I18nManager.isRTL ? 0 : scale(5),
        borderTopStartRadius: I18nManager.isRTL ? scale(5) : 0,
        backgroundColor: colors.MID_PURPLE,
    },
    send: {
        borderTopStartRadius: I18nManager.isRTL ? 0 : scale(5),
        borderTopEndRadius: I18nManager.isRTL ? scale(5) : 0,
        backgroundColor: colors.SHADOW_COLOR,
    },
    msgUserImage: {
        width: scale(40),
        height: scale(40),
        borderRadius: scale(50),
        marginHorizontal: scale(5),
        borderWidth: scale(1),
        borderColor: colors.SHADOW_COLOR,
    },
    msgTime: {
        fontSize: moderateScale(10),
        fontFamily: Fonts.POPPINS_REGULAR,
        color: colors.BLACK_COLOR
    },
    msgTxt: {
        fontSize: moderateScale(13),
        fontFamily: Fonts.POPPINS_REGULAR,
    }
})
