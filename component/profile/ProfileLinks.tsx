import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme, setCurrentProfileScreen } from '../../slice/AppSlices'
import { appColor } from '../AppColor'
import tailwind from 'twrnc'
import { MaterialIcons } from '@expo/vector-icons'

const ProfileLinks = () => {
    const appTheme = useSelector(selectAppTheme)
    const dispatch = useDispatch()

    const linksColor = appTheme === "dark" ? appColor.inputDarkBgColor : appColor.inputLightBgColor

    const primary = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor
  return (
    <View style={[tailwind``]}>
          <View style={[tailwind`flex-row justify-center pt-10 pb-3`, { backgroundColor: containerColor }]}>
            <Text style={[tailwind`text-[18px]`, {fontFamily: "Lato-Bold"}]}>Profile</Text>
        </View>
        <View style={[tailwind`px-3 mt-4`]}>
            <TouchableOpacity style={[
                tailwind`px-3 py-4 my-2 flex-row items-center rounded-md`,
                { backgroundColor: linksColor }
            ]}
                onPress={() => dispatch(setCurrentProfileScreen("account_info"))}>
                <View style={tailwind`flex-1`}>
                    <Text style={[tailwind`text-[18px] font-semibold`, { color, fontFamily: 'Lato-Bold' }]}>Account Information</Text>
                    <Text style={[tailwind`text-[14px] pt-1`, { color, fontFamily: 'Lato-Bold' }]}>See all your account information like email and full name</Text>
                </View>
                <MaterialIcons name="chevron-right" size={30} color={color} />
            </TouchableOpacity>
            <TouchableOpacity style={[
                tailwind`px-3 py-4 my-2 flex-row items-center rounded-md`,
                { backgroundColor: linksColor }
            ]}
                  onPress={() => dispatch(setCurrentProfileScreen("pass_code"))}>
                <View style={tailwind`flex-1`}>
                    <Text style={[tailwind`text-[18px] font-semibold`, { color, fontFamily: 'Lato-Bold' }]}>Pass Key Management</Text>
                    <Text style={[tailwind`text-[14px] pt-1`, { color, fontFamily: 'Lato-Bold' }]}>Add email and also pass code to your account</Text>
                </View>
                <MaterialIcons name="chevron-right" size={30} color={color} />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default ProfileLinks