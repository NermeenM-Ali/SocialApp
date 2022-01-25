import React, { useCallback, useRef, useState } from 'react'
import { StyleSheet, View, Keyboard, Platform } from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup'
import { Navigation } from 'react-native-navigation';
import colors from '../../assets/colors'
import Strings from '../../assets/strings';
import TextInputComponent from '../../components/TextInputComponent';
import CustomButton from '../../components/CustomButton';
import CustomLinkButton from '../../components/CustomLinkButton';
import { useDispatch, useSelector, } from 'react-redux';
import { checkGmailLoading, checkLoginLoading, checkFBLoading } from '../../redux/slices/AuthSlice';
import { facebookLogin, googleLogin, LoginUser } from '../../redux/actions/AuthActions';
import ImageLogoSection from './AuthComponents/ImageLogoSection';



const LoginScreen = () => {
  const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false)
  const isGmailLoading = useSelector(checkGmailLoading)
  const isLoginLoading = useSelector(checkLoginLoading)
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

    };
    const ValidationSchema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(Strings.required),
      password: Yup.string()
        .min(4, Strings.passwordValidation)
        .required(Strings.required),
    });
    return (
      <Formik initialValues={initialData} validationSchema={ValidationSchema} onSubmit={onSubmitLogin}>
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
                onSubmitEditing={() => Keyboard.dismiss()} />

              <CustomButton btnTitle={Strings.login} isLoading={isLoginLoading} btnBgColor={colors.MAIN_COLOR} onPress={formikProps.handleSubmit} />

              {Platform.OS === 'android' && (
                <>
                  <CustomButton btnTitle={Strings.loginFB} isLoading={isFBLoading} btnBgColor={colors.MID_BLUE_COLOR} hasIcon iconName={'facebook'} iconColor={colors.BLUE_COLOR} onPress={handleFbPress} />
                  <CustomButton btnTitle={Strings.loginGM} isLoading={isGmailLoading} btnBgColor={colors.MID_ORANGE_COLOR} hasIcon iconName={'google-plus'} iconColor={colors.ORANGE_COLOR} onPress={handleGmPress} />
                </>
              )}

              <CustomLinkButton btnText={Strings.createNewAccount} onPress={handlePressToCreateAccount} />
            </View>
          )
        }
      </Formik>
    )
  }
  const handleFbPress = useCallback(() => dispatch(facebookLogin()), [dispatch])
  const handleGmPress = useCallback(() => dispatch(googleLogin()), [dispatch])

  const onSubmitLogin = useCallback(async (values: any, { setStatus, resetForm }: any) => {
    let { email, password } = values
    dispatch(LoginUser({ email, password, setStatus, resetForm }))
  }, [dispatch])

  const handlePressToCreateAccount = useCallback(() => { Navigation.push('AuthStack', { component: { name: 'SignUpScreen' } }) }, [])

  return (
    <View style={styles.container}>
      <ImageLogoSection title={Strings.socialApp} />
      {renderInputs()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE_COLOR
  },

})



export default LoginScreen