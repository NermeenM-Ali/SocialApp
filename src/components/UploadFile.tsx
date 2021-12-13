import React, { Component } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Platform } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import Modal from "react-native-modal";
import { scale, verticalScale, moderateScale } from '../utils/Scaling'
import colors from '../assets/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fonts from '../assets/Fonts';
import Strings from '../assets/strings';
import storage from '@react-native-firebase/storage';
export enum FOLDER_NAMES { USERS = 'users', PHOTOS = 'photos' }
interface UploadFileProps {
    folderName: string
    uploading: Function;
    onSuccess: Function;
    multiple?: boolean
    getUploadPercent: Function
    isForProfile?: boolean
}

interface UploadFileStates {
    isModalVisible: boolean
}

export class UploadFile extends Component<UploadFileProps, UploadFileStates>{
    constructor(props: UploadFileProps) {
        super(props)
        this.state = {
            isModalVisible: false,
        }
    }
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = () => {
            return;
        };
    }

    async uploadImage(imageObj: any): Promise<void> {
        let { uploading, getUploadPercent, onSuccess, folderName } = this.props
        uploading(true)
        const uploadedUrl = Platform.OS === 'ios' ? imageObj.sourceURL : imageObj.path
        let fileName = imageObj.path.split('/')[imageObj.path.split('/').length - 1];
        // because firestorage override the image if i upload same image again and to stop this behavior we will change file name and add time to it 
        // to stop storage from override the image if its exist before
        let extension = fileName.split('.').pop()
        let name = fileName.split('.').slice(0, -1).join('.')
        fileName = name + Date.now() + '.' + extension

        let storageRef = storage().ref(`${folderName}/${fileName}`)
        const task = storageRef.putFile(uploadedUrl);
        task.on('state_changed', taskSnapshot => {
            let transferredPercent = Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
            getUploadPercent(transferredPercent)
        });
        try {
            await task
            uploading(false)
            let imgUrl = await storageRef.getDownloadURL()
            onSuccess(imgUrl)
        } catch (error) {
            uploading(false)
            console.log({ error })
            onSuccess(null)
        }
    }

    toggleModal() {
        let { isModalVisible } = this.state
        this.setState({ isModalVisible: !isModalVisible })
        // Navigation.mergeOptions('BOTTOM_TABS_LAYOUT', {
        //     bottomTabs: {
        //         visible: !isModalVisible ? false : true,
        //         drawBehind: true,
        //         backgroundColor: colors.MAIN_COLOR
        //     },
        // });
    }

    openGallery() {
        const { multiple } = this.props;
        ImagePicker.openPicker({
            compressImageMaxHeight: 1024,
            compressImageMaxWidth: 1024,
            cropping: Platform.OS === 'ios' ? false : !multiple,
            multiple,
        }).then((image: any) => {
            this.uploadImage(image)
            this.setState({ isModalVisible: false })
        });
    }

    openCamera() {
        const { multiple } = this.props;
        ImagePicker.openCamera({
            compressImageMaxHeight: 1024,
            compressImageMaxWidth: 1024,
            cropping: Platform.OS === 'ios' ? false : !multiple,
            multiple
        }).then((image: any) => {
            this.uploadImage(image)
            this.setState({ isModalVisible: false })
        });
    }

    renderModal() {
        return (
            <Modal isVisible={this.state.isModalVisible}>
                <View style={styles.modalContainer}>

                    <View>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity activeOpacity={0.9}
                                style={styles.modalTextContainer}
                                onPress={() => {
                                    this.openGallery()
                                }} >
                                <MaterialIcons
                                    name='photo-library'
                                    style={styles.icon} />
                                <Text style={styles.modalText}>{Strings.openGallery}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: verticalScale(0.1), backgroundColor: 'lightgray' }} />
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.modalTextContainer}
                                activeOpacity={0.9}
                                onPress={() => this.openCamera()}>
                                <MaterialIcons
                                    name='camera-alt'
                                    style={styles.icon} />
                                <Text style={styles.modalText}>{Strings.openCamera}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: verticalScale(7), backgroundColor: 'transparent' }} />
                    <TouchableOpacity activeOpacity={0.9}
                        onPress={() => this.toggleModal()}
                        style={styles.cancelTextContainer}>
                        <Text style={styles.modalText}>{Strings.cancel}</Text>
                    </TouchableOpacity>
                </View>
            </Modal >
        )
    }

    render() {
        let { isForProfile } = this.props
        return (
            <TouchableOpacity style={[styles.container, { marginVertical: isForProfile ? 0 : verticalScale(20) }]} activeOpacity={1} onPress={() => this.toggleModal()}>
                {this.props.children}
                {this.renderModal()}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row-reverse',
        alignSelf: 'center',
        overflow: 'hidden',
        alignItems: 'center',
        marginVertical: verticalScale(20)
    },
    modalContainer: {
        position: 'absolute',
        bottom: verticalScale(-30),
        height: verticalScale(180),
        backgroundColor: 'transparent',
        width: scale(350),
        alignSelf: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: verticalScale(60),
        width: '100%',
        marginVertical: verticalScale(0.5)
    },
    modalTextContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: scale(7),
    },
    cancelTextContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: verticalScale(55),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(25),
        marginTop: verticalScale(-4)
    },
    modalText: {
        fontSize: moderateScale(15),
        fontFamily: Fonts.REGULAR_FONT,
        color: colors.MAIN_COLOR
    },
    icon: {
        marginHorizontal: scale(7),
        color: colors.MAIN_COLOR,
        fontSize: moderateScale(22)
    },
})