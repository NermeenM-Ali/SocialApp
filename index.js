import 'react-native-gesture-handler'
import { LogBox } from 'react-native';
import { Navigation } from 'react-native-navigation';
import auth from '@react-native-firebase/auth'
import { defaultConfigrations } from './src/navigation/navConfigrations'
import registerScreens from './src/navigation';
import { AppRoot, AuthRoot } from './src/navigation/Roots';

LogBox.ignoreAllLogs()
Navigation.setDefaultOptions(defaultConfigrations);
registerScreens()

Navigation.events().registerAppLaunchedListener(async () => {
    if (auth().currentUser) {
        Navigation.setRoot(AppRoot)
    } else {
        Navigation.setRoot(AuthRoot)
    }

});
