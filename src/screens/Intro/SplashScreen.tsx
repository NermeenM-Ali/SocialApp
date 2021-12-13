
import React, { useEffect } from 'react'
import { StyleSheet, Image, View, Text, ActivityIndicator } from 'react-native'
import { Navigation } from 'react-native-navigation'
import colors from '../../assets/colors'
import Fonts from '../../assets/Fonts'
import Strings from '../../assets/strings'
import { moderateScale, verticalScale } from '../../utils/Scaling'

const SplashScreen = () => {
    useEffect(() => {
        setTimeout(() => {
            Navigation.push('AuthStack', {
                component: { name: 'LoginScreen' }
            })
        }, 2000)
    }, [])



    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/social.png')}
                style={styles.img} resizeMode='contain' />
            <Text style={styles.appName} >{`${Strings.socialApp}...`}</Text>
            <ActivityIndicator color={colors.WHITE_COLOR} size='small' style={styles.loader} />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.MAIN_COLOR
    },
    img: {
        width: "70%",
        height: "50%",
        justifyContent: "center",
        alignItems: "center",
    },
    appName: {
        fontFamily: Fonts.BOLD_FONT,
        color: colors.WHITE_COLOR,
        fontSize: moderateScale(35)
    },
    loader: {
        marginTop: verticalScale(40)
    }
})
