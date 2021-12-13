import React from 'react'
import { StyleSheet, View } from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import colors from '../assets/colors';
import { moderateScale, scale, verticalScale } from '../utils/Scaling';

const ProfileUISkeleton = () => {
    return (
        <SkeletonPlaceholder direction='left' >
            <View style={styles.container}>
                <View style={styles.postcoverImg} />

                <View style={styles.userImgWrapper}>
                    <View style={styles.userImg} />
                </View>
                <View style={styles.postTextContainer}>
                    <View style={styles.userName} />
                    <View style={styles.userBio} />
                </View>
            </View>
        </SkeletonPlaceholder>

    )
}

export default React.memo(ProfileUISkeleton)


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: verticalScale(470)
    },

    postTextContainer: {
        marginVertical: verticalScale(10),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(120)
    },
    userName: {
        width: scale(250),
        height: verticalScale(15),
        borderRadius: moderateScale(4)
    },
    userBio: {
        marginTop: verticalScale(6),
        width: scale(180),
        height: verticalScale(10),
        borderRadius: moderateScale(4)
    },
    postcoverImg: {
        width: '100%',
        height: verticalScale(300)
    },
    userImg: {
        width: scale(200),
        height: scale(200),
        borderRadius: scale(200) / 2,
        overflow: 'hidden',
        borderColor: colors.SHADOW_COLOR,
        borderWidth: scale(4),
        justifyContent: 'center',
        alignItems: 'center',
    },
    userImgWrapper: {
        position: 'absolute',
        top: verticalScale(180),
        right: scale(50),
        width: '60%',
    },
})