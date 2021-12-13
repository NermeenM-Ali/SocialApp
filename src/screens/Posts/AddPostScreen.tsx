import React, { useEffect, useMemo, useState } from 'react'
import { Image, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../assets/colors'
import Fonts from '../../assets/Fonts'
import Strings from '../../assets/strings'
import Header from '../../components/Header'
import MultiLineTextInput from '../../components/MutliLineTextInput'
import { FOLDER_NAMES, UploadFile } from '../../components/UploadFile'
import { RootState } from '../../redux/Configration'
import { moderateScale, scale, verticalScale } from '../../utils/Scaling'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationComponentProps } from 'react-native-navigation'
import { AddPost } from '../../redux/actions/PostsAction'
import { getUserById } from '../../redux/actions/UsersAction'
import Spinner from '../../components/Spinner'

const AddPostScreen = (props: NavigationComponentProps) => {
    const dispatch = useDispatch()
    const [postText, setPostText] = useState<string | null>(null)
    const [imgUrl, setImgUrl] = useState<string>('')
    const [isImageUploadLoading, setImageUploadLoading] = useState(false)
    let isAddPostloading = useSelector((state: RootState) => state.PostSlice.isAddPostloading)

    useEffect(() => {
        dispatch(getUserById({ userId: '', fromBottomTab: true }))
    }, [dispatch])

    const renderUploadPostImage = useMemo(() => {
        return (
            <UploadFile
                folderName={FOLDER_NAMES.PHOTOS}
                multiple={false}
                uploading={(isImageLoading: boolean) => setImageUploadLoading(isImageLoading)}
                getUploadPercent={() => { }}
                onSuccess={(imgUrl: any) => setImgUrl(imgUrl)}>
                <View style={imgUrl ? styles.imageContainer : styles.upload}>
                    {imgUrl ?
                        <Image source={{ uri: imgUrl }} resizeMode='contain' style={styles.img} /> :
                        <>
                            <Ionicons name='cloud-upload-outline' size={50} color={colors.SECONDARY_COLOR} />
                            <Text style={styles.uploadTxt}>{Strings.addImgToPost}</Text>
                        </>
                    }

                </View>
            </UploadFile>
        )
    }, [imgUrl])

    const renderPostText = () => {
        return (
            <MultiLineTextInput
                value={postText}
                onChangeText={(postTxt: string) => { setPostText(postTxt) }}
                placeHolder={Strings.whatsInYourMind}
                keyboardType='default'
                onSubmitEditing={() => { Keyboard.dismiss() }} />
        )
    }

    const submitPost = () => {
        if (postText && !isAddPostloading) {
            dispatch(AddPost({ imgUrl, postText, componentId: props.componentId }))
        }
    }

    const renderSubmitPostButton = useMemo(() => {
        return (
            <TouchableOpacity style={[styles.submitBtn, { backgroundColor: postText ? colors.MAIN_COLOR : colors.SECONDARY_COLOR }]} disabled={!postText} activeOpacity={0.8} onPress={submitPost}>
                {isAddPostloading ? <Spinner color={colors.WHITE_COLOR} /> : <Text style={styles.submitBtnTxt}>{Strings.post}</Text>}
            </TouchableOpacity>
        )
    }, [submitPost])

    const renderImguploadLoading = useMemo(() => {
        return (
            <View style={styles.uploadPercentContainer}>
                <Spinner color={colors.MAIN_COLOR} />
            </View>)
    }, [])

    return (
        <View style={styles.container}>
            <Header headerTitle={Strings.addPost} hasBackButton componentId={props.componentId} />
            {isImageUploadLoading ? renderImguploadLoading : renderUploadPostImage}
            {renderPostText()}
            {renderSubmitPostButton}
        </View>
    )
}

export default AddPostScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE_COLOR,
    },
    uploadPercentContainer: {
        flexDirection: 'row',
        width: scale(70),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: verticalScale(30)
    },
    uploadPercentTxt: {
        fontFamily: Fonts.REGULAR_FONT,
        fontSize: moderateScale(15),
        color: colors.MAIN_COLOR
    },
    submitBtn: {
        width: scale(180),
        height: verticalScale(45),
        backgroundColor: colors.MAIN_COLOR,
        alignSelf: 'center',
        borderRadius: moderateScale(5),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(40)
    },
    submitBtnTxt: {
        fontFamily: Fonts.REGULAR_FONT,
        fontSize: moderateScale(18),
        color: colors.WHITE_COLOR
    },
    upload: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginBottom: verticalScale(12),
        paddingHorizontal: scale(1.2),
        marginTop: verticalScale(10)
    },
    uploadTxt: {
        fontFamily: Fonts.BOLD_FONT,
        color: colors.SECONDARY_COLOR,
        fontSize: moderateScale(15),
        marginTop: verticalScale(15)
    },
    imageContainer: {
        width: '100%',
        height: verticalScale(250),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: moderateScale(7),
        overflow: 'hidden'
    }
})
