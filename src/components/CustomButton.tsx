import React from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import colors from '../assets/colors'
import fonts from '../assets/Fonts'
import { moderateScale, scale, verticalScale } from '../utils/Scaling'

interface CustomButtonProps {
  btnTitle: string,
  btnBgColor: string
  onPress: () => void
  isLoading?: boolean
  hasIcon?: boolean
  iconName?: string | any
  iconColor?: string | any
}
const CustomButton = (props: CustomButtonProps) => {
  let { btnTitle, btnBgColor, onPress, hasIcon, iconName, iconColor, isLoading = false } = props
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: btnBgColor }]} onPress={onPress} activeOpacity={0.8}>
      {
        isLoading && !hasIcon ?
          <ActivityIndicator color={colors.WHITE_COLOR} size={'small'} /> :
          <Text style={[styles.btnTxt, { color: hasIcon ? iconColor : colors.WHITE_COLOR, fontSize: hasIcon ? moderateScale(16) : moderateScale(20) }]}>{btnTitle}</Text>
      }
      {hasIcon && isLoading ? <ActivityIndicator color={colors.SHADOW_COLOR} size={'small'} /> : (<Icon name={iconName} color={iconColor} size={moderateScale(20)} />)}
    </TouchableOpacity>
  )
}

export default React.memo(CustomButton)

const styles = StyleSheet.create({
  container: {
    width: scale(341),
    height: verticalScale(55),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(7),
    marginTop: verticalScale(20),
    flexDirection: 'row-reverse',

  },
  btnTxt: {
    color: colors.WHITE_COLOR,
    fontFamily: fonts.BOLD_FONT,
    fontSize: moderateScale(20),
    paddingHorizontal: scale(20)
  }
})
