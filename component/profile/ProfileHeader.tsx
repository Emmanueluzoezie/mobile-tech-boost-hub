import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import tailwind from 'twrnc'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme, setCurrentProfileScreen } from '../../slice/AppSlices'
import { appColor } from '../AppColor'

const ProfileHeader = ({title}) => {
    const appTheme = useSelector(selectAppTheme)
    const dispatch = useDispatch()

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground
  return (
      <View style={[tailwind`flex-row items-center px-2 pt-10 pb-3`, { backgroundColor: containerColor }]}>
          <TouchableOpacity onPress={() => dispatch(setCurrentProfileScreen("profile_home"))}>
              <Ionicons name="md-chevron-back" size={24} color="black" />
          </TouchableOpacity>
        <View style={[tailwind`flex-1`]}>
              <Text style={[tailwind`text-[18px] text-center`, { fontFamily: "Lato-Bold" }]}>{title}</Text>
        </View>
      </View>
  )
}

export default ProfileHeader