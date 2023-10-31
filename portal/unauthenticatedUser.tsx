import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@apollo/client';
import { GET_ALL_USER } from '../graphql/queries';
import { appColor } from '../component/AppColor'
import { selectAppTheme } from '../slice/AppSlices'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screen/LoginScreen'
import QuestionTypeScreen from '../screen/QuestionTypeScreen'

const Stack = createNativeStackNavigator()
const UnauthenticatedUser = () => {
  const appTheme = useSelector(selectAppTheme)

  const bgColor = appTheme === "dark"? appColor.darkBackground : appColor.lightBackground

  return (
      <View style={[styles.container,{backgroundColor: bgColor,}
        ]}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="question_type" component={QuestionTypeScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
  )
}

export default UnauthenticatedUser

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
  }
})