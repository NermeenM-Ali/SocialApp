import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { moderateScale, scale, verticalScale } from '../utils/Scaling';

const PostUISkeleton = () => {
    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignSelf: 'center', justifyContent: 'flex-start', alignItems: 'center' }}>
            <SkeletonPlaceholder direction='left' >
                <View style={styles.container}>
                    <View style={styles.infoContainer}>
                        <View style={styles.userImg} />
                        <View style={styles.userDataContainer}>
                            <View style={styles.userName} />
                            <View style={styles.postTime} />
                        </View>
                    </View>
                    <View style={styles.postTextContainer}>
                        <View style={styles.postLine1} />
                        <View style={styles.postLine2} />
                    </View>
                    <View style={styles.postImg} />
                </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder direction='left' >
                <View style={styles.container}>
                    <View style={styles.infoContainer}>
                        <View style={styles.userImg} />
                        <View style={styles.userDataContainer}>
                            <View style={styles.userName} />
                            <View style={styles.postTime} />
                        </View>
                    </View>
                    <View style={styles.postTextContainer}>
                        <View style={styles.postLine1} />
                        <View style={styles.postLine2} />
                    </View>
                    <View style={styles.postImg} />
                </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder direction='left' >
                <View style={styles.container}>
                    <View style={styles.infoContainer}>
                        <View style={styles.userImg} />
                        <View style={styles.userDataContainer}>
                            <View style={styles.userName} />
                            <View style={styles.postTime} />
                        </View>
                    </View>
                    <View style={styles.postTextContainer}>
                        <View style={styles.postLine1} />
                        <View style={styles.postLine2} />
                    </View>
                    <View style={styles.postImg} />
                </View>
            </SkeletonPlaceholder>
        </ScrollView>
    )
}

export default React.memo(PostUISkeleton)


const styles = StyleSheet.create({
    container: {
        marginTop: verticalScale(20),
        alignSelf: 'center'
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center'
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
        height: verticalScale(20),
        borderRadius: moderateScale(4)
    },
    postTime: {
        marginTop: verticalScale(6),
        width: scale(100),
        height: verticalScale(20),
        borderRadius: moderateScale(4)
    },
    postTextContainer: {
        marginVertical: verticalScale(10)
    },
    postLine1: {
        width: scale(250),
        height: verticalScale(15),
        borderRadius: moderateScale(4)
    },
    postLine2: {
        marginTop: verticalScale(6),
        width: scale(180),
        height: verticalScale(15),
        borderRadius: moderateScale(4)
    },
    postImg: {
        width: scale(380),
        height: verticalScale(200)
    }
})