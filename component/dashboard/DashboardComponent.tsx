import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { useSelector } from 'react-redux'
import { selectAppTheme, selectUserType } from '../../slice/AppSlices'
import { appColor } from '../AppColor'
import BeginnerFeaturesLinks from './BeginnerFeaturesLinks'
import AdvanceFeaturesLinks from './AdvanceFeaturesLinks'
import IntermidiateFeatureLinks from './IntermidiateFeatures'
import InterviewFeaturesLinks from './InterviewFeaturesLinks'

const DashboardComponent = () => {
    const appTheme = useSelector(selectAppTheme)
    const getUserType = useSelector(selectUserType)

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

  return (
    <View style={[tailwind`flex-1 p-4`]}>
          {getUserType === "beginner" && <BeginnerFeaturesLinks />}
      {getUserType === "intermediate" && <IntermidiateFeatureLinks />}
          {getUserType === "advance" && <AdvanceFeaturesLinks />}
      {getUserType === "interview" && <InterviewFeaturesLinks />}
    </View>
  )
}

export default DashboardComponent

const styles = StyleSheet.create({})