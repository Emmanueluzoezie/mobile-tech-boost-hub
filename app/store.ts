import { appSlice } from '../slice/AppSlices';
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { quizSlice } from '../slice/QuizSlice';

export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        quiz: quizSlice.reducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),

})

export default store;

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch