import React from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch } from 'react-redux'
import colors from '../assets/colors'
import Fonts from '../assets/Fonts'
import { LogOutUser } from '../redux/actions/AuthActions'
import { moderateScale, scale, verticalScale } from '../utils/Scaling'

interface IHeaderProps {
    headerTitle: string,
    hasBackButton?: boolean
    componentId?: string
}
const Header = (props: IHeaderProps) => {
    let { headerTitle, hasBackButton = false, componentId } = props
    const dispatch = useDispatch()
    const handleLogOut = () => dispatch(LogOutUser())
    const handleBackButton = () => Navigation.pop(componentId!)

    return (
        <View style={styles.headerContainer}>
            <StatusBar barStyle='light-content' backgroundColor={colors.MAIN_COLOR} />
            <Text style={styles.headerTitle}>{headerTitle}</Text>
            {hasBackButton ?
                <TouchableOpacity style={styles.logOutButton} activeOpacity={0.8} onPress={handleBackButton}>
                    <AntDesign name='left' size={22} color={colors.WHITE_COLOR} />
                </TouchableOpacity>
                : <TouchableOpacity style={styles.logOutButton} activeOpacity={0.8} onPress={handleLogOut}>
                    <AntDesign name='logout' size={25} color={colors.WHITE_COLOR} style={{ transform: [{ rotateY: '180deg' }] }} />
                </TouchableOpacity>}
        </View>
    )
}

export default React.memo(Header)

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        height: verticalScale(75),
        backgroundColor: colors.MAIN_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        flexDirection: 'row'
    },
    headerTitle: {
        fontFamily: Fonts.BOLD_FONT,
        fontSize: moderateScale(22),
        color: colors.WHITE_COLOR
    },
    logOutButton: {
        position: 'absolute',
        left: scale(20)
    }
})
