import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { selectAppTheme, selectUserEmail, setIsUserLogin, setUserEmail } from '../slice/AppSlices'
import { useDispatch, useSelector } from 'react-redux'
import tailwind from 'twrnc'
import WebView from 'react-native-webview'
import { useQuery } from '@apollo/client'
import { GET_ALL_USER } from '../graphql/queries'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { appColor } from '../component/AppColor'
import { getUserEmail } from '../utilies/details'

const LoginScreen = () => {
  const [webViewVisible, setWebViewVisible] = useState(false);
  const appTheme = useSelector(selectAppTheme)
  const dispatch = useDispatch()
  const getUsersEmail = useSelector(selectUserEmail)
  const { data, loading, error } = useQuery(GET_ALL_USER)
  const navigation = useNavigation()
  const [loadingState, setLoadingState] = useState(false)

  const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

  const textColor = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

  const containerColor = appTheme === "dark" ? appColor.inputDarkBgColor : appColor.inputLightBgColor

  const handleNavigationStateChange = (navState) => {
    const currentUrl = navState.url;

    const pattern = /^https:\/\/mobile-tech-boost-hub.vercel.app\/native\/(.*)/;
    const match = currentUrl.match(pattern);
    if (match) {
      if (data) {
        const alreadyExist = data.getUserList && data.getUserList.some((user) => user.email === getUsersEmail);

        if (alreadyExist) {
          setLoadingState(true)
          setTimeout(() => {
            setLoadingState(false)
          }, 4000)
          dispatch(setIsUserLogin(true))
        } else {
          getUserEmail()
          navigation.navigate("question_type")
        }
    }
  }
}

  const startWebView = () => {
    setWebViewVisible(true);
  }

  useEffect(() => {
    AsyncStorage.getItem('userEmail')
      .then((value) => {
        if (value !== null) {
          dispatch(setUserEmail(value))
         console.log(value)
        } 
      })
  },[])

  return (
    <View style={[tailwind`flex-1`]}>
      {loading ?
        <View style={[tailwind`flex-1 justify-center items-center`]}>
          <ActivityIndicator size="large" color={appColor.primaryColor} />
        </View>
        :
        <View style={tailwind`flex-1 w-full`}>
          {!webViewVisible &&
            <View style={[tailwind`pt-[300px] px-4`]}>
              <Text style={[tailwind`text-[20px] pb-[6px]`, { fontFamily: "Lato-Bold" }]}>Welcome to TechBoostHub</Text>
              <Text style={[tailwind`text-[16px] pb-[20px]`, { fontFamily: "Lato-Regular" }]}>TechBoostHub is a platform to improve your tech skills through quizzes and earn points.
                Employers can also discover top talents based on points earned</Text>
              <TouchableOpacity style={[tailwind`rounded-md flex-row w-full justify-center p-2 mt-4`, { backgroundColor: appColor.primaryColor }]} onPress={startWebView}>
                <Text style={[tailwind`text-[18px]`, { fontFamily: "Lato-Bold", color: appColor.darkTextColor }]}>GetStarted</Text>
              </TouchableOpacity>
            </View>
          }

          {webViewVisible && (
            <View style={[tailwind`pt-20 flex-1 bg-white w-full`,]}>
              <WebView
                source={{ uri: 'https://mobile-tech-boost-hub.vercel.app' }}
                onNavigationStateChange={handleNavigationStateChange}
                style={{ flex: 1, width: "100%" }}
              />
            </View>
          )}
        </View>
    }
    </View>
  );
}

export default LoginScreen

const styles = StyleSheet.create({})