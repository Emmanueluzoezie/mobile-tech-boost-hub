import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import DashboardScreen from '../screen/DashboardScreen'
import { setUserEmail } from '../slice/AppSlices'
import LeaderBoardScreen from '../screen/LeaderBoardScreen'
import ProfileScreen from '../screen/ProfileScreen'
import QuizScreen from '../screen/quiz/QuizScreen'
import JavascriptQuizScreen from '../screen/quiz/JavascriptQuizScreen'
import PythonQuizScreen from '../screen/quiz/PythonQuizScreen'
import FormComponentForNewUser from '../component/FormComponentForNewUser'
import { appColor } from '../component/AppColor'
import QuestionTypeScreen from '../screen/QuestionTypeScreen'
import CyberSecurityScreen from '../screen/quiz/CyberSecurityScreen'
import RustScreen from '../screen/quiz/RustScreen'
import ReactQuizScreen from '../screen/quiz/ReactQuiz'
import VueQuizScreen from '../screen/quiz/VueQuiz'
import DjangoQuizScreen from '../screen/quiz/DjangoScreen'

const Stack = createNativeStackNavigator()
const AuthenticatedUser = () => {

  return (
    <View style={[styles.container, {backgroundColor: appColor.lightBackground}]}>
        <NavigationContainer>
          <Stack.Navigator>
          <Stack.Screen name="home" component={DashboardScreen} options={{ headerShown: false }} />
          <Stack.Screen name="quiz" component={QuizScreen} options={{ headerShown: false }} />
          <Stack.Screen name="leaderboard" component={LeaderBoardScreen} options={{ headerShown: false }} />
          <Stack.Screen name="profile" component={ProfileScreen} options={{ headerShown: false }} />

          {/* Quiz screen */}
          <Stack.Screen name="javascript" component={JavascriptQuizScreen} options={{ headerShown: false }} />
          <Stack.Screen name="python" component={PythonQuizScreen} options={{ headerShown: false }} />
          <Stack.Screen name="cyber_security" component={CyberSecurityScreen} options={{ headerShown: false }} />
          <Stack.Screen name="rust" component={RustScreen} options={{ headerShown: false }} />
          <Stack.Screen name="react" component={ReactQuizScreen} options={{ headerShown: false }} />
          <Stack.Screen name="vue" component={VueQuizScreen} options={{ headerShown: false }} />
          <Stack.Screen name="django" component={DjangoQuizScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    </View>
  )
}

export default AuthenticatedUser

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
  }
})