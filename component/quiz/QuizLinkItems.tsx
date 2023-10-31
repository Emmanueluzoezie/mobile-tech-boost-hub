import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme } from '../../slice/AppSlices'
import { appColor } from '../AppColor'
import tailwind from 'twrnc'
import { MaterialIcons } from '@expo/vector-icons'
import { selectIsClickQuizLink, setClickQuizLink, setQuestionLevel, setSelectedQuestion } from '../../slice/QuizSlice'

const QuizLinkItems = ({ bgColor, questionType, borderColor, title, paragraph, notification, color }) => {
    const appTheme = useSelector(selectAppTheme)
    const dispatch = useDispatch()

    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor

    const handleQuestionType = () => {
        dispatch(setClickQuizLink(true))
        dispatch(setSelectedQuestion(questionType))
    } 

    return (
        <TouchableOpacity style={[
            tailwind`p-3 my-[8px] flex-row items-center rounded-md border-l-[4px] shadow-lg`,
            { backgroundColor: bgColor, borderColor }
        ]}
            onPress={handleQuestionType}
        >
            <View style={tailwind`flex-1`}>
                <Text style={[
                    tailwind`text-[16px] font-semibold`,
                    { color: color, fontFamily: 'Lato-Bold' }
                ]}>{title}</Text>
                <Text style={[
                    tailwind`mt-1 text-[14px] pr-4`,
                    { color: textColor, fontFamily: 'Lato-Regular' }
                ]}>{paragraph}</Text>
            </View>
            <TouchableOpacity style={[tailwind`w-[20px] justify-center items-center rounded-sm h-[20px] relative`]}>
                <MaterialIcons name="notifications" size={18} color={borderColor} />
                {notification &&
                    <View style={tailwind`bg-[${appColor.ternaryColor}] w-2 h-2 rounded-full absolute right-[2px] top-[0]`} />
                }
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default QuizLinkItems