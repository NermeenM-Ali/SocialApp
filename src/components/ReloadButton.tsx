import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import colors from '../assets/colors';
import fonts from '../assets/Fonts';
import Strings from '../assets/strings';
import { scale, verticalScale } from '../utils/Scaling';

interface ReloadButtonProps {
    onPress: () => void
}
const ReloadButton = (props: ReloadButtonProps) => {
    let { onPress } = props
    const dispatch = useDispatch()
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => dispatch(onPress())}
            style={[styles.reloadBtn]}>
            <Text style={styles.reloadTxt} >{Strings.reload}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    reloadBtn: {
        height: verticalScale(45),
        width: scale(150),
        backgroundColor: colors.BLACK_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
    },
    reloadTxt: {
        color: colors.WHITE_COLOR,
        fontFamily: fonts.REGULAR_FONT
    }
})
export default React.memo(ReloadButton)