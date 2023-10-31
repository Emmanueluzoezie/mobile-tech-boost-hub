import { RootState } from "../app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnsweredQuestion {
    question: string;
    correctAnswer: string;
    isCorrect: boolean;
    userAnswer: string
    id: number | string
}

interface AppState {
    currentQuizScreen: string,
    answeredQuestions: AnsweredQuestion[];
    question_level: string
    clickQuizLink: boolean
    selectedQuestion: string
    firstName: string
    lastName: string
}

const initialState: AppState = {
    currentQuizScreen: "home_quiz",
    answeredQuestions: [],
    question_level: "beginner",
    clickQuizLink: false,
    selectedQuestion: "",
    firstName: "",
    lastName: ""
}

export const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        setCurrentQuizScreen: (state, action: PayloadAction<string>) => {
            state.currentQuizScreen = action.payload;
        },
        resetAnsweredQuestions: (state) => {
            state.answeredQuestions = [];
        },
        addAnsweredQuestions: (state, action: PayloadAction<AnsweredQuestion>) => {
            state.answeredQuestions.push(action.payload);
        },
        setQuestionLevel: (state, action: PayloadAction<string>) => {
            state.question_level = action.payload;
        },
        setClickQuizLink: (state, action: PayloadAction<boolean>) => {
            state.clickQuizLink = action.payload;
        },
        setSelectedQuestion: (state, action: PayloadAction<string>) => {
            state.selectedQuestion = action.payload;
        },
        setFirstName: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action: PayloadAction<string>) => {
            state.lastName = action.payload;
        },
    }
});

export const { setCurrentQuizScreen, addAnsweredQuestions, resetAnsweredQuestions, setQuestionLevel, setClickQuizLink, setSelectedQuestion, setFirstName, setLastName } = quizSlice.actions;

export const selectAnswerQuestions = (state: RootState) => state.quiz.answeredQuestions
export const selectCurrentQuizScreen = (state: RootState) => state.quiz.currentQuizScreen;
export const selectQuestionLevel = (state: RootState) => state.quiz.question_level;
export const selectIsClickQuizLink = (state: RootState) => state.quiz.clickQuizLink;
export const selectedQuizQuestion = (state: RootState) => state.quiz.selectedQuestion;
export const selectFirstName = (state: RootState) => state.quiz.firstName;
export const selectLastName = (state: RootState) => state.quiz.lastName;

export default quizSlice.reducer;
