import React, { useCallback, useMemo, useRef, useState } from 'react'
import { StyleSheet, View, Image, Text, Keyboard, Platform } from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup'
import { Navigation } from 'react-native-navigation';
import colors from '../../assets/colors'
import { moderateScale, scale, verticalScale } from '../../utils/Scaling'
import Strings from '../../assets/strings';
import Fonts from '../../assets/Fonts';
import TextInputComponent from '../../components/TextInputComponent';
import CustomButton from '../../components/CustomButton';
import CustomLinkButton from '../../components/CustomLinkButton';
import { useDispatch, useSelector } from 'react-redux';
import { facebookLogin, googleLogin, SignUpUser } from '../../redux/actions/AuthActions';
import { checkGmailLoading, checkSignUpLoading, checkFBLoading } from '../../redux/slices/AuthSlice';
import ImageLogoSection from './AuthComponents/ImageLogoSection';


interface SignUpScreenProps {
  componentId: string
  navigation: any
  LoginUser: any
  isLoginLoading: boolean
}

const SignUpScreen = (props: SignUpScreenProps) => {
  const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false)
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] = useState<boolean>(false)
  const isGmailLoading = useSelector(checkGmailLoading)
  const isSignUpLoading = useSelector(checkSignUpLoading)
  const isFBLoading = useSelector(checkFBLoading)
  const dispatch = useDispatch()
  const inputsField: any = useRef({});

  const applyFocus = useCallback((inputName: string) => {
    setTimeout(() => {
      inputsField.current[inputName].focus()
    }, 0.5)
  }, [])

  const renderInputs = () => {
    const initialData = {
      email: '',
      password: '',
      confirmPassword: ''

    };
    const ValidationSchema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(Strings.required),
      password: Yup.string()
        .min(4, Strings.passwordValidation)
        .required(Strings.required),
      confirmPassword: Yup.string()
        .min(4, Strings.passwordValidation)
        .required(Strings.required)
        .test('passwords-match', Strings.passwordsMatch, function (value) {
          return this.parent.password === value;
        }),
    });

    return (
      <Formik initialValues={initialData} validationSchema={ValidationSchema} onSubmit={onSubmitRegisteration}>
        {
          (formikProps) => (
            <View style={{ flex: 1 }}>
              <TextInputComponent
                value={formikProps.values.email}
                onChangeText={formikProps.handleChange('email')}
                placeholder={Strings.userEmail}
                keyboardType='email-address'
                hasIcon={true}
                inputRef={(input: any) => { inputsField.current.email = input; }}
                error={formikProps.errors.email}
                touched={formikProps.touched.email}
                onSubmitEditing={() => {
                  applyFocus('password')
                  Keyboard.dismiss()
                }} />

              <TextInputComponent
                value={formikProps.values.password}
                onChangeText={formikProps.handleChange('password')}
                placeholder={Strings.password}
                keyboardType='default'
                isPasswordField
                hasIcon={false}
                secureTextEntry={!isPasswordVisible}
                onPasswordIconPressed={() => setPasswordVisibility(!isPasswordVisible)}
                inputRef={(input: any) => { inputsField.current.password = input; }}
                error={formikProps.errors.password}
                touched={formikProps.touched.password}
                onSubmitEditing={() => {
                  applyFocus('confirmPassword')
                  Keyboard.dismiss()
                }} />

              <TextInputComponent
                value={formikProps.values.confirmPassword}
                onChangeText={formikProps.handleChange('confirmPassword')}
                placeholder={Strings.confirmPassword}
                keyboardType='default'
                isPasswordField
                hasIcon={false}
                secureTextEntry={!isConfirmPasswordVisible}
                onPasswordIconPressed={() => setConfirmPasswordVisibility(!isConfirmPasswordVisible)}
                inputRef={(input: any) => { inputsField.current.confirmPassword = input; }}
                error={formikProps.errors.confirmPassword}
                touched={formikProps.touched.confirmPassword}
                onSubmitEditing={() => Keyboard.dismiss()} />
              <CustomButton btnTitle={Strings.signUp} isLoading={isSignUpLoading} btnBgColor={colors.MAIN_COLOR} onPress={formikProps.handleSubmit} />
              {Platform.OS === 'android' && (
                <>
                  <CustomButton btnTitle={Strings.loginFB} isLoading={isFBLoading} btnBgColor={colors.MID_BLUE_COLOR} hasIcon iconName={'facebook'} iconColor={colors.BLUE_COLOR} onPress={handleFbPress} />
                  <CustomButton btnTitle={Strings.loginGM} isLoading={isGmailLoading} btnBgColor={colors.MID_ORANGE_COLOR} hasIcon iconName={'google-plus'} iconColor={colors.ORANGE_COLOR} onPress={handleGmPress} />
                </>
              )}
              <CustomLinkButton btnText={Strings.haveAccount} onPress={handlePressToLoginScreen} />
            </View>
          )
        }
      </Formik>
    )
  }
  const handleFbPress = useCallback(() => dispatch(facebookLogin()), [dispatch])
  const handleGmPress = useCallback(() => dispatch(googleLogin()), [dispatch])
  const onSubmitRegisteration = useCallback(async (values: any, { setStatus, resetForm }: any) => {
    let { email, password } = values
    dispatch(SignUpUser({ email, password, setStatus, resetForm }))
  }, [dispatch])

  const handlePressToLoginScreen = useCallback(() => { Navigation.pop(props.componentId) }, [])

  return (
    <View style={styles.container}>
      <ImageLogoSection title={Strings.createNewAccount} />
      {renderInputs()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE_COLOR
  },
  logoContainer: {
    height: verticalScale(200),
    width: scale(200),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: verticalScale(70)
  },
  img: {
    width: '100%',
    height: '100%',
  },
  signUpTxtContainer: {
    width: scale(340),
    alignSelf: 'center',
    height: verticalScale(40)
  },
  signUpTxt: {
    fontFamily: Fonts.REGULAR_FONT,
    fontSize: moderateScale(28),
    color: colors.MAIN_COLOR,
    alignSelf: 'center'
  },
})



export default SignUpScreen