import React from 'react'
import { StyleSheet, View } from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import colors from '../assets/colors';
import { moderateScale, scale, verticalScale } from '../utils/Scaling';

const ChatUISkeleton = () => {
    return (
        <View style={styles.container}>
            <SkeletonPlaceholder direction='left' backgroundColor={colors.WHITE_COLOR} >
                <View style={styles.itemContainer}>
                    <View style={styles.userImg} />
                    <View style={styles.userDataContainer}>
                        <View style={styles.userName} />
                        <View style={styles.lastMsg} />
                    </View>
                </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder direction='left' backgroundColor={colors.WHITE_COLOR} >
                <View style={styles.itemContainer}>
                    <View style={styles.userImg} />
                    <View style={styles.userDataContainer}>
                        <View style={styles.userName} />
                        <View style={styles.lastMsg} />
                    </View>
                </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder direction='left' backgroundColor={colors.WHITE_COLOR} >
                <View style={styles.itemContainer}>
                    <View style={styles.userImg} />
                    <View style={styles.userDataContainer}>
                        <View style={styles.userName} />
                        <View style={styles.lastMsg} />
                    </View>
                </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder direction='left' backgroundColor={colors.WHITE_COLOR} >
                <View style={styles.itemContainer}>
                    <View style={styles.userImg} />
                    <View style={styles.userDataContainer}>
                        <View style={styles.userName} />
                        <View style={styles.lastMsg} />
                    </View>
                </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder direction='left' backgroundColor={colors.WHITE_COLOR} >
                <View style={styles.itemContainer}>
                    <View style={styles.userImg} />
                    <View style={styles.userDataContainer}>
                        <View style={styles.userName} />
                        <View style={styles.lastMsg} />
                    </View>
                </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder direction='left' backgroundColor={colors.WHITE_COLOR} >
                <View style={styles.itemContainer}>
                    <View style={styles.userImg} />
                    <View style={styles.userDataContainer}>
                        <View style={styles.userName} />
                        <View style={styles.lastMsg} />
                    </View>
                </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder direction='left' backgroundColor={colors.WHITE_COLOR} >
                <View style={styles.itemContainer}>
                    <View style={styles.userImg} />
                    <View style={styles.userDataContainer}>
                        <View style={styles.userName} />
                        <View style={styles.lastMsg} />
                    </View>
                </View>
            </SkeletonPlaceholder>
        </View >
    )
}

export default React.memo(ChatUISkeleton)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: verticalScale(20),
        paddingHorizontal: scale(20)
    },
    itemContainer: {
        width: '90%',
        height: verticalScale(90),
        alignSelf: 'center',
        marginVertical: verticalScale(5),
        alignItems: 'center',
        flexDirection: 'row'
    },
    userImg: {
        width: 60,
        height: 60,
        borderRadius: 50
    },
    userDataContainer: {
        marginLeft: scale(20)
    },
    userName: {
        width: scale(150),
        height: verticalScale(10),
        borderRadius: moderateScale(4),
    },
    lastMsg: {
        width: scale(250),
        height: verticalScale(10),
        borderRadius: moderateScale(4),
        marginTop: verticalScale(10)
    },

})