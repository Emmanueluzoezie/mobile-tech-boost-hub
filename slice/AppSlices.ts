import { RootState } from "../app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AppState {
    isUserLogin: boolean,
    appTheme: string,
    user_data: UserData,
    userEmail: string,
    userRank: number,
    currentProfileScreen: string,
    currentScreen: string,
    userType: string,
}

const initialState: AppState = {
    isUserLogin: false,
    appTheme: "light",
    user_data: {
        email: "",
        badge: "",
        first_name: "",
        last_name: "",
        points: 0,
        image: "",
        created_at: new Date(),
        username: "",
        isAdmin: false,
        id: ""
    },
    userEmail: "48w8TmtNKn",
    userRank: 0,
    currentProfileScreen: "profile_home",
    currentScreen: "home",
    userType:"interview"
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setIsUserLogin: (state, action: PayloadAction<boolean>) => {
            state.isUserLogin = action.payload;
        },
        setAppTheme: (state, action: PayloadAction<string>) => {
            state.appTheme = action.payload;
        },
        setUserData: (state, action: PayloadAction<UserData>) => {
            state.user_data = action.payload;
        },
        setUserEmail: (state, action: PayloadAction<string>) => {
            state.userEmail = action.payload;
        },
        setUserRank: (state, action: PayloadAction<number>) => {
            state.userRank = action.payload;
        },
        setCurrentProfileScreen: (state, action: PayloadAction<string>) => {
            state.currentProfileScreen = action.payload;
        },
        setCurrentScreen: (state, action: PayloadAction<string>) => {
            state.currentScreen = action.payload;
        },
        setUserType: (state, action: PayloadAction<string>) => {
            state.userType = action.payload;
        },
    }
});

export const { setIsUserLogin, setCurrentScreen, setAppTheme, setUserData, setUserEmail, setUserRank, setCurrentProfileScreen, setUserType } = appSlice.actions;

export const selectIsUserLogin = (state: RootState) => state.app.isUserLogin;
export const selectAppTheme = (state: RootState) => state.app.appTheme;
export const selectUserData = (state: RootState) => state.app.user_data;
export const selectCurrentScreen = (state: RootState) => state.app.currentScreen;
export const selectUserEmail = (state: RootState) => state.app.userEmail;
export const selectUserRank = (state: RootState) => state.app.userRank;
export const selectCurrentProfileScreen = (state: RootState) => state.app.currentProfileScreen;
export const selectUserType = (state: RootState) => state.app.userType;

export default appSlice.reducer;
