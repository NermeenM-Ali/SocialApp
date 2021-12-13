import AsyncStorage from '@react-native-community/async-storage';

export interface IUser {
    userId: string,
    userName: string,
    userImg: string,
    userBio: string | null,
    userCoverImg: string | null
}

export class CurrentUser {
    private currentUserStorageKey = 'current~user';
    private currentUserTokenStorageKey = 'current~user~token';

    async login(currentUser: IUser): Promise<any> {
        return await AsyncStorage.setItem(this.currentUserStorageKey, JSON.stringify(currentUser));
    }

    async getCurrentUser(): Promise<any> {
        return await AsyncStorage.getItem(this.currentUserStorageKey).then((currentUser: any) => JSON.parse(currentUser));
    }

    async logout(): Promise<any> {
        return await AsyncStorage.multiRemove([this.currentUserStorageKey, this.currentUserTokenStorageKey]).then(() => console.log('cleared'));
    }
    async setToken(token: string): Promise<void> {
        await AsyncStorage.setItem(this.currentUserTokenStorageKey, token);
    }

    async getToken(): Promise<string> {
        const token = await AsyncStorage.getItem(this.currentUserTokenStorageKey);
        if (token) {
            return token;
        }
        return "";
    }

}
