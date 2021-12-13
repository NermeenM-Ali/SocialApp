import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { moderateScale, scale, verticalScale } from '../utils/Scaling';
import colors from '../assets/colors';
import ReloadButton from './ReloadButton';
import fonts from '../assets/Fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface EmptyPageProps {
    withReloadBtn?: boolean
    onReload?: () => void
    text: string,
    iconName?: string,
    isForError?: boolean
}

const EmptyPage = (props: EmptyPageProps) => {
    const { onReload, text, iconName = 'error-outline', withReloadBtn = true, isForError = false } = props

    return (
        <View style={[styles.container, { marginTop: withReloadBtn ? verticalScale(120) : verticalScale(250) }]} >
            {isForError ?
                <MaterialIcons name={'error-outline'} size={150} color={colors.LIGHTGRAY_COLOR} /> :
                <Ionicons name={iconName} size={150} color={colors.LIGHTGRAY_COLOR} />}
            <Text style={styles.emptyTxt}> {text} </Text>
            {withReloadBtn && (<ReloadButton onPress={onReload ? onReload : () => null} />)}
        </View>
    )
}

export default React.memo(EmptyPage)

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(120)
    },
    emptyTxt: {
        fontFamily: fonts.REGULAR_FONT,
        paddingHorizontal: scale(10),
        color: '#CCD1D1',
        fontSize: moderateScale(18),
        marginVertical: verticalScale(30)
    }

})