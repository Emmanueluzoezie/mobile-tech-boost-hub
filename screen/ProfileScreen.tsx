import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import BottomNavigationContainer from '../component/BottomNavigationContainer'
import { useSelector } from 'react-redux'
import { selectAppTheme, selectCurrentProfileScreen } from '../slice/AppSlices'
import ProfileLinks from '../component/profile/ProfileLinks'
import PassCode from '../component/profile/PassCode'
import AccountInfo from '../component/profile/AccountInfo'
import { appColor } from '../component/AppColor'

const ProfileScreen = () => {
  const getCurrentProfileScreen = useSelector(selectCurrentProfileScreen)
  const appTheme = useSelector(selectAppTheme)

  const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor

  const primary = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

  const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

  return (
    <View style={[tailwind`flex-1 relative`, { backgroundColor: bgColor }]}>
      <View style={[tailwind`flex-1 relative`]}>
        {getCurrentProfileScreen === "profile_home" && <ProfileLinks />}
        {getCurrentProfileScreen === "account_info" && <AccountInfo />}
        {getCurrentProfileScreen === "pass_code" && <PassCode />}
      </View>
      <BottomNavigationContainer />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})