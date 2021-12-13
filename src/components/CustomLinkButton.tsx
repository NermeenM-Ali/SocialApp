import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '../assets/colors'
import fonts from '../assets/Fonts'
import { moderateScale, scale, verticalScale } from '../utils/Scaling'

interface CustomLinkButtonProps {
  onPress: () => void
  btnText: string | any
}
const CustomLinkButton = (props: CustomLinkButtonProps) => {
  let { btnText, onPress } = props
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}
      style={styles.Container}>
      <Text style={styles.btnTxt}>{btnText}</Text>
    </TouchableOpacity>
  )
}

export default React.memo(CustomLinkButton)

const styles = StyleSheet.create({
  Container: {
    width: scale(340),
    alignSelf: 'center',
    height: verticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20)
  },
  btnTxt: {
    fontFamily: fonts.BOLD_FONT,
    fontSize: moderateScale(16),
    color: colors.BLUE_COLOR,
    textDecorationLine: 'underline'
  },
})
