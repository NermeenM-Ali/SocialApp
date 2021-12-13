import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import colors from '../assets/colors'
import { scale, verticalScale, moderateScale } from '../utils/Scaling'

interface CustomAddButtonProps {
    onPress: () => void
    btnTxt: string
    isForPosts?: boolean
}
const CustomAddButton = (props: CustomAddButtonProps) => {
    let { onPress, btnTxt, isForPosts = true } = props
    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.addBtn} onPress={onPress}>
            {isForPosts ? <MaterialIcons name={'post-add'} style={styles.addIcon} /> :
                <MaterialCommunityIcons name={'chat-plus'} style={styles.addIcon} />}
            <Text style={styles.addText}>{btnTxt}</Text>
        </TouchableOpacity>
    )
}

export default React.memo(CustomAddButton)

const styles = StyleSheet.create({
    addBtn: {
        paddingHorizontal: scale(12),
        height: verticalScale(50),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.MAIN_COLOR,
        borderRadius: moderateScale(5),
        flexDirection: 'row',
        position: 'absolute',
        right: scale(17),
        bottom: verticalScale(20)
    },
    addIcon: {
        fontSize: moderateScale(20),
        color: colors.WHITE_COLOR,
        alignSelf: 'center',
        marginBottom: verticalScale(2),
        marginHorizontal: scale(5)
    },
    addText: {
        fontSize: moderateScale(14),
        color: colors.WHITE_COLOR,
        alignSelf: 'center'
    },
})
