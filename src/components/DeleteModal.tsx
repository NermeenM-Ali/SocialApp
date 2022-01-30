import React from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modal from "react-native-modal";
import Strings from '../assets/strings';
import colors from '../assets/colors';
import { moderateScale, scale, verticalScale } from '../utils/Scaling';
import Fonts from '../assets/Fonts';

interface DeleteModalProps {
    isDeleteModalVisible: boolean
    isDeletePostLoading: boolean
    closeModal: () => void,
    pressToDelete: () => void,
}
const DeleteModal = (props: DeleteModalProps) => {
    let { pressToDelete, closeModal, isDeleteModalVisible, isDeletePostLoading } = props
    return (
        <Modal isVisible={isDeleteModalVisible} style={[styles.bottomModal]}
            onBackButtonPress={() => { }}
            onBackdropPress={() => { }}>
            {(<TouchableOpacity activeOpacity={0.8} style={styles.closeBtnContainer} onPress={closeModal}>
                <Ionicons name='close' size={20} color={colors.RED_COLOR} />
            </TouchableOpacity>)}
            <View style={styles.modelTitlecontainer}>
                <Text style={styles.modelTitle}>
                    Are you sure you want to delete this post ?
                </Text>
                <View style={styles.imgContainer}>
                    <Image source={require('../assets/images/delete.jpg')} resizeMode='contain' style={styles.img} />
                </View>
            </View>
            <TouchableOpacity activeOpacity={0.8} style={styles.confirmBtnContainer} onPress={() => pressToDelete()}>
                {isDeletePostLoading ? <ActivityIndicator color={colors.WHITE_COLOR} size='small' /> : <Text style={styles.confirmTxt}>{Strings.confirm}</Text>}
            </TouchableOpacity>
        </Modal>
    )
}

export default DeleteModal

const styles = StyleSheet.create({
    bottomModal: {
        margin: 0,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: verticalScale(440),
        backgroundColor: colors.WHITE_COLOR,
        borderTopLeftRadius: moderateScale(0),
        borderTopRightRadius: moderateScale(0),
        justifyContent: 'flex-start',
        paddingTop: verticalScale(50)
    },
    confirmBtnContainer: {
        position: 'absolute',
        bottom: verticalScale(20),
        width: scale(200),
        paddingVertical: verticalScale(15),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(8),
        borderWidth: scale(2),
        borderColor: colors.SHADOW_COLOR,
        backgroundColor: colors.MAIN_COLOR,
        elevation: 1
    },
    confirmTxt: {
        fontFamily: Fonts.BOLD_FONT,
        fontSize: moderateScale(16),
        color: colors.WHITE_COLOR
    },
    modelTitlecontainer: {
        width: scale(340),
        alignSelf: 'center',
        justifyContent: 'center'
    },
    modelTitle: {
        fontFamily: Fonts.BOLD_FONT,
        fontSize: moderateScale(22),
        color: colors.MAIN_COLOR,
        textAlign: 'center',
    },
    subTxt: {
        fontFamily: Fonts.BOLD_FONT,
        fontSize: moderateScale(17),
        color: colors.MAIN_COLOR,
    },
    closeBtnContainer: {
        width: scale(40),
        height: scale(40),
        borderRadius: scale(40) / 2,
        backgroundColor: colors.WHITE_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: scale(10),
        top: verticalScale(-20),
        borderColor: colors.SHADOW_COLOR,
        borderWidth: scale(1)
    },
    imgContainer: {
        width: scale(300),
        height: verticalScale(200),
        alignSelf: 'center',
        marginTop: verticalScale(20)
    },
    img: {
        width: '100%',
        height: '100%'
    }
})
