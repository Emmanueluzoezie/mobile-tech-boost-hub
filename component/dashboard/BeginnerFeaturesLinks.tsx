import { Image, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { useSelector } from 'react-redux'
import { selectAppTheme } from '../../slice/AppSlices'
import { appColor } from '../AppColor'
import { AntDesign, Entypo } from '@expo/vector-icons'

const BeginnerFeaturesLinks = () => {
    const appTheme = useSelector(selectAppTheme)

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

    const containerColor = appTheme === "dark" ? appColor.inputDarkBgColor : appColor.inputLightBgColor

    return (
        <View style={[tailwind`flex-1 py-4`]}>
            <TouchableOpacity style={[tailwind` p-3 flex-row items-center my-2 rounded-[6px]`, { backgroundColor: containerColor }]}>
                <Image source={require("../../assets/webd.png")} style={[tailwind`w-20 h-24`]} />
                <View style={[tailwind`p-2 flex-1`]}>
                    <Text style={[tailwind`text-[18px]`, { fontFamily: "Lato-Bold" }]}>Web Development Basics</Text>
                    <Text style={[tailwind`mt-2`, { fontFamily: "Lato-Regular", color }]}>Learn the fundamentals of web development with this beginner-friendly quiz</Text>
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
                    <Text style={[tailwind`text-[18px]`, { fontFamily: "Lato-Bold" }]}>Cyber Security Basics</Text>
                    <Text style={[tailwind`mt-2`, { fontFamily: "Lato-Regular", color }]}>Learn the fundamentals of Cyber Security with this beginner-friendly quiz</Text>
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

export default BeginnerFeaturesLinks

const styles = StyleSheet.create({})