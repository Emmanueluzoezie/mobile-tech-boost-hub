import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { appColor } from '../AppColor'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme } from '../../slice/AppSlices'
import QuizLinkItems from './QuizLinkItems'
import { selectedQuizQuestion, selectIsClickQuizLink, selectQuestionLevel, setClickQuizLink } from '../../slice/QuizSlice'
import { questionTypes } from '../../utilies/appDataObject'

const QuizComponent = () => {
  const appTheme = useSelector(selectAppTheme)
  const isQuestionLinkClick = useSelector(selectIsClickQuizLink)
  const getSelectedQuestion = useSelector(selectedQuizQuestion)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

  const notificationColor = appTheme === "dark"? appColor.primaryDarkColor : appColor.primaryColor

  const getQuestions = () => {
    dispatch(setClickQuizLink(false))
    navigation.navigate(`${getSelectedQuestion}`)
  }

  return (
    <View style={[tailwind`flex-1`]}>
      {isQuestionLinkClick === true &&
        <View style={[tailwind`absolute top-[40%] w-full px-[20px] items-center z-10`]}>
          <View style={[tailwind`absolute top-[50%] w-full p-6 rounded-md z-10`, { backgroundColor: appColor.inputLightBgColor }]}>
            <View style={[tailwind`mb-10`]}>
              <Text style={[tailwind`text-[17px]`, { fontFamily: "Lato-Regular" }]}>Click the type of {getSelectedQuestion} quiz you to want to partake on.</Text>
            </View>
            <FlatList
              data={questionTypes}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={getQuestions} style={[tailwind`p-2 w-full mb-1 rounded-md`, { backgroundColor: appColor.lightBackground,  }]}>
                  <Text style={[tailwind`text-center text-[16px]`, { fontFamily: "Lato-Bold" }]}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      }
      <View style={[tailwind`flex-1 pt-4 px-3`]}>
        <QuizLinkItems
          bgColor={containerColor}
          borderColor={notificationColor}
          color={color}
          questionType="javascript"
          title="JavaScript quiz"
          paragraph="Click to play now and get all question right to earn 50 points. 10 points for each."
          notification={false}
        />
        <QuizLinkItems
          bgColor={containerColor}
          borderColor={notificationColor}
          color={color}
          questionType="cyber_security"
          title="Cyber Security quiz"
          paragraph="Click to play now and get all question right to earn 50 points. 10 points for each."
          notification={false}
        />
        <QuizLinkItems
          bgColor={containerColor}
          borderColor={notificationColor}
          color={color}
          questionType="python"
          title="Python quiz"
          paragraph="Click to play now and get all question right to earn 50 points. 10 points for each."
          notification={false}
        />
          <QuizLinkItems
            bgColor={containerColor}
            borderColor={notificationColor}
            color={color}
            questionType="rust"
            title="Rust quiz"
            paragraph="Click to play now and get all question right to earn 50 points. 10 points for each."
            notification={false}
          />
        <QuizLinkItems
          bgColor={containerColor}
          borderColor={notificationColor}
          color={color}
          questionType="react"
          title="React quiz"
          paragraph="Click to play now and get all question right to earn 50 points. 10 points for each."
          notification={false}
        />
        <QuizLinkItems
          bgColor={containerColor}
          borderColor={notificationColor}
          color={color}
          questionType="vue"
          title="Vue quiz"
          paragraph="Click to play now and get all question right to earn 50 points. 10 points for each."
          notification={false}
        />
        <QuizLinkItems
          bgColor={containerColor}
          borderColor={notificationColor}
          color={color}
          questionType="django"
          title="Django quiz"
          paragraph="Click to play now and get all question right to earn 50 points. 10 points for each."
          notification={false}
        />
      </View>
    </View>
  )
}

export default QuizComponent

const styles = StyleSheet.create({})