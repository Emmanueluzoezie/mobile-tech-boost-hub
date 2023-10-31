import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Keyboard, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { selectQuestionLevel, setFirstName, setLastName, setQuestionLevel } from '../slice/QuizSlice'
import { questionTypes } from '../utilies/appDataObject'
import tailwind from 'twrnc'
import { appColor } from './AppColor'
import { Ionicons } from '@expo/vector-icons'
import { selectAppTheme, selectUserEmail, setIsUserLogin } from '../slice/AppSlices'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_USER } from '../graphql/queries'
import { ADD_USER } from '../graphql/mutations'

const FormValidation = yup.object().shape({
    firstName: yup
        .string()
        .required('First name is required')
        .min(3, 'First name must be at least 3 characters long.'),
    lastName: yup
        .string()
        .required('Last name is required')
        .min(3, 'Last name must be at least 3 characters long.'),
})

const FormComponentForNewUser = () => {
    const [showQuestionLevel, setShowQuestionLevel] = useState(false)
    const [loadingState, setLoadingState] = useState(false)
    const getQuestionLevelType = useSelector(selectQuestionLevel)
    const appTheme = useSelector(selectAppTheme)
    const dispatch = useDispatch() 
    const getUserEmail = useSelector(selectUserEmail)

    const [addUserToDatabase] = useMutation(ADD_USER, {
        refetchQueries: [GET_ALL_USER, "getUserList"]
    })

    const { data, loading, error } = useQuery(GET_ALL_USER)

    const AddNewUser = async (values) => {
        setLoadingState(true);

        try {
            if (!getUserEmail) {
                setLoadingState(false);
                return;
            }

            if (data) {
                const userExists = data.getUserList && data.getUserList.some((user) => user.email === getUserEmail);

                if (userExists) {
                    setLoadingState(false);
                    return;
                }

                dispatch(setFirstName(values.firstName));
                dispatch(setLastName(values.lastName));
                const result = await addUserToDatabase({
                    variables: {
                        email: getUserEmail,
                        badge: getQuestionLevelType,
                        first_name: values.firstName,
                        last_name: values.lastName,
                        points: 0,
                        image: "",
                        created_at: new Date(),
                        username: values.username ?? "",
                        isAdmin: false,
                    },
                });

                if (result.data) {
                    // User added successfully
                    setLoadingState(false);
                    dispatch(setIsUserLogin(true));
                } else {
                    setLoadingState(false);
                }
            }
        } catch (error) {
            setLoadingState(false);
        }
    };

    const containerColor = appTheme === "dark" ? appColor.inputDarkBgColor : appColor.inputLightBgColor

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor
    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    const getQuestions = (item) => {
        dispatch(setQuestionLevel(item))
        setShowQuestionLevel(false)
    }

    const closeActiveState = () => {
        if (showQuestionLevel) {
            setShowQuestionLevel(false)
        }
        Keyboard.dismiss()

    }

  return (
    <View style={[tailwind`flex-1`]}>
        {loadingState || loading ?
            <View style={[tailwind`flex-1 justify-center items-center`]}>
                <ActivityIndicator size="large" color={buttonColor} />
            </View>
            :
            <TouchableOpacity style={tailwind`flex-1 mt-[30px]`} activeOpacity={1} onPress={closeActiveState}>
                <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            style={[{ zIndex: 1, flex: 1, paddingBottom: 40 }]}
                        >
                        <View style={[tailwind`p-4`]}>
                            <Text style={[tailwind`pb-1 text-[16px]`, { fontFamily: "Lato-Bold" }]}>TechSkillBooster strives to provide you with the best quiz game experience. Kindly complete the form.</Text>
                        </View>
                    <Formik
                            initialValues={{ firstName: "", lastName: "", userName: ""}}
                        validationSchema={FormValidation}
                        onSubmit={(values) => {
                            AddNewUser(values)
                        }}>
                        {props => (
                                <View style={[tailwind`px-4 mt-[30px]`]}>
                            <View>
                                <Text style={[tailwind`pb-1 text-[16px]`, { fontFamily: "Lato-Bold" }]}>What level of question are you interested in?</Text>
                                <TouchableOpacity style={[tailwind`flex-row justify-between items-center px-3 py-2 rounded-md mb-2`, { backgroundColor: containerColor }]} onPress={() => setShowQuestionLevel(!showQuestionLevel)}>
                                    <Text style={[tailwind`capitalize text-[17px]`, { fontFamily: "Lato-Bold", color: textColor }]}>{getQuestionLevelType}</Text>
                                        <Ionicons name="caret-down" size={22} color={textColor} />
                                </TouchableOpacity>
                                    {showQuestionLevel &&
                                        <FlatList
                                            data={questionTypes}
                                            keyExtractor={item => item.id.toString()}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity onPress={() => getQuestions(item.name)} style={[tailwind`p-2 w-full mb-1 rounded-md`, { backgroundColor: appColor.inputLightBgColor, }]}>
                                                    <Text style={[tailwind`text-center text-[16px]`, { fontFamily: "Lato-Bold" }]}>{item.name}</Text>
                                                </TouchableOpacity>
                                            )}
                                        />
                                } 
                            </View>
                                <View>
                                <View style={[tailwind`mt-3`]}>
                                    <Text style={[tailwind`pl-2 pb-3`, {fontFamily: "Lato-Bold"}]}>First Name:</Text>
                                    <TextInput
                                                placeholder=''
                                                style={[tailwind`p-2 border-2`, { borderColor: containerColor }]}
                                                onChangeText={props.handleChange('firstName')}
                                                onBlur={props.handleBlur('firstName')}
                                                value={props.values.firstName}
                                            />
                                    {props.errors.firstName && <Text style={[tailwind`text-[12px]`, { color: "red", fontFamily: "Lato-Bold" }]}>{props.errors.firstName}</Text>}
                                </View>
                                <View style={[tailwind`mt-3`]}>
                                    <Text style={[tailwind`pl-2 pb-2`, {fontFamily: "Lato-Bold"}]}>Last Name:</Text>
                                    <TextInput
                                        placeholder=''
                                        style={[tailwind`p-2 border-2`, { borderColor: containerColor }]}
                                                onChangeText={props.handleChange('lastName')}
                                                onBlur={props.handleBlur('lastName')}
                                                value={props.values.lastName}
                                    />
                                    {props.errors.lastName && <Text style={[tailwind`text-[12px]`, { color: "red", fontFamily: "Lato-Bold" }]}>{props.errors.lastName}</Text>}
                                </View>
                                <View style={[tailwind`mt-3`]}>
                                    <Text style={[tailwind`pl-2 pb-1`, {fontFamily: "Lato-Bold"}]}>Username (optional)</Text>
                                    <TextInput
                                        placeholder=''
                                        style={[tailwind`p-2 border-2`, { borderColor: containerColor }]}
                                                onChangeText={props.handleChange('userName')}
                                                onBlur={props.handleBlur('userName')}
                                                value={props.values.userName}
                                    />
                                    {props.errors.userName && <Text style={[tailwind`text-[12px]`, { color: "red", fontFamily: "Lato-Bold" }]}>{props.errors.userName}</Text>}
                                </View>
                            </View>
                            {props.values.firstName && props.values.lastName?
                            <TouchableOpacity style={[tailwind`p-[10px] mt-10 rounded-md`, { backgroundColor: appColor.primaryColor }]} onPress={() => props.handleSubmit()}><Text style={[tailwind`pl-2 text-[18px] text-center`, { fontFamily: "Lato-Bold", color: appColor.darkTextColor}]}>Get started</Text></TouchableOpacity>
                            :
                            <TouchableOpacity style={[tailwind`p-[10px] mt-10 rounded-md`, { backgroundColor: containerColor }]} onPress={() => props.handleSubmit()}><Text style={[tailwind`pl-2 text-[18px] text-center`, { fontFamily: "Lato-Bold", color: appColor.darkTextColor}]}>Get started</Text></TouchableOpacity>

                            }
                            </View>
                        )}
                    </Formik>
                </KeyboardAvoidingView>
            </TouchableOpacity>
        }
    </View>
  )
}

export default FormComponentForNewUser