import React from 'react'
import { Keyboard, StyleSheet, TouchableOpacity, TextInput, View, ActivityIndicator } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import colors from '../../../assets/colors'
import Strings from '../../../assets/strings'
import { sendMsgLoaderSelectorFunc } from '../../../redux/slices/ChatSlice'
import { moderateScale, scale, verticalScale } from '../../../utils/Scaling'

interface ChatInputProps {
    value: any
    onChangeText: (any: any) => any
    onSendMsgBtnPressed: () => void
}
const ChatInput = (props: ChatInputProps) => {
    let { value, onChangeText, onSendMsgBtnPressed } = props
    const isSendMsgLoading = useSelector(sendMsgLoaderSelectorFunc)
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                placeholder={Strings.message}
                placeholderTextColor={colors.MID_PURPLE}
                style={styles.input}
                autoCapitalize='none'
                autoCorrect={false}
                multiline
                keyboardType='default'
                onChangeText={onChangeText} />
            <TouchableOpacity style={styles.sendMsgBtnContainer} activeOpacity={0.9} onPress={onSendMsgBtnPressed}>
                {isSendMsgLoading ? <ActivityIndicator size='small' color={colors.SECONDARY_COLOR} /> : <Ionicons name='ios-send' size={14} color={colors.WHITE_COLOR} />}
            </TouchableOpacity>
        </View>
    )
}

export default React.memo(ChatInput)

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#f1f1f1',
        elevation: 5,
        bottom: 0,
        left: 0,
        right: 0,
        height: verticalScale(80),
        paddingHorizontal: scale(10),
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        width: '85%',
        maxHeight: verticalScale(55),
        borderWidth: scale(1),
        borderColor: colors.MAIN_COLOR,
        borderRadius: moderateScale(25),
        paddingHorizontal: scale(10),
        color: colors.BLACK_COLOR
    },
    sendMsgBtnContainer: {
        width: scale(40),
        height: scale(40),
        borderRadius: scale(40),
        backgroundColor: colors.MID_PURPLE,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: scale(10)
    }
})
