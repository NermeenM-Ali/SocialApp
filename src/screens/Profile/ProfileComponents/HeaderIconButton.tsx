import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../../../assets/colors'
import { verticalScale, scale } from '../../../utils/Scaling'

interface HeaderIconButtonProps {
    onPress: () => void,
    children: any
    isBackBtn?: boolean
}
const HeaderIconButton = (props: HeaderIconButtonProps) => {
    let { children, onPress, isBackBtn } = props
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => onPress()} style={isBackBtn ? styles.backButton : styles.editProfileContainer}>
            {children}
        </TouchableOpacity>
    )
}

export default React.memo(HeaderIconButton)

const styles = StyleSheet.create({
    editProfileContainer: {
        position: 'absolute',
        top: verticalScale(20),
        right: scale(10),
        width: 50,
        height: 50,
        backgroundColor: colors.MAIN_COLOR,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: scale(1),
        borderColor: colors.SHADOW_COLOR
    },
    backButton: {
        position: 'absolute',
        top: verticalScale(20),
        left: scale(15),
        width: 40,
        height: 40,
        backgroundColor: colors.MAIN_COLOR,
        elevation: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: scale(1),
        borderColor: colors.SHADOW_COLOR,
        zIndex: 5
    }
})
