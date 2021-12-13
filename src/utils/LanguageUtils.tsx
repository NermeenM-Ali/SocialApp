// @ts-ignore
import RNRestart from 'react-native-restart';
import { I18nManager } from 'react-native';

export const switchLang = () => {
  if (I18nManager.isRTL) {
    I18nManager.forceRTL(false)
  } else {
    I18nManager.forceRTL(true)
  }
  RNRestart.Restart();
}

