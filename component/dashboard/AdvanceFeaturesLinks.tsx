import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { useSelector } from 'react-redux'
import { selectAppTheme } from '../../slice/AppSlices'
import { appColor } from '../AppColor'
import { Entypo } from '@expo/vector-icons'

const AdvanceFeaturesLinks = () => {
  const appTheme = useSelector(selectAppTheme)

  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

  const containerColor = appTheme === "dark" ? appColor.inputDarkBgColor : appColor.inputLightBgColor

  return (
    <View style={[tailwind`flex-1 py-4`]}>
      <TouchableOpacity style={[tailwind` p-3 flex-row items-center my-2 rounded-[6px]`, { backgroundColor: containerColor }]}>
        <Image source={require("../../assets/webd.png")} style={[tailwind`w-20 h-24`]} />
        <View style={[tailwind`p-2 flex-1`]}>
          <Text style={[tailwind`text-[18px]`, { fontFamily: "Lato-Bold" }]}>Advance Web Development</Text>
          <Text style={[tailwind`mt-2`, { fontFamily: "Lato-Regular", color }]}>Learn about the advanced Web development features with our quiz</Text>
          <TouchableWithoutFeedback>
            <View style={[tailwind`pt-2 flex-row justify-between items-center`]}>
              <Text style={[tailwind``, { fontFamily: "Lato-Bold" }]}>Click to get started</Text>
              <Entypo name="arrow-long-right" size={24} color={appColor.primaryColor} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={[tailwind` p-3 flex-row items-center my-2 rounded-[6px]`, { backgroundColor: containerColor }]}>
        <Image source={require("../../assets/cyber.png")} style={[tailwind`w-20 h-24`]} />
        <View style={[tailwind`p-2 flex-1 pl-4`]}>
          <Text style={[tailwind`text-[18px]`, { fontFamily: "Lato-Bold" }]}>Advance Cyber Security</Text>
          <Text style={[tailwind`mt-2`, { fontFamily: "Lato-Regular", color }]}>Learn the fundamentals of Cyber Security features with our quiz</Text>
          <TouchableWithoutFeedback>
            <View style={[tailwind`pt-2 flex-row justify-between items-center`]}>
              <Text style={[tailwind`text-[16px]`, { fontFamily: "Lato-Bold" }]}>Click to get started</Text>
              <Entypo name="arrow-long-right" size={24} color={appColor.primaryColor} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default AdvanceFeaturesLinks

const styles = StyleSheet.create({})