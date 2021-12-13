import React from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native'
import { Navigation } from 'react-native-navigation'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch } from 'react-redux'
import colors from '../../../assets/colors'
import Fonts from '../../../assets/Fonts'
import { refreshAllUsersIChatWith } from '../../../redux/actions/UsersAction'
import { verticalScale, moderateScale, scale } from '../../../utils/Scaling'
import { IChatItem } from './ChatItem'

interface ChatHeaderProps {
    headerData: IChatItem
    componentId: string
}
const ChatHeader = (props: ChatHeaderProps) => {
    const dispatch = useDispatch()
    let { headerData, componentId } = props
    let { userImg, userName } = headerData

    const handleBackButton = () => {
        dispatch(refreshAllUsersIChatWith())
        Navigation.pop(componentId!)
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor={colors.MAIN_COLOR} />
            <View style={styles.arrowImgContainer}>
                <TouchableOpacity style={styles.backButton} activeOpacity={0.8} onPress={handleBackButton}>
                    <AntDesign name='left' size={18} color={colors.WHITE_COLOR} />
                </TouchableOpacity>
                <View style={styles.imgContainer}>
                    <Image source={userImg ? { uri: userImg } : require('../../../assets/images/noImg.png')} resizeMode='stretch' style={styles.img} />
                </View>
            </View>
            <Text numberOfLines={1} style={styles.headerTitle}>{userName}</Text>
        </View>
    )
}

export default React.memo(ChatHeader)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: verticalScale(75),
        backgroundColor: colors.MAIN_COLOR,
        justifyContent: 'flex-start',
        alignItems: 'center',
        elevation: 5,
        paddingHorizontal: scale(5),
        flexDirection: 'row'
    },
    arrowImgContainer: {
        flexDirection: 'row'
    },
    headerTitle: {
        fontFamily: Fonts.BOLD_FONT,
        fontSize: moderateScale(16),
        color: colors.WHITE_COLOR,
        marginHorizontal: scale(10),
        maxWidth: scale(220)
    },
    backButton: {
        alignSelf: 'center',
        marginHorizontal: scale(10)
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
    img: {
        width: '100%',
        height: '100%',
    },
})
