import { LayoutRoot } from "react-native-navigation"
import { bottomTabOptions, BottomTabStacks } from "./navConfigrations"

export const AuthRoot: LayoutRoot = {
    root: {
        stack: {
            id: 'AuthStack',
            children: [
                { component: { name: "App" } },
            ],

        },
    }
}


export const AppRoot: LayoutRoot = {
    root: {
        bottomTabs: {
            id: 'BOTTOM_TABS_LAYOUT',
            children: [
                {
                    stack: {
                        id: BottomTabStacks.POSTS_STACK,
                        children: [
                            {
                                component: {
                                    id: BottomTabStacks.POSTS_STACK,
                                    name: 'PostsScreen',

                                }
                            }
                        ],
                        options: {
                            bottomTab: { ...bottomTabOptions, text: 'Home', icon: require('../assets/images/home.png'), }
                        }
                    }
                },
                {
                    stack: {
                        id: BottomTabStacks.CHAT_STACK,
                        children: [
                            {
                                component: {
                                    id: BottomTabStacks.CHAT_STACK,
                                    name: 'MyChatsScreen',

                                }
                            }
                        ],
                        options: {
                            bottomTab: { ...bottomTabOptions, text: 'Chats', icon: require('../assets/images/chat.png'), }
                        }
                    }
                },
                {
                    stack: {
                        id: BottomTabStacks.PROFILE_STACK,
                        children: [
                            {
                                component: {
                                    id: BottomTabStacks.PROFILE_STACK,
                                    name: 'ProfileScreen',
                                    passProps: { fromBottomTab: true }
                                }
                            }
                        ],
                        options: {
                            bottomTab: { ...bottomTabOptions, text: 'Profile', icon: require('../assets/images/profile.png'), }
                        }
                    }
                }

            ]
        }
    },
}