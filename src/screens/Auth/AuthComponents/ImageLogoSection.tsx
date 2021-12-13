import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import colors from '../../../assets/colors'
import Fonts from '../../../assets/Fonts'
import { verticalScale, scale, moderateScale } from '../../../utils/Scaling'

interface ImageLogoSectionProps {
    title: string
}
const ImageLogoSection = (props: ImageLogoSectionProps) => {
    let { title } = props
    return (
        <>
            <View style={styles.logoContainer}>
                <Image source={require('../../../assets/images/social.png')} resizeMode='contain' style={styles.img} />
            </View>
            <View style={styles.txtContainer}>
                <Text style={styles.titleTxt}>{title}</Text>
            </View>
        </>
    )
}

export default React.memo(ImageLogoSection)

const styles = StyleSheet.create({
    logoContainer: {
        height: verticalScale(180),
        width: scale(200),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: verticalScale(70),
        marginBottom: verticalScale(20)
    },
    img: {
        width: '100%',
        height: '100%',
    },
    txtContainer: {
        width: scale(340),
        alignSelf: 'center',
        height: verticalScale(40)
    },
    titleTxt: {
        fontFamily: Fonts.BOLD_FONT,
        fontSize: moderateScale(28),
        color: colors.MAIN_COLOR,
        alignSelf: 'center'
    },
})
