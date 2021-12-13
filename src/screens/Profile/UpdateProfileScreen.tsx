import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Image, Keyboard, StyleSheet, ScrollView, View } from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../assets/colors'
import Fonts from '../../assets/Fonts'
import Strings from '../../assets/strings'
import CustomButton from '../../components/CustomButton'
import MultiLineTextInput from '../../components/MutliLineTextInput'
import TextInputComponent from '../../components/TextInputComponent'
import { FOLDER_NAMES, UploadFile } from '../../components/UploadFile'
import { RootState } from '../../redux/Configration'
import { moderateScale, scale, verticalScale } from '../../utils/Scaling'
import { getUserById, UpdateUserData } from '../../redux/actions/UsersAction';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HeaderIconButton from './ProfileComponents/HeaderIconButton';

const UpdateProfileSCreen = (props: NavigationComponentProps) => {
    const dispatch = useDispatch()
    const [userData, setUserData] = useState<{ userName: string, userImg: string, userBio: string, userCoverImg: string }>({ userName: '', userImg: '', userBio: '', userCoverImg: '' })
    const [isCoverImageUploadLoading, setCoverImageUploadLoading] = useState(false)
    const [isProfileImageUploadLoading, setProfileImageUploadLoading] = useState(false)
    let userProfileData: any = useSelector((state: RootState) => state.UsersSlice.userProfileData._data)

    useEffect(() => {
        dispatch(getUserById({ userId: '', fromBottomTab: true }))
        setUserData(userProfileData)
    }, [])

    const renderCovermagesSection = () => {
        return (
            <UploadFile
                folderName='users'
                multiple={false}
                isForProfile={true}
                uploading={(isImageLoading: boolean) => setCoverImageUploadLoading(isImageLoading)}
                getUploadPercent={() => { }}
                onSuccess={(userCoverImg: any) => {
                    setUserData({ ...userData, userCoverImg })
                }}>
                <View style={styles.coverImageContainer}>
                    {isCoverImageUploadLoading ? <ActivityIndicator color={colors.MAIN_COLOR} size="small" /> :
                        userData.userCoverImg ?
                            <Image source={{ uri: userData?.userCoverImg }} resizeMode='stretch' style={styles.img} /> :
                            <Image source={require('../../assets/images/noImg.png')} resizeMode='stretch' style={styles.img} />}
                </View>
                <View style={styles.cameraContainer}>
                    <FontAwesome name='camera-retro' style={styles.cameraIcon} />
                </View>
            </UploadFile>
        )
    }


    const renderProfileImagesSection = () => {
        return (
            <View style={styles.profileImgWrapper}>
                <UploadFile
                    folderName={FOLDER_NAMES.USERS}
                    multiple={false}
                    isForProfile={true}
                    uploading={(isImageLoading: boolean) => setProfileImageUploadLoading(isImageLoading)}
                    getUploadPercent={() => { }}
                    onSuccess={(userImg: any) => {
                        setUserData({ ...userData, userImg })
                    }}>
                    <View style={styles.profileImageContainer}>
                        {isProfileImageUploadLoading ? <ActivityIndicator color={colors.MAIN_COLOR} size="small" /> :
                            userData?.userImg ?
                                <Image source={{ uri: userData?.userImg }} resizeMode='cover' style={styles.img} /> :
                                <Image source={require('../../assets/images/noImg.png')} resizeMode='cover' style={styles.img} />}
                    </View>
                    <View style={[styles.cameraProfileContainer]}>
                        <FontAwesome name='camera-retro' style={styles.cameraIcon} />
                    </View>
                </UploadFile>
            </View>
        )
    }



    const renderUserNameAndBioSection = () => {
        const initialData = {
            userName: userData?.userName,
            userBio: userData?.userBio

        };
        const ValidationSchema = Yup.object().shape({
            userName: Yup.string()
                .required(Strings.required),
            userBio: Yup.string()
                .required(Strings.required),
        });
        return (
            <Formik initialValues={initialData} validationSchema={ValidationSchema} onSubmit={onSubmit} enableReinitialize>
                {
                    (formikProps) => (
                        <View style={styles.inputsSection}>
                            <TextInputComponent
                                value={formikProps.values.userName}
                                onChangeText={(userName: string) => {
                                    formikProps.setFieldValue('userName', userName)
                                    setUserData({ ...userData, userName })
                                }}
                                placeholder={Strings.userFullName}
                                keyboardType='email-address'
                                hasIcon={true}
                                isForEditProfile
                                error={formikProps.errors.userName}
                                touched={formikProps.touched.userName}
                                onSubmitEditing={() => {
                                    Keyboard.dismiss()
                                }} />

                            <MultiLineTextInput
                                value={formikProps.values.userBio}
                                onChangeText={(userBio: string) => {
                                    formikProps.setFieldValue('userBio', userBio)
                                    setUserData({ ...userData, userBio })
                                }}
                                placeHolder={Strings.writeToYourBio}
                                keyboardType='default'
                                onSubmitEditing={() => { Keyboard.dismiss() }} />


                            <View style={styles.UpdateBtnContainer}>
                                <CustomButton btnTitle={Strings.update} isLoading={false} btnBgColor={colors.MAIN_COLOR} hasIcon
                                    iconName={'edit'} iconColor={colors.WHITE_COLOR} onPress={formikProps.handleSubmit} />
                            </View>
                        </View>
                    )
                }
            </Formik>
        )
    }
    const onSubmit = () => {
        let { componentId } = props
        if (!userData.userImg) {
            dispatch(UpdateUserData({ userData: { ...userData, userImg: null }, componentId }))
        } else if (!userData.userCoverImg) {
            dispatch(UpdateUserData({ userData: { ...userData, userCoverImg: null }, componentId }))
        } else if (!userData.userImg && !userData.userCoverImg) {
            dispatch(UpdateUserData({ userData: { ...userData, userImg: null, userCoverImg: null }, componentId }))
        } else {
            dispatch(UpdateUserData({ userData, componentId }))
        }

    }

    const handleBackBtn = useCallback(() => Navigation.pop(props.componentId), [])

    const renderBackBtn = () => {
        return (
            <HeaderIconButton isBackBtn={true} onPress={handleBackBtn}>
                <AntDesign name='left' style={styles.backIcon} />
            </HeaderIconButton>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            {renderBackBtn()}
            {renderCovermagesSection()}
            {renderProfileImagesSection()}
            {renderUserNameAndBioSection()}
        </ScrollView>
    )
}

export default UpdateProfileSCreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE_COLOR,
    },
    listStyle: {
        flexGrow: 1,
        zIndex: -10,
        marginTop: verticalScale(20),
    },
    inputsSection: {
        flexGrow: 1,
        zIndex: -10,
        marginTop: verticalScale(100)
    },
    coverImageContainer: {
        width: '100%',
        alignSelf: 'center',
        height: verticalScale(300),
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: '100%',
        height: '100%',
    },
    cameraIcon: {
        fontSize: moderateScale(18),
        color: colors.WHITE_COLOR
    },
    cameraContainer: {
        position: 'absolute',
        bottom: verticalScale(10),
        left: scale(10),
        width: scale(35),
        height: scale(35),
        backgroundColor: colors.MAIN_COLOR,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(5),
        borderWidth: scale(1),
        borderColor: colors.SHADOW_COLOR
    },
    cameraProfileContainer: {
        position: 'absolute',
        bottom: verticalScale(10),
        left: scale(25),
        width: scale(35),
        height: scale(35),
        backgroundColor: colors.MAIN_COLOR,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: scale(1),
        borderColor: colors.SHADOW_COLOR
    },
    profileImageContainer: {
        width: scale(200),
        height: scale(200),
        borderRadius: scale(200) / 2,
        overflow: 'hidden',
        borderColor: colors.SHADOW_COLOR,
        borderWidth: scale(4),
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImgWrapper: {
        position: 'absolute',
        top: verticalScale(180),
        right: scale(100),
        width: '60%',
    },
    infoSection: {
        width: '90%',
        paddingVertical: verticalScale(10),
        alignSelf: 'center',
        zIndex: -10,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(5),
    },
    userName: {
        fontFamily: Fonts.BOLD_FONT,
        fontSize: moderateScale(24)
    },
    userBio: {
        marginTop: verticalScale(10),
        fontSize: moderateScale(15),
        fontFamily: Fonts.REGULAR_FONT,
        color: colors.GRAY_COLOR
    },
    UpdateBtnContainer: {
        marginBottom: verticalScale(50)
    },
    backIcon: {
        fontSize: moderateScale(18),
        color: colors.SHADOW_COLOR,
        marginRight: scale(3),
    }
})
