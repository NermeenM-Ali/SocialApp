
import React, { PureComponent } from 'react'
import { Text, StyleSheet, View, TextInput, I18nManager } from 'react-native'
import colors from '../assets/colors'
import Fonts from '../assets/Fonts'
import { moderateScale, scale, verticalScale } from '../utils/Scaling'

interface MultiLineTextInputProps {
    value: any
    onChangeText: (any: any) => any
    onSubmitEditing: () => any
    keyboardType: string | any
    placeHolder: string | any
    inputRef?: any
}
export default class MultiLineTextInput extends PureComponent<MultiLineTextInputProps>{
    render() {
        let { value, onChangeText, placeHolder, keyboardType, inputRef, onSubmitEditing } = this.props
        return (
            <>
                <View style={[styles.inputContainer, {

                }]}>
                    <TextInput
                        value={value}
                        ref={inputRef}
                        editable
                        placeholder={placeHolder}
                        placeholderTextColor={colors.GRAY_COLOR}
                        autoCapitalize='none'
                        autoCorrect={false}
                        maxLength={700}
                        keyboardType={keyboardType}
                        onChangeText={onChangeText}
                        blurOnSubmit
                        multiline={true}
                        numberOfLines={7}
                        onSubmitEditing={onSubmitEditing}
                        selectionColor={colors.MAIN_COLOR}
                        style={[styles.input]} />
                </View>

            </>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        width: scale(370),
        backgroundColor: colors.WHITE_COLOR,
        borderRadius: moderateScale(5),
        flexDirection: 'row-reverse',
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        elevation: 1,
        textAlignVertical: 'top',
        marginTop: verticalScale(15),
        borderWidth: scale(0.5), borderColor: colors.SECONDARY_COLOR
    },
    input: {
        width: scale(370),
        color: colors.BLACK_COLOR,
        paddingHorizontal: scale(10),
        fontFamily: Fonts.REGULAR_FONT,
        lineHeight: 25,
        textAlignVertical: 'top',
        textAlign: I18nManager.isRTL ? 'right' : 'left',
        fontSize: moderateScale(15),
    },
})
