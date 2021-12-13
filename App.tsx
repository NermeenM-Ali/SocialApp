import { GoogleSignin } from '@react-native-google-signin/google-signin'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import CodePush from 'react-native-code-push'
import colors from './src/assets/colors'
import SplashScreen from './src/screens/Intro/SplashScreen'

const App = () => {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '211229922146-4i3ts4lr99c6erusgqu81co3o6jafg68.apps.googleusercontent.com',
    });
  }, [])

  return (
    <View style={styles.container}>
      <SplashScreen />
    </View>
  )
}

const codepushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START
}

export default CodePush(codepushOptions)(App)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE_COLOR
  }
})