import { Options, OptionsBottomTab } from "react-native-navigation"
import colors from "../assets/colors"
import Fonts from "../assets/Fonts"
import { moderateScale } from "../utils/Scaling"

const defaultConfigrations: Options = {
    animations: {
        push: { waitForRender: true },
        setRoot: { waitForRender: true },
        setStackRoot: { waitForRender: true },
        showModal: { waitForRender: true },
        dismissModal: { waitForRender: true },
        pop: { waitForRender: true },
    },
    statusBar: {
        visible: true,
        drawBehind: false,
        backgroundColor: colors.MAIN_COLOR,
        style: 'light'
    },
    topBar: {
        height: 0,
        visible: false,
        drawBehind: true,
    },
    bottomTabs: {
        visible: true,
        drawBehind: false,
        backgroundColor: colors.MAIN_COLOR,
        tabsAttachMode: 'onSwitchToTab',
    },
}

const bottomTabOptions: OptionsBottomTab = {
    fontFamily: Fonts.REGULAR_FONT,
    selectedIconColor: colors.WHITE_COLOR,
    iconColor: colors.SECONDARY_COLOR,
    selectedFontSize: moderateScale(16),
    fontSize: moderateScale(15),
    selectedTextColor: colors.WHITE_COLOR,
    textColor: colors.SECONDARY_COLOR,
    text: 'Home',
}


export enum BottomTabStacks { POSTS_STACK = 'POSTS_STACK', CHAT_STACK = 'CHAT_USERS_STACK', PROFILE_STACK = 'PROFILE_STACK' }

export { defaultConfigrations, bottomTabOptions }